import type { BaseInteraction } from "discord.js";
import { EmbedBuilder, Message } from "discord.js";
import logger from "structure/Logger";

export default async (error: unknown, replyTo?: BaseInteraction | Message) => {
    if (!(error instanceof Error)) {
        return;
    }
    logger.error(error);
    if (replyTo == null) return;

    const embed = new EmbedBuilder()
        .setColor("red")
        .setTitle("엇, 오류가 발생했어요..")
        .setDescription("관리자에게 문의해 주세요!");
    if (replyTo instanceof Message) {
        replyTo.reply({ embeds: [embed] });
    } else if (replyTo.isRepliable()) {
        if (replyTo.deferred || replyTo.replied) {
            replyTo.editReply({ embeds: [embed] });
        } else {
            replyTo.reply({ embeds: [embed] });
        }
    }
};
