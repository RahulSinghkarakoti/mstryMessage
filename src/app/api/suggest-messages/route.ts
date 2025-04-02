 
 
import {GoogleGenerativeAI,GenerateContentResult } from '@google/generative-ai'

async function generateOpenEndedQuestions(apiKey: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

  try {
    const result: GenerateContentResult = await model.generateContent(prompt);
    const response = result.response;
    const text: string = response.text();

    return text;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;  
  }
}
export async function POST(req: Request) {

  try {
    

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey){
        throw new Error("GEMINI_API_KEY is not defined in the environment variables");
    } 
    const text: string = await generateOpenEndedQuestions(apiKey); 
    // console.log(text);
    
    const match = text.split("||");
    // console.log(match)
    if (match !== null) { 
      return Response.json({
        success: true,
        text: match
      }, {
        status: 200
      })
    } else {
      // console.log("No questions found.");
      return Response.json({
        success: false,
        message:"failedd to fetch suggestions"
      }, {
        status: 500
      })
    }
  

  } catch (error) {
    console.log(error)
  }

}