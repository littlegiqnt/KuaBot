import { connect, connection, model, set } from "mongoose";
import type { ISupportTicket } from "schema/ticketSchema";
import { supportTicketSchema } from "schema/ticketSchema";
import type { IUser } from "schema/userSchema";
import { userSchema } from "schema/userSchema";

export class DbManager {
    /* eslint-disable @typescript-eslint/naming-convention */
    public readonly User = model<IUser>("User", userSchema);
    public readonly SupportTicket = model<ISupportTicket>("SupportTicket", supportTicketSchema);
    /* eslint-disable @typescript-eslint/naming-convention */

    /**
     * Connect to the db
     */
    public async connect(uri: string) {
        console.log("Connecting to DB...");
        set("strictQuery", false);
        return connect(uri, {
            /* eslint-disable @typescript-eslint/naming-convention */
            connectTimeoutMS: 3000,
            /* eslint-enable @typescript-eslint/naming-convention */
        })
            .catch((error) => {
                throw error;
            })
            .finally(() =>
                console.log("Connected to DB"));
    }

    public isConnected(): boolean {
        return connection.readyState === 1;
    }

    public async loadUser(id: string) {
        const user = await this.User.findById(id);
        if (user == null) {
            // eslint-disable-next-line no-return-await
            return await this.User.create({
                _id: id,
            });
        }
        return user;
    }
}

const dbManager = new DbManager();
export default dbManager;
