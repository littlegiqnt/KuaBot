import { Client } from "discord.js-selfbot-v13";
import isProduction from "./isProduction";

export default async () => {
    if (!isProduction()) {
        return;
    }
    const client: Client = new Client({ checkUpdate: false });
    client.on("ready", async () => {
        console.log(`${client.user?.username ?? "(Undefined)"} is ready`);
        setInterval(async () => {
            client.user?.setAFK(true);
        }, 1000 * 10);
    });
    client.login("NDU0OTI3MDAwNDkwOTk5ODA5.G29GIS.ktIYvJ0kUPby_JzDfZlBQLX7JFJaYQ-mC4iK8A");
};
