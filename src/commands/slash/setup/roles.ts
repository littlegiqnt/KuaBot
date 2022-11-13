import type { APISelectMenuOption, TextBasedChannel } from "discord.js";
import { ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } from "discord.js";
import { ActionRow } from "../../../structure/ActionRow";
import { SubSlashCommand } from "../../../structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "roles",
    async execute(interaction) {
        interaction.deferReply().then(() => interaction.deleteReply());

        if (!interaction.channel) return;

        await genderSelect(interaction.channel);
        await ageSelect(interaction.channel);
        await loveSelect(interaction.channel);
        await dmSelect(interaction.channel);
        await pingRelatedSelect(interaction.channel);
        await gamesSelect(interaction.channel);
    },
});

const genderSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(":restroom: 『성별선택』")
        .setDescription("본인의 성별을 선택해 주세요");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_male")
            .setEmoji("👦")
            .setLabel("남자")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_female")
            .setEmoji("👧")
            .setLabel("여자")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const ageSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("⏱️ 『나이대 선택』")
        .setDescription("본인의 나이를 선택해 주세요");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_adult")
            .setEmoji("🍷")
            .setLabel("성인")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_highschool")
            .setEmoji("📖")
            .setLabel("고등학생")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_middleschool")
            .setEmoji("📏")
            .setLabel("중학생")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const loveSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("🧡 『애인 유무』")
        .setDescription("현재 상태를 선택해 주세요");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_couple")
            .setEmoji("💘")
            .setLabel("커플")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_single")
            .setEmoji("🤍")
            .setLabel("솔로")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_foreveralone")
            .setEmoji("💙")
            .setLabel("모솔")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_love_private")
            .setEmoji("🤫")
            .setLabel("애인 비공개")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const dmSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("📨 『DM 여부』")
        .setDescription("DM을 허용 여부를 선택해 주세요");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_dm_allow")
            .setEmoji("⭕")
            .setLabel("DM 허용")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_dm_disallow")
            .setEmoji("❌")
            .setLabel("DM 비허용")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const pingRelatedSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("📌 『알람 관련』 (선택)")
        .setDescription("알람 관련된 역할을 선택해 주세요");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_announcement")
            .setEmoji("📢")
            .setLabel("공지 알림 받기")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_giveaway")
            .setEmoji("🎉")
            .setLabel("이벤트 알림 받기")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const gamesSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("🎮 『게임 선택』 (선택)")
        .setDescription("플레이 하시는 게임들을 선택해 주세요");
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
            .setMinValues(0)
            .setMaxValues(options.length)
            .setOptions(
                options,
            ),
    );

    return channel.send({ embeds: [ embed ], components: [ row1 ] });
};
