import { Schema } from "mongoose";

export enum Status {
    CREATED,
    OPENED,
    CLOSED
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ISupportTicket {
    _id: string
    opener: string
    status: Status
    whenCreated: Date
    whenOpened: Date|null
    users: string[]
    transcript: string
}

export const supportTicketSchema = new Schema<ISupportTicket>({
    _id: String,
    opener: String,
    status: { type: Number, enum: Status },
    whenCreated: Date,
    whenOpened: Date,
    users: Array<String>,
    transcript: String,
});
