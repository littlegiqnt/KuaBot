import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import { SubSlashCommand } from "structure/interaction/command/SubSlashCommand";

export default new SubSlashCommand({
    name: "buttons",
    description: "버튼 스타일 목록 보기",
    args: [],
    async execute(interaction) {
        const row = new ActionRow<ButtonBuilder>(
            new ButtonBuilder()
                .setCustomId("Primary")
                .setLabel("Primary")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("Success")
                .setLabel("Success")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("Secondary")
                .setLabel("Secondary")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setLabel("Link")
                .setStyle(ButtonStyle.Link)
                .setURL("https://google.com"),
            new ButtonBuilder()
                .setCustomId("Danger")
                .setLabel("Danger")
                .setStyle(ButtonStyle.Danger),
        );

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("버튼 스타일 목록")
            .setDescription("버튼 스타일들 목록!");

        await interaction.reply({ ephemeral: false, embeds: [ embed ], components: [ row ] });
    },
});
