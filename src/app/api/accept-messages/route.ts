import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { User } from "next-auth";

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

    const userId = user._id
    const { acceptMessages } = await request.json()
    try {

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessages: acceptMessages
        }, {
            new: true
        })
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept messages",
            },
                {
                    status: 401
                })
        }
        else {
            return Response.json({
                success: true,
                message: "message acceptence status updated successfully",
                updatedUser
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
    const userId = user._id
    try {
        const foundUser = await UserModel.findById(userId)
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "user not found",
            },
                {
                    status: 404
                })
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessages
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