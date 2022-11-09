import type { Client } from "discord.js";
import { GUILD_ID } from "../config";

export default async (client: Client) => {
    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.fetch();
    const memberCountChannel = guild.channels.cache.get("1023190822692323369");
    if (memberCountChannel == null) return;
    memberCountChannel.setName(`『👤｜${guild.memberCount}명』`);
};
