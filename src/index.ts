import { config } from "dotenv";
import Bot from "structure/Bot";
import dbManager from "structure/DBManager";
import createMongoServer from "utils/createMongoServer";
import isProduction from "utils/isProduction";
import registerExceptionListener from "utils/registerExceptionListener";
import registerSelfBot from "utils/registerSelfBot";
import { DB_URI } from "./config";
import events from "./events";

config();
export const bot: Bot = new Bot({
    token: process.env.TOKEN!,
});

(async () => {
    await Promise.all([
        dbManager.connect(isProduction()
            ? DB_URI
            : await createMongoServer()),
    ]);
    bot.registerEvents(events);
    bot.login()
        .then(() => registerExceptionListener());
    registerSelfBot();
})();
