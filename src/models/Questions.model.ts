import mongoose, { Document, Model } from "mongoose";
import { Message } from "./User.model";
import { Schema } from "mongoose";

 

export interface Question extends Document {
    _id: string;
    userId: mongoose.Types.ObjectId;
    question: string;
    feedbacks: [Message];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    timeAgo?: string; 
}

// const FeedbackSchema: mongoose.Schema<Message> = new mongoose.Schema({
//     content: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//   });

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const QuestionSchema: mongoose.Schema<Question> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        ref: 'User'
    },
    question: {
        type: String,
        required: [true, 'Question is required'],
        unique: true,
        trim: true
    },
    feedbacks: [MessageSchema],  // Using embedded documents instead of references
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const QuestionsModel = (mongoose.models.Question as Model<Question>) 
  || mongoose.model<Question>('Question', QuestionSchema);
export default QuestionsModel;