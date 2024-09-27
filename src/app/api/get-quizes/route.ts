import QuizModel from "@/model/Quiz.model";
import dbConnect from "@/lib/dbconnect";
import mongoose from "mongoose";
import {User} from "next-auth"
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route.js";

export async function GET(request: Request){
    await dbConnect();
    const session = await getServerSession(authOptions)

    const _user = session?.user as User;
    
    if (!session) {
        return Response.json(
          { success: false, message: 'Not authenticated' },
          { status: 401 }
        );
      }
      // const userId = new mongoose.Types.ObjectId(_user.id);
      const userId = _user.id;
      try{
        const Quizs = await QuizModel.aggregate([
            {
                $match:{
                    createrId: userId,
                }
            }
        ])
        return Response.json(
            Quizs
        );
      }
      catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
          { message: 'Internal server error', success: false },
          { status: 500 }
        );
      }
}