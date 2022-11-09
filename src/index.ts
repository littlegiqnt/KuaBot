import * as dotenv from "dotenv";
import dbManager from "structure/DBManager";
import registerExceptionListener from "utils/registerExceptionListener";
import registerSelfBot from "utils/registerSelfBot";
import events from "./events";
import Bot from "./structure/Bot";

dotenv.config();
export const bot = new Bot({
    token: process.env.TOKEN ?? "",
});

(async () => {
    await dbManager.connect();
    bot.registerEvents(events);
    bot.login().then(() => registerExceptionListener());
    registerSelfBot();
})();
