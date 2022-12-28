import { config } from "dotenv";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { join } from "path";
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
        i18next.use(Backend)
            .init({
                lng: "en",
                fallbackLng: "en",
                preload: ["en", "ko"],
                backend: {
                    loadPath: join(__dirname, "../locales/{{lng}}.json"),
                },
            }),
    ]);
    bot.registerEvents(events);
    bot.login()
        .then(() => registerExceptionListener());
    registerSelfBot();
})();
