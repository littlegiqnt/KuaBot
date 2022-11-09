import { addTranscriptMessage } from "utils/tickets/ticketTranscriptHandler";
import createMessageCreateEventListener from "./createMessageCreateEventListener";

export default createMessageCreateEventListener(async (message) => {
    await addTranscriptMessage(message);
});
