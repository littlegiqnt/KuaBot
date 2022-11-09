import handleErrorReply from "utils/handleErrorReply";
import commands from "../../commands/slash";
import createInteractionCreateEventListener from "./createInteractionCreateEventListener";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    for (const command of commands) {
        if (command.isMine(interaction)) {
            try {
                await command.execute(interaction);
            } catch (e) {
                handleErrorReply(e, interaction);
            }
        }
    }
});
