import dbConnect  from '@/lib/dbConnect';

import UserModel from '@/models/User.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/option';
import QuestionsModel from '@/models/Questions.model';
// import { useSession } from "next-auth/react";


export async function POST(request: Request) {
    await dbConnect()
   try {
     
     const session= await getServerSession(authOptions);
     const userId=session?.user._id
     const { searchParams } = new URL(request.url)
     const messageId = searchParams.get('id')
        const {questionId} = await request.json()
        // console.log(questionId,messageId)
     if (!messageId)
         return Response.json({
             error: 'Message ID is required',
         }, {
             status: 404
         })
 
    // console.log("check 0")
    const question=await QuestionsModel.findByIdAndUpdate(questionId,
        { $pull: { feedbacks: { _id: messageId } } },
        { new: true }
    )
    // console.log("check 1")
    // console.log(question)
    if (!question) {
        return Response.json({
            message: 'failed to deleted message'
        }, {
            status: 500
        })
    }
     return Response.json({
            message: 'message  deleted succcessfully'
        }, {
            status: 200
        })
   } catch (error) {
    console.error(error)
      return Response.json({
             message: 'error occur during message deletion'
         }, {
             status: 500
         })
   }
}