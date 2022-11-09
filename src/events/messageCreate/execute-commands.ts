import { PREFIX } from "config";
import commands from "../../commands/text";
import createMessageCreateEventListener from "./createMessageCreateEventListener";

export default createMessageCreateEventListener((msg) => {
    if (!msg.content.startsWith(PREFIX)) return;

    for (const command of commands) {
        if (command.isMine(msg)) {
            command.execute(msg);
        }
    }
});
