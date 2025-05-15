import mongoose, { Schema, Document, Model } from 'mongoose';

interface KeyTopicEntity {
  topic: string;
  mentions: number;
}

interface TrendPoint {
  date: string; // ISO date string
  positive: number;
  negative: number;
}

interface EmotionMetric{
  emotion:string,
  score:number
}

export interface FeedbackAnalysisDocument extends Document {
  questionId: string;
  question: string;
  sentiment_distribution: {[label: string]: number;};
  overall_sentiment: {
    label: string;
    score: number;
  };
  key_topics_entities: KeyTopicEntity[];
  emotion_intensity:EmotionMetric[];
  suggested_actions: string[];
  trend_over_time: TrendPoint[];
  confidence_clarity: {
    average_clarity_score: number;
    average_confidence_score:number;
    low_clarity_examples: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const FeedbackAnalysisSchema = new Schema<FeedbackAnalysisDocument>(
  {
    questionId: { type: String, required: true },
    question: { type: String, required: true },
    sentiment_distribution: {
      type: Map,
      of: Number,
      default: {},
    },
    overall_sentiment: {
      label: { type: String, required: true },
      score: { type: Number, required: true },
    },
    key_topics_entities: [
      {
        topic: { type: String, required: true },
        mentions: { type: Number, required: true },
      },
    ],
    emotion_intensity: [
      {
        emotion:{type:String,required:true},
        score:{type:Number , required:true}
      }
    ],
    suggested_actions: [{ type: String, required: true }],
    trend_over_time: [
      {
        date: { type: String, required: true },
        positive: { type: Number, required: true },
        negative: { type: Number, required: true },
      },
    ],
    confidence_clarity: {
      average_clarity_score: { type: Number, required: true },
      average_confidence_score: { type: Number, required: true },

      low_clarity_examples: [{ type: String, required: true }],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true}
);

const FeedbackAnalysisModel=(mongoose.models.FeedbackAnalysis as Model<FeedbackAnalysisDocument>) || mongoose.model<FeedbackAnalysisDocument>('FeedbackAnalysis', FeedbackAnalysisSchema);
export default  FeedbackAnalysisModel;