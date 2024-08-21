import mongoose , {Schema,Document} from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;   
}

const UserSchema: Schema<User> = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;