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
            name: "user",
            description: "user to check",
            nameLocalizations: {
                ko: "유저",
            },
            descriptionLocalizations: {
                ko: "확인 할 유저",
            },
        },
    ],
    async execute(interaction) {
        const user = await dbManager.loadUser(interaction.options.getUser("user")!.id);
        interaction.reply({ ephemeral: false, content: `chat: ${user.xp.chat}\nvoice: ${user.xp.voice}` });
    },
});
