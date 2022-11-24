import { DB_URI } from "config";
import type { HydratedDocument } from "mongoose";
import { connect, connection, model } from "mongoose";
import type { ISupportTicket } from "schema/ticketSchema";
import { supportTicketSchema } from "schema/ticketSchema";
import type { IUser } from "schema/userSchema";
import { userSchema } from "schema/userSchema";

export class DbManager {
    private uri: string;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public readonly User = model<IUser>("User", userSchema);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public readonly SupportTicket = model<ISupportTicket>("SupportTicket", supportTicketSchema);

    constructor(uri: string) {
        this.uri = uri;
    }

    /**
     * Connect to the db
     */
    public async connect() {
        console.log("Connecting to DB...");
        return connect(this.uri, {
            socketTimeoutMS: 0,
            connectTimeoutMS: 0,
        })
            .catch((error) => { throw error; })
            .finally(() => console.log("Connected to DB"));
    }

    public isConnected(): boolean {
        return connection.readyState === 1;
    }

    public async loadUser(id: string): Promise<HydratedDocument<IUser>> {
        const user = await this.User.findById(id);
        if (user) {
            if (user.totalXp == null) {
                user.totalXp = 0;
            }
            return user;
        }
        return await this.User.create({
            _id: id,
            totalXp: 0,
        });
    }
}

const dbManager = new DbManager(DB_URI);
export default dbManager;
