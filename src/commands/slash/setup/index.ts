import { GUILD_ID } from "../../../config";
import { SlashCommand } from "../../../structure/SlashCommand";
import buttons from "./buttons";
import instruction from "./instruction";
import roles from "./roles";
import stepOneVerify from "./stepOneVerify";
import support from "./support";
import test from "./test";

export default new SlashCommand({
    name: "setup",
    subCommands: [ buttons, roles, stepOneVerify, instruction, test, support ],
    guildID: GUILD_ID,
});
