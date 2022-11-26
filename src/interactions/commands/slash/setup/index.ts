import { GUILD_ID } from "config";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import buttons from "./buttons";
import instruction from "./instruction";
import language from "./language";
import roles from "./roles";
import roles_en from "./roles_en";
import support from "./support";
import test from "./test";

export default new SlashCommand({
    name: "setup",
    subCommands: [
        buttons,
        roles,
        roles_en,
        instruction,
        test,
        support,
        language,
    ],
    guildID: GUILD_ID,
});
