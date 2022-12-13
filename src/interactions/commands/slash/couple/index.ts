import { GUILD_ID } from "config";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import days from "./days";
import since from "./since";

export default new SlashCommand({
    name: "couple",
    nameLocale: {
        ko: "커플",
    },
    subCommands: [ since, days ],
    guildId: GUILD_ID,
});
