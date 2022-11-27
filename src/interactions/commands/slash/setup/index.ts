import { GUILD_ID } from "config";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import buttons from "./buttons";
import en from "./en";
import ko from "./ko";
import language from "./language";
import test from "./test";

export default new SlashCommand({
    name: "setup",
    subCommands: [
        ko,
        en,
        buttons,
        test,
        language,
    ],
    guildID: GUILD_ID,
});
