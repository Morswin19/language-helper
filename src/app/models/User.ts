import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    lastLogin: Date;
    streak: number;
}

const userSchema:Schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    streak: {
        type: Number,
        default: 0,
    }
})

const User = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default User;