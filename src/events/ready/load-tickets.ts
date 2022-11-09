import { GUILD_ID } from "config";
import dbManager from "structure/DBManager";
import handleErrorReply from "utils/handleErrorReply";
import createReadyEventListener from "./createReadyEventListener";

export default createReadyEventListener(async (client) => {
    try {
        const tickets = await dbManager.SupportTicket.find({});
        tickets.forEach(async (value) => {
            const channel = client.channels.cache.get(value.id);
            if (channel == null) {
                value.delete();
                return;
            }
            const guild = client.guilds.cache.get(GUILD_ID);
            if (guild == null) {
                return;
            }
            if (await guild.members.fetch(value.opener) == null) {
                value.delete();
                channel.delete();
            }
        });
    } catch (e) {
        handleErrorReply(e);
    }
});
