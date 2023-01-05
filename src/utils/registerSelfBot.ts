import { Client } from "discord.js-selfbot-v13";
import isProduction from "./isProduction";

export default async () => {
    if (!isProduction()) {
        return;
    }
    const client: Client = new Client({ readyStatus: false });
    client.on("ready", async () => {
        console.log(`${client.user?.username ?? "(Undefined)"} is ready`);
        client.user?.setStatus("idle");
        client.user?.setAFK(true);
    });
    client.login(process.env.USER_TOKEN);
};
