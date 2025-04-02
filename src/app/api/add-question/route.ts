import dbConnect from "@/lib/dbConnect"
import UserModel, { User } from "@/models/User.model"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/option"
import QuestionsModel from "@/models/Questions.model"


export async function POST(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user
    // //console.log(user)
    const { question } = await request.json()
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "You are not logged in",
        },
            {
                status: 401
            })
        }
            //console.log("check 0")
    const userId = new mongoose.Types.ObjectId(user._id as string)
    try {
        //console.log("check 1")
        const existingQuestion = await QuestionsModel.findOne({ userId, question })
        //console.log("check 1.5")
        if (existingQuestion) {
            return Response.json({
                success: false,
                message: "Question already exists",
            },
                {
                    status: 400
                })
        }
        //console.log("check 1.75")
        const savedQuestion = await QuestionsModel.create({
            userId,
            question,
            feedbacks: [],
            isActive: true
        })
        //console.log("check 2")

        if (!savedQuestion) {
            return Response.json({
                success: false,
                message: "Failed to add question",
            },
                {
                    status: 500
                })
        }
        return Response.json({
            success: true,
            message: "Question added successfully",
        },
            {
                status: 200
            })

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "error in adding question :: Internal server error ",
        },
            {
                status: 500
            })

    }




}