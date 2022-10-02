import { createMessageCreateEventListener } from "./index";
import commands from "../../commands/text";

export default createMessageCreateEventListener((msg) => {
    if (!msg.content.startsWith(process.env.PREFIX!)) return;

    for (const command of commands) {
        if (command.isMine(msg)) {
            command.execute(msg);
        }
    }
});
