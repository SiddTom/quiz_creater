import QuizModel from "@/model/Quiz.model";
import dbConnect from "@/lib/dbconnect";
import { NextApiRequest, NextApiResponse } from 'next';
import {User} from "next-auth"
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth].js";


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { name, description } = req.body;
    const session = await getServerSession(authOptions);
    const _user = session?.user as User;
    if (!session) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    const createrId = _user.id;
    try {
        const quiz = await QuizModel.create({
            name,
            description,
            createrId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return res.status(201).json({ quiz });
    }
    catch (error) {
        console.error('An unexpected error occurred:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}