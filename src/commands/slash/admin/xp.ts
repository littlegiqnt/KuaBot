import { ApplicationCommandOptionType } from "discord.js";
import Bot from "structure/Bot";
import dbManager from "structure/DBManager";
import { SubSlashCommand } from "structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "xp",
    args: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "확인 할 유저",
        },
    ],
    async execute(interaction) {
        const bot = interaction.client;
        if (!(bot instanceof Bot)) {
            return;
        }
        const user = await dbManager.loadUser(interaction.user.id);
        interaction.reply({ ephemeral: false, content: `XP: ${user.totalXp}` });
    },
});
