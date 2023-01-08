import { GUILD_ID } from "config";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import { isNormalTextChannel } from "utils/checkChannel";

export default new SlashCommand({
    name: "clear",
    description: {
        en: "Delete messages",
        ko: "메세지 삭제",
    },
    args: [
        {
            type: ApplicationCommandOptionType.Integer,
            name: "amount",
            description: "Amount of messages to delete",
            descriptionLocalizations: {
                ko: "지울 메세지 개수",
            },
        },
    ],
    async execute(interaction) {
        const { channel } = interaction;
        const amount = interaction.options.getInteger("amount")!;
        if (channel == null || !isNormalTextChannel(channel)) return;

        interaction.deferReply({ ephemeral: true });

        const { size } = await channel.bulkDelete(amount);

        const embed = new EmbedBuilder()
            .setColor("green")
            .setTitle("삭제 성공!")
            .setDescription(`총 ${size}/${amount}개의 메세지가 삭제됐어요!`);

        interaction.editReply({ embeds: [embed] });
    },
    guildId: GUILD_ID,
});
