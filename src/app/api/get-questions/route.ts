import { get } from "http";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { User } from "@/models/User.model";
import QuestionsModel from "@/models/Questions.model";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
    await dbConnect()
    const session=await getServerSession(authOptions)
    const user:User=session?.user
    if(!session || !session.user) {
        return Response.json({
            success: false,
            message: "You are not logged in",
        },
            {
                status: 401
            })
        }
    try {
        const questions = await QuestionsModel.find({ userId: user._id }) 
        if (!questions) {
            return Response.json({
                success: false,
                message: "No questions found",
            },
                {
                    status: 404
                })
        }
        return Response.json({
            success: true,
            questions,
        },
            {
                status: 200
            })

    }
    catch (error) {
        // console.log(object(error))
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