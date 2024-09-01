import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { now } from "mongoose";
import { z } from "zod";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { code, username } = await request.json()
        // console.log(code,username)
        const decodedUsername = decodeURIComponent(username)
        console.log(decodedUsername)
        const user = await UserModel.findOne({ username: decodedUsername })
        console.log(user)
        if (!user) {
            return Response.json({
                message: "User not found",
                success: false,
            }, {
                status: 404
            })
        }
        const isCodeValid = user.verifyCode === code
        console.log(isCodeValid)
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json({
                message: "account verified successfully",
                success: true,
            }, {
                status: 200
            })

        }
        else if (!isCodeNotExpired) {
            return Response.json({
                message: "user verification code expire , please sign-up again ",
                success: false,
            }, {
                status: 400
            })
        }

        else {
            return Response.json({
                message: "incorrect verification code ",
                success: false,
            }, {
                status: 400
            })
        }

    } catch (error) {
        console.error(error)
        return Response.json({
            success: false,
            message: "error in verifying user",
        },
            { status: 500 }
        )

    }

}