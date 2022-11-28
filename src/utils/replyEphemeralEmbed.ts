import type { EmbedBuilder, InteractionReplyOptions } from "discord.js";

const replyEphemeralEmbed = (...embeds: EmbedBuilder[]): InteractionReplyOptions => ({
    ephemeral: true,
    embeds: [ ...embeds ],
});
export default replyEphemeralEmbed;
