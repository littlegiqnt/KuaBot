import { GUILD_ID } from "config";
import { SlashCommand } from "structure/SlashCommand";
import error from "./error";
import reboot from "./reboot";
import xp from "./xp";

export default new SlashCommand({
    name: "admin",
    subCommands: [ xp, reboot, error ],
    guildID: GUILD_ID,
});
