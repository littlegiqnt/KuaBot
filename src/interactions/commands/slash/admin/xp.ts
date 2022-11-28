import { ApplicationCommandOptionType } from "discord.js";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "xp",
    description: {
        en: "Check user's xp",
        ko: "유저의 xp 확인",
    },
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
