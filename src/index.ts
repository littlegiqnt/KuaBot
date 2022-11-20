import * as dotenv from "dotenv";
import Bot from "structure/Bot";
import dbManager from "structure/DBManager";
import registerExceptionListener from "utils/registerExceptionListener";
import registerSelfBot from "utils/registerSelfBot";
import events from "./events";

dotenv.config();
export const bot: Bot = new Bot({
    token: process.env.TOKEN!,
});

(async () => {
    await dbManager.connect();
    bot.registerEvents(events);
    bot.login().then(() => registerExceptionListener());
    registerSelfBot();
})();
