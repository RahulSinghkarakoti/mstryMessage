 
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { User } from "@/models/User.model";
import QuestionsModel from "@/models/Questions.model";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
    await dbConnect()
    const {questionId}=await request.json()
     
    try {
        const result = await QuestionsModel.findById(questionId) 
        if (!result) {
            return Response.json({
                success: false,
                message: "No question found",
            },
                {
                    status: 404
                })
        }
        // console.log(result)
        return Response.json({
            success: true,
            question:result.question,
        },
            {
                status: 200
            })

    }
    catch (error) {
        console.log(error)
        console.error("error in fetching questions ", error)
        return Response.json({
            success: false,
            message: "error in fetching questions :: Internal server error ",
        },
            {
                status: 500
            })

    }
}