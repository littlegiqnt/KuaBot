import { Locale } from "discord.js";
import { Schema } from "mongoose";

export enum TicketType {
    REPORT,
    SUGGESTION,
    OTHER,
}

export type TicketTypeKey = keyof typeof TicketType;

export enum TicketStatus {
    CREATED,
    OPENED,
    CLOSED,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ISupportTicket {
    _id: string
    opener: string
    status: TicketStatus
    type: TicketType
    lang: Locale
    whenCreated: Date
    whenOpened: Date | null
    users: Array<string>
    transcript: string
}

export const supportTicketSchema = new Schema<ISupportTicket>({
    _id: String,
    opener: String,
    status: { type: Number, enum: TicketStatus, default: TicketStatus.CREATED },
    type: { type: Number, enum: TicketType, default: TicketType.OTHER },
    lang: { type: String, enum: Locale, default: Locale.EnglishUS },
    whenCreated: Date,
    whenOpened: Date,
    users: Array<String>,
    transcript: String,
});
