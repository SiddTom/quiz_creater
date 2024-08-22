import dbConnect from "@/lib/dbconnect";
import QuestionModel from "@/model/Question.model";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    // Create a URL object from the request URL
    const { _quizid } = req.query;

    // Extract the _quizid query parameter
    if (!_quizid || !mongoose.Types.ObjectId.isValid(_quizid as string)) {
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { question, options, answer } = req.body;
    const { _quizid } = req.query;

    // Extract the _quizid query parameter
    if (!_quizid || !mongoose.Types.ObjectId.isValid(_quizid as string)) {
        return new Response('Invalid or missing quiz ID', { status: 400 });
    }

    const quizid = new mongoose.Types.ObjectId(_quizid as string)
    try {
        const newQuestion = await QuestionModel.create({
            question,
            options,
            answer,
            quizid,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return Response.json(
            {newQuestion},
            {
                status: 201
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