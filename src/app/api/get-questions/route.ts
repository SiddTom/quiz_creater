import dbConnect from "@/lib/dbconnect";
import QuestionModel from "@/model/Question.model";
import mongoose from "mongoose";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    await dbConnect();

    // Create a URL object from the request URL
    const url = new URL(request.url);

    // Extract the _quizid query parameter
    const _quizid = url.searchParams.get('_quizid');
    if (!_quizid || !mongoose.Types.ObjectId.isValid(_quizid)) {
        return new Response('Invalid or missing quiz ID', { status: 400 });
    }

    const Quizid = new mongoose.Types.ObjectId(_quizid as string)

    try{
        const Questions = await QuestionModel.aggregate([
            {
                $match:{
                    quizid: Quizid
                }
            }
        ])
        return Response.json(
            {Questions},
            {
                status: 200,
            }
        )
    }
    catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
          { message: 'Internal server error', success: false },
          { status: 500 }
        );
      }
}