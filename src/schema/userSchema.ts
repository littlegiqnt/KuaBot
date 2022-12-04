import { Locale } from "discord.js";
import { Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IUser {
    _id: string
    lang: Locale
    totalXp: number
    xp: {
        chat: number
        voice: number
    }
    coupleSince: Date
    birthday: {
        month: number
        day: number
    }
}

export const userSchema = new Schema<IUser>({
    _id: String,
    lang: { type: String, enum: Locale },
    totalXp: { type: Number, default: 0 },
    xp: { chat: { type: Number, default: 0 }, voice: { type: Number, default: 0 } },
    coupleSince: Date,
    birthday: { month: Number, day: Number },
});
