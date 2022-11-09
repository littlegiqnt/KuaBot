import { Schema } from "mongoose";

export enum TicketStatus {
    CREATED,
    OPENED,
    CLOSED
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ISupportTicket {
    _id: string
    opener: string
    status: TicketStatus
    whenCreated: Date
    whenOpened: Date|null
    users: string[]
    transcript: string
}

export const supportTicketSchema = new Schema<ISupportTicket>({
    _id: String,
    opener: String,
    status: { type: Number, enum: TicketStatus },
    whenCreated: Date,
    whenOpened: Date,
    users: Array<String>,
    transcript: String,
});
