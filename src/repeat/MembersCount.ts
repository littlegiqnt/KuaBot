import type { Client, VoiceChannel } from "discord.js";

export default async (client: Client) => {
    const guild = await client.guilds.fetch("1023072472712609873");
    if (!guild) return;
    setInterval(function () {
        const members = await guild.members.fetch()
        var memberCount = members.filter((member) => !member.user.bot);
        var memberCountChannel: VoiceChannel = client.channels.cache.get(
            "1023190822692323369"
        ) as VoiceChannel;
        memberCountChannel.setName(`『👤｜${memberCount}명』`);
    }, 1000);
};