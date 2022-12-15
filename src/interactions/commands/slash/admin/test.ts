import { GuildMember } from "discord.js";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "test",
    async execute(interaction) {
        const { member } = interaction;
        if (!(member instanceof GuildMember)) return;

        await interaction.deferReply();
        /* interaction.editReply({ files: [
            await createLevelImage(member, await dbManager.loadUser(member.id)),
        ] });*/
    },
});
