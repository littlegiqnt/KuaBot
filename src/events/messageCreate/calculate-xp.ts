import { GUILD_ID } from "config";
import { onMessage } from "utils/level/calculate-chat-xp";
import createMessageCreateEventListener from "./createMessageCreateEventListener";

export default createMessageCreateEventListener(async (message) => {
    if (message.guildId !== GUILD_ID) return;
    await onMessage(message);
});