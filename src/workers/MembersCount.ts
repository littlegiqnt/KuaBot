import type { Client, VoiceChannel } from "discord.js";

export default async (client: Client) => {
    setInterval(async function () {
        const guild = await client.guilds.fetch("1023072472712609873");
        if (!guild) return;
        await guild.fetch();
        await guild.emojis.fetch();
        var memberCountChannel: VoiceChannel = client.channels.cache.get("1023190822692323369") as VoiceChannel;
        memberCountChannel.setName(`『👤｜${guild.memberCount}명』`);
    }, 10000);
};
