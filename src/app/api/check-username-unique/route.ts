import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    // localhost:3000/api/cuu/?username=rahul?phone=1234 
  console.log("checkin username")
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        const result = UsernameQuerySchema.safeParse(queryParam)
        // console.log(result)
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameError?.length > 0 ? usernameError.join(',') : "invalid query parameter"
            }, {
                status: 400
            }
            )
        }
        const { username } = result.data
        console.log("username->>>",username)
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
          });
          if (existingVerifiedUser) {
            return Response.json(
              {
                success: false,
                message: 'Username is already taken',
              },
              { status: 200 }
            );
          }
      
          return Response.json(
            {
              success: true,
              message: 'Username is unique',
            },
            { status: 200 }
          );
    } catch (error) {
        console.log("error checking username", error)
        return Response.json({
            success: false,
            message: "Error checking username"
        },
            {
                status: 500
            }
        )

    }


}