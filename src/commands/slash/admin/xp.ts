import { ApplicationCommandOptionType } from "discord.js";
import dbManager from "structure/DBManager";
import { SubSlashCommand } from "structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "xp",
    description: "유저의 xp 확인",
    args: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "확인 할 유저",
        },
    ],
    async execute(interaction) {
        const user = await dbManager.loadUser(interaction.user.id);
        interaction.reply({ ephemeral: false, content: `XP: ${user.totalXp}` });
    },
});
