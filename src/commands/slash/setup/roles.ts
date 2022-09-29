import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, EmbedBuilder, TextBasedChannel } from "discord.js";
import { SubSlashCommand } from '../../../structure/SubSlashCommand'

export default new SubSlashCommand({
    name: "roles",
    async execute(interaction) {
        await interaction.deferReply();
        await interaction.deleteReply();

        if (!interaction.channel) return;

        sexSelect(interaction.channel);
        ageSelect(interaction.channel);
        loveSelect(interaction.channel);
        pingRelatedSelect(interaction.channel);
        whenOnlineSelect(interaction.channel);
    },
});

async function sexSelect(channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(":restroom: 『성별선택』")
            .setDescription("본인의 성별을 선택하세요!");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("male")
            .setEmoji("👦")
            .setLabel("남자")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("female")
            .setEmoji("👧")
            .setLabel("여자")
            .setStyle(ButtonStyle.Primary)
    );
    await channel.send({ embeds: [embed], components: [row] });
}

async function ageSelect(channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("⏱️ 『나이대 선택』")
            .setDescription("본인의 나이를 선택하세요!");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("adult")
            .setEmoji("🍷")
            .setLabel("성인")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("highschool")
            .setEmoji("📖")
            .setLabel("고등학생")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("middleschool")
            .setEmoji("📏")
            .setLabel("중학생")
            .setStyle(ButtonStyle.Primary),
    );
    await channel.send({ embeds: [embed], components: [row] });
}

async function loveSelect(channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("🧡 『애인 유무』")
            .setDescription("현재 상태를 선택하세요!");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("couple")
            .setEmoji("💘")
            .setLabel("커플")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("single")
            .setEmoji("🤍")
            .setLabel("솔로")
            .setStyle(ButtonStyle.Primary),
    );
    await channel.send({ embeds: [embed], components: [row] });
}

async function pingRelatedSelect(channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("📌 『알람 관련』")
            .setDescription("알람 관련된 역할을 선택하세요!");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("announcement")
            .setEmoji("📢")
            .setLabel("공지 알림받기")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("dm_allow")
            .setEmoji("⭕")
            .setLabel("DM 허용")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("dm_disallow")
            .setEmoji("❌")
            .setLabel("DM 비허용")
            .setStyle(ButtonStyle.Primary),
    );
    await channel.send({ embeds: [embed], components: [row] });
}

async function whenOnlineSelect(channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("⌛ 『출몰 시간』")
            .setDescription("언제 서버에 등장하실 수 있나요?");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("morning")
            .setEmoji("🌄")
            .setLabel("아침")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("noon")
            .setEmoji("🌞")
            .setLabel("낮")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("night")
            .setEmoji("🌙")
            .setLabel("밤")
            .setStyle(ButtonStyle.Primary),
    );
    await channel.send({ embeds: [embed], components: [row] });
}