import { GUILD_ID } from "config";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import buttons from "./buttons";
import instruction from "./instruction";
import language from "./language";
import roles from "./roles";
import support from "./support";

export default new SlashCommand({
    name: "setup",
    subCommands: [
        buttons,
        instruction,
        language,
        roles,
        support,
    ],
    guildId: GUILD_ID,
});
