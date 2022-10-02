import * as dotenv from "dotenv";
dotenv.config();

import { Bot } from "./structure/Bot";
import events from "./events";
import { onPostLogin, onPreLogin } from "./workers";
import { RolesManager } from "./RolesManager";

const bot = new Bot({
    token: process.env.TOKEN!,
});

onPreLogin(bot);
bot.login().then(async () => {
    bot.registerEvents(events);
    await RolesManager.init(bot);
    onPostLogin(bot);
});
