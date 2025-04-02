import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { User } from "next-auth";
import QuestionsModel from "@/models/Questions.model";

export async function PUT(request: Request) {
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

    const userId = user._id
    const { isQuestionActive,questionId } = await request.json()
    // console.log("is avtive status banekdd->",isQuestionActive)
    try {

        const updatedQuestion =
         await QuestionsModel.findByIdAndUpdate(questionId, {
            isActive: isQuestionActive}, {
            new: true
        })
        if (!updatedQuestion) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept messages",
            },
                {
                    status: 401
                })
        }
        else {
        // console.log("in PUT function of accept-msg->",updatedQuestion.isActive)

            return Response.json({
                success: true,
                message: "message acceptence status updated successfully",
                
            },
                {
                    status: 200
                })
        }
    } catch (error) {
        return Response.json({
            message: "faile to update user status to acceptMessages",
            success: false
        }, {
            status: 500
        }
        )
    }

}

export async function GET(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "You are not logged in",
        },
            {
                status: 401
            })
    }
    // const userId = user._id
    const { searchParams } = new URL(request.url)
    const questionId =   searchParams.get('questionId')
    console.log("quesiton ID->",questionId)

    try {
        const questionById = await QuestionsModel.findById(questionId)
        if (!questionById) {
            return Response.json({
                success: false,
                message: "user not found",
            },
                {
                    status: 404
                })
        }
        console.log("in Get function of accept-msg->",questionById.isActive)

        return Response.json({
            success: true,
            isAcceptingMessages: questionById.isActive
        },
            {
                status: 200
            })

    } catch (error) {
        console.log("error in accept messages route ",error)
        return Response.json({
            message: "failed to get user status of acceptmessgess",
            success: false
        }, {
            status: 500
        }
        )
    }

}