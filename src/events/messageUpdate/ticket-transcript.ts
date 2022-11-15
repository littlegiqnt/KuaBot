import { Message } from "discord.js";
import { updateTranscriptMessage } from "utils/tickets/ticketTranscriptHandler";
import createMessageUpdateEventListener from "./createMessageUpdateEventListener";

export default createMessageUpdateEventListener(async (oldMessage, newMessage) => {
    if (!(oldMessage instanceof Message) || !(newMessage instanceof Message)) return;
    await updateTranscriptMessage(oldMessage, newMessage);
});
