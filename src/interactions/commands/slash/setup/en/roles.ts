import type { TextBasedChannel } from "discord.js";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "roles",
    async execute(interaction) {
        interaction.deferReply().then(() => interaction.deleteReply());

        if (!interaction.channel) return;

        await genderSelect(interaction.channel);
        await ageSelect(interaction.channel);
        await loveSelect(interaction.channel);
        await dmSelect(interaction.channel);
        await pingRelatedSelect(interaction.channel);
    },
});

const genderSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(":restroom: 『Pronouns』")
        .setDescription("Please select your pronouns");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_male")
            .setEmoji("👦")
            .setLabel("He/Him")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_female")
            .setEmoji("👧")
            .setLabel("She/Her")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const ageSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("⏱️ 『Age』")
        .setDescription("Please select your age");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_adult")
            .setEmoji("🍷")
            .setLabel("Adult")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_highschool")
            .setEmoji("📖")
            .setLabel("16~18")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_middleschool")
            .setEmoji("📏")
            .setLabel("13~15")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const loveSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("🧡 『Relationship』")
        .setDescription("Select your current relationship");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_couple")
            .setEmoji("💘")
            .setLabel("Couple")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_single")
            .setEmoji("🤍")
            .setLabel("Single")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_foreveralone")
            .setEmoji("💙")
            .setLabel("Forever alone")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_relationship_hide")
            .setEmoji("🤫")
            .setLabel("Hide")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const dmSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("📨 『DM availability』")
        .setDescription("Can anybody DM you?");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_dm_allow")
            .setEmoji("⭕")
            .setLabel("Allow DM")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_dm_disallow")
            .setEmoji("❌")
            .setLabel("Disallow DM")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};

const pingRelatedSelect = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("📌 『Notice related』 (Optional)")
        .setDescription("You can get pinged for specific message.");
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("selectroles_announcement")
            .setEmoji("📢")
            .setLabel("Announcement")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("selectroles_giveaway")
            .setEmoji("🎉")
            .setLabel("Giveaway")
            .setStyle(ButtonStyle.Primary),
    );
    return channel.send({ embeds: [ embed ], components: [ row ] });
};
