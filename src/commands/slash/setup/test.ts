import type { APISelectMenuOption } from "discord.js";
import { ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import { SubSlashCommand } from "../../../structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "test",
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("🎮 『게임 선택』 (선택)")
            .setDescription("플레이 하시는 게임들을 선택해 주세욥!");
        const options: APISelectMenuOption[] = [
            {
                label: "리그오브레전드",
                value: "leagueOfLegends",
            },
            {
                label: "오버워치",
                value: "overwatch",
            },
            {
                label: "배틀그라운드",
                value: "battlegrounds",
            },
            {
                label: "발로란트",
                value: "valorant",
            },
            {
                label: "메이플스토리",
                value: "maplestory",
            },
            {
                label: "피파 온라인",
                value: "fifaonline",
            },
            {
                label: "카트라이더",
                value: "kartrider",
            },
            {
                label: "마인크래프트",
                value: "minecraft",
            },
            {
                label: "스팀",
                value: "steam",
            },
        ];
        const row1 = new ActionRow<SelectMenuBuilder>(
            new SelectMenuBuilder()
                .setCustomId("selectroles_games")
                .setPlaceholder("게임들을 고르세요!")
                .setMinValues(1)
                .setMaxValues(options.length)
                .setOptions(
                    options,
                ),
        );
        const row2 = new ActionRow<ButtonBuilder>(
            new ButtonBuilder()
                .setCustomId("selectroles_resetgames")
                .setLabel("선택 전부 해제")
                .setStyle(ButtonStyle.Primary),
        );

        await interaction.reply({ ephemeral: false, embeds: [ embed ], components: [ row1, row2 ] });
    },
});
