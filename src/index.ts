import * as dotenv from "dotenv";
dotenv.config();

import { Bot } from "./structure/Bot";
import events from "./events";
import { onPostLogin, onPreLogin } from "./workers";

const bot = new Bot({
    token: process.env.TOKEN!,
});

bot.registerEvents(events);
onPreLogin(bot);
bot.login().then(async () => {
    onPostLogin(bot);
});
