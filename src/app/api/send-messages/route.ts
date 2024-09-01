import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { User } from "next-auth";
import { messagesSchema } from "@/schemas/messageSchema";
import {Message} from "@/models/User.model"


export async function POST(request:Request)
{
    await dbConnect()
    

    const {username,content}=await request.json()
    console.log(username,content)
    try {
        const user=await UserModel.findOne({username})
        if(!user)
        {
            return Response.json({
                success: false,
                message: "user not found",
            },
                {
                    status: 404
                })
        }
        //is user acceptinng the messages
        if(!user.isAcceptingMessages)
        {
            return Response.json({
                success: false,
                message: "User is not accepting the messages",
            },
                {
                    status: 403
                })
        }
        const newMessage={content,createdAt:new Date()} as Message
        user.messages.push(newMessage)
        await user.save()
        return Response.json({
            success: true,
            message: "Message send successfully",
        },
            {
                status: 200
            })
    } catch (error) {
console.log("error in adding messages",error)
        return Response.json({
            success: false,
            message: "error in adding messages :: Internal server error ",
        },
            {
                status: 500
            })
    }

}