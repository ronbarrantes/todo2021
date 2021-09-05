import * as mongoose from 'mongoose'

interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    // passwordHash: string; //ADD THIS LATER
    // token: string; // ADD THIS LATER
    createdAt?: number;
    _id?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    firstName:  { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    createdAt: { type: Number, default: () => Date.now() },
})

export const UserModel = mongoose.model('User', UserSchema)