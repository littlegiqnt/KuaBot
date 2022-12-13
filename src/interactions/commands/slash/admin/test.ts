import { GuildMember } from "discord.js";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";
import { createLevelImage } from "utils/level/levelImage";

export default new SubCommand({
    name: "test",
    async execute(interaction) {
        const { member } = interaction;
        if (!(member instanceof GuildMember)) return;

        await interaction.deferReply();
        interaction.editReply({ files: [
            await createLevelImage(member, await dbManager.loadUser(member.id)),
        ] });
    },
});
