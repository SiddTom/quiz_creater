import mongoose, {Schema, Document} from "mongoose";
export interface Quiz extends Document {
    name: string;
    description: string;
    createrId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}




const QuizSchema: Schema<Quiz> = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    createrId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
     },
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true}
});

const QuizModel =
  (mongoose.models.Quiz as mongoose.Model<Quiz>) ||
  mongoose.model<Quiz>('Quiz', QuizSchema);