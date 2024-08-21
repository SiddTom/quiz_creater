import mongoose, {Schema, Document} from "mongoose";

export interface Question extends Document {
    question: string;
    options: string[];
    answer: string;
    quizId: mongoose.Schema.Types.ObjectId;
}

const QuestionSchema: Schema<Question> = new Schema({
    question: {type: String, required: true},
    options: {type: [String], required: true},
    answer: {type: String, required: true},
    quizId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
     }
});

const QuestionModel = (mongoose.models.Question as mongoose.Model<Question>) || mongoose.model<Question>('Question', QuestionSchema);
 export default QuestionModel;