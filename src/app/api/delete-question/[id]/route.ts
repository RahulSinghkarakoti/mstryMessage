import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User.model";
import QuestionsModel from "@/models/Questions.model";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()
    try {
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
    
        const { id } = params;
        const result=await QuestionsModel.findByIdAndDelete(id)
        if (!result) {
            return Response.json({
                success: false,
                message: "Failed to delete question",
            },
                {
                    status: 500
                })
        }
        return Response.json({
            success: true,
            message: "Question deleted successfully",
        },
            {
                status: 200
            })
             
    } catch (error) {
        console.error("Error deleting question:", error)
        return Response.json({
            success: false,
            message: "Failed to delete question",
        },
            {
                status: 500
            })
        
    }

} 