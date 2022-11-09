import { Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IUser {
    _id: string
    totalXp: number
    coupleSince: Date
    birthday: {
        month: number
        day: number
    }
}

export const userSchema = new Schema<IUser>({
    _id: String,
    totalXp: Number,
    coupleSince: Date,
    birthday: { month: Number, day: Number },
});
