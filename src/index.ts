import { Bot } from './structure/Bot'
import events from './events'
import { TOKEN } from "./config";
import { onPostLogin, onPreLogin } from "./workers";

const bot = new Bot({
    token: TOKEN,
});

bot.registerEvents(events)
onPreLogin(bot);
bot.login().then(async () => {
    onPostLogin(bot);
});
