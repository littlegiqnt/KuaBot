import { ActivityType, Client } from "discord.js";

export default async (client: Client) => {
    client.user?.setActivity("Prism 친목 서버 전용 봇", { type: ActivityType.Playing });
};