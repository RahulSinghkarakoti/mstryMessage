import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { User } from "next-auth";
import mongoose from "mongoose";
import QuestionsModel from "@/models/Questions.model";

export async function POST(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "You are not logged in",
        },
            {
                status: 401
            })
    }


    // const userId = new mongoose.Types.ObjectId(user._id)
    const { questionId } = await request.json()
    try {
        console.log("check 0")
        const questionMessages=await QuestionsModel.findById(questionId).populate('feedbacks')
        if (!questionMessages) {
            return Response.json({
                success: false,
                message: "failed to get messages",
            },
                {
                    status: 401
                })
            }
        console.log("check 0")
        // console.log(questionMessages)
         
        return Response.json({
            success: true,
            message:questionMessages
        },
            {
                status: 200
            })
    } catch (error) {
        console.log("An unexpected error occure",error)
        return Response.json({
            success: false,
            message: "Error in getting messages",
        },
            {
                status: 500
            })
    }


}