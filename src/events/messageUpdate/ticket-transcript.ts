import { updateTranscriptMessage } from "utils/tickets/ticketTranscriptHandler";
import createMessageUpdateEventListener from "./createMessageUpdateEventListener";

export default createMessageUpdateEventListener(async (oldMessage, newMessage) => {
    await updateTranscriptMessage(oldMessage, newMessage);
});
