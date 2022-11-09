import { GUILD_ID } from "config";
import { GuildChannel } from "discord.js";
import { onTicketDelete } from "utils/tickets/closeTicketHandler";
import createChannelDeleteEventListener from "./createChannelDeleteEventListener";

export default createChannelDeleteEventListener(async (channel) => {
    if (channel instanceof GuildChannel && channel.guildId === GUILD_ID) {
        await onTicketDelete(channel);
    }
});
