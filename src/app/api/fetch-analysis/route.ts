import { string } from 'zod';
import { now } from 'mongoose';
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/option"
import { Message, User } from "@/models/User.model"
import dbConnect from "@/lib/dbConnect"
import QuestionsModel from "@/models/Questions.model"
import FeedbackAnalysisModel, { FeedbackAnalysisDocument } from "@/models/FeedbackAnalysis..model"
import { prompt, output } from '@/helpers/data';

export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user
    if (!session || !user) {
        return Response.json({
            success: false,
            message: "You are not logged in",
        }, {
            status: 401
        })
    }
    const { questionId } = await request.json()
    if (!questionId) {
        return Response.json({
            success: false,
            message: "Question Id is required",
        }, {
            status: 401
        })
    }
    try {

        const questionInstence = await QuestionsModel.findById(questionId).populate("feedbacks")
        if (!questionInstence) {
            return Response.json({
                success: false,
                message: "Question not found",
            }, {
                status: 404
            })
        }

        const { feedbacks, question } = questionInstence
        console.log(question)
        if (!feedbacks) {
            return Response.json({
                success: false,
                message: "No feedbacks found",
            }, {
                status: 404
            })
        }

        const resp = await analyzeFeedbacks(feedbacks, question, questionId)

        return Response.json({
            success: true,
            data: resp,
            message: "Analysis successfully",
        }, {
            status: 200
        })

    } catch (error) {
        console.error("error in fetching questions ", error)
        return Response.json({
            success: false,
            message: "error in fetching questions :: Internal server error ",
        }, {
            status: 500
        })

    }

}


const analyzeFeedbacks = async (feedbacks: Message[], question: string, questionId: string) => {

    const existingFeedbacks = await FeedbackAnalysisModel.findOne({ question })
    if (existingFeedbacks) {
        console.log("feedback exists")
        const createdAt: Date = existingFeedbacks.createdAt ? new Date(existingFeedbacks.createdAt) : new Date();
        const now: Date = new Date()
        const diff = now.getTime() - createdAt.getTime()
        const days = Math.round(diff / (1000 * 60 * 60 * 24))
        if (days <= 2) {
            console.log('--------------------------------- cached analysis is called ---------------------------------')

            return existingFeedbacks
        } else {
            console.log("'------cahced analysis is old so , calling LLM again------'")
            const result = await sentToLLM(feedbacks)
            console.log("'------cahced analysis is old so , calling LLM again,updating  in db------'")
            const feedbackAnalysis = await FeedbackAnalysisModel.findByIdAndUpdate(existingFeedbacks._id, {
                questionId,
                question,
                ...result
            }, {
                new: true
            })
            return feedbackAnalysis
        }
    } else {
        console.log("'------no cache found , so calling LLM------'")
        
        const result = await sentToLLM(feedbacks)
        console.log(result)
        console.log("'------no cache found , so calling LLM, storing new record in db------'")
        const feedbackAnalysis = await FeedbackAnalysisModel.create({
            questionId,
            question,
            ...result
        })
        return feedbackAnalysis
    }
}


const sentToLLM = async (feedbacks: Message[]) => {
    console.log('--------------------------------- LLM is called ---------------------------------')
    const chunks = []
    const chunkSize = Number(process.env.CHUNK_SIZE) || 10
    while (feedbacks.length != 0) {
        chunks.push(feedbacks.splice(0, chunkSize));
    }



    const results: FeedbackAnalysisDocument[] = await Promise.all(
        chunks.map(async (chunk, idx) => {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'mistral/ministral-8b',
                    messages: [
                        {
                            role: 'user',
                            content: `${prompt}${JSON.stringify(chunk)} and here is the sample output ${JSON.stringify(output)}+ Note:Please return only JSON. No formatting or extra text.`,
                        },
                    ],
                }),
            })

            const data = await response.json();
            let rawData = data.choices[0].message.content;
            let cleanJsonString = rawData.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
            // console.log(cleanJsonString)
            return { chunkIndex: idx, ...JSON.parse(cleanJsonString) };
        })
    );

    //combine the results from all chunks
    const combined = {
        overall_sentiment: { scoreSum: 0, count: 0 },
        key_topics_entities: {} as Record<string, number>,
        emotion_scores: [] as number[],
        dominant_emotions: [] as string[],
        suggested_actions: new Set<string>(),
        trend_over_time: {} as Record<
            string,
            { positive: number; negative: number; count: number }
        >,
        clarity_scores: [] as number[],
        unclear_feedback: [] as string[],
    };
    const sentimentLabelCounts: Record<string, number> = {};


    results.forEach((res) => {
        const label = res.overall_sentiment.label;
        sentimentLabelCounts[label] = (sentimentLabelCounts[label] || 0) + 1;

        combined.overall_sentiment.scoreSum += res.overall_sentiment.score;
        combined.overall_sentiment.count += 1;

        res.key_topics_entities.forEach(({ topic, mentions }) => {
            combined.key_topics_entities[topic] =
                (combined.key_topics_entities[topic] || 0) + mentions;
        });

        combined.emotion_scores.push(res.emotion_intensity.average_score);
        combined.dominant_emotions.push(...res.emotion_intensity.dominant_emotions);
        combined.clarity_scores.push(res.confidence_clarity.average_clarity_score);
        combined.unclear_feedback.push(...res.confidence_clarity.low_clarity_examples);

        res.suggested_actions.forEach((action) =>
            combined.suggested_actions.add(action)
        );

        res.trend_over_time.forEach(({ date, positive, negative }) => {
            if (!combined.trend_over_time[date]) {
                combined.trend_over_time[date] = { positive: 0, negative: 0, count: 0 };
            }
            combined.trend_over_time[date].positive += positive;
            combined.trend_over_time[date].negative += negative;
            combined.trend_over_time[date].count += 1;
        });
    });

    return {
        sentiment_distribution: sentimentLabelCounts,
        overall_sentiment: {
            label: "Aggregated",
            score: parseFloat(
                (combined.overall_sentiment.scoreSum /
                    combined.overall_sentiment.count).toFixed(2)
            ),
        },
        key_topics_entities: Object.entries(combined.key_topics_entities).map(
            ([topic, mentions]) => ({ topic, mentions })
        ),
        emotion_intensity: {
            average_score: parseFloat(
                (
                    combined.emotion_scores.reduce((a, b) => a + b, 0) /
                    combined.emotion_scores.length
                ).toFixed(2)
            ),
            dominant_emotions: [...new Set(combined.dominant_emotions)],
        },
        suggested_actions: Array.from(combined.suggested_actions),
        trend_over_time: Object.entries(combined.trend_over_time).map(
            ([date, val]) => ({
                date,
                positive: parseFloat((val.positive / val.count).toFixed(2)),
                negative: parseFloat((val.negative / val.count).toFixed(2)),
            })
        ),
        confidence_clarity: {
            average_clarity_score: parseFloat(
                (
                    combined.clarity_scores.reduce((a, b) => a + b, 0) /
                    combined.clarity_scores.length
                ).toFixed(2)
            ),
            low_clarity_examples: combined.unclear_feedback.slice(0, 5),
        },
    };

}