import { GUILD_ID } from "config";
import { ApplicationCommandOptionType, EmbedBuilder, TextChannel } from "discord.js";
import Color from "structure/Color";
import { SlashCommand } from "structure/SlashCommand";

export default new SlashCommand({
    name: "clear",
    args: [
        {
            type: ApplicationCommandOptionType.Integer,
            name: "개수",
            description: "지울 메세지 개수",
        },
    ],
    async execute(interaction) {
        const amount = interaction.options.getInteger("개수")!;
        const { channel } = interaction;
        if (!(channel instanceof TextChannel)) return;

        interaction.deferReply({ ephemeral: true });

        const { size } = await channel.bulkDelete(amount);

        const embed = new EmbedBuilder()
            .setColor(Color.GREEN)
            .setTitle("삭제 성공!")
            .setDescription(`총 ${size}/${amount}개의 메세지가 삭제됐어요!`);

        interaction.editReply({ embeds: [ embed ] });
    },
    guildID: GUILD_ID,
});
