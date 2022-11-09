import type { ButtonInteraction, CommandInteraction, MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { EmbedBuilder, Message } from "discord.js";
import Color from "structure/Color";
import logger from "structure/Logger";

export default async (error: unknown, replyTo?: CommandInteraction | ButtonInteraction | SelectMenuInteraction | MessageComponentInteraction | Message) => {
    if (!(error instanceof Error)) {
        return;
    }
    logger.error(error);
    if (replyTo != null) {
        const embed = new EmbedBuilder()
            .setColor(Color.BRIGHT_RED)
            .setTitle("엇, 오류가 발생했어요..")
            .setDescription("관리자에게 문의해 주세요!");
        if (replyTo instanceof Message) {
            return replyTo.reply({ embeds: [ embed ] });
        } else if (replyTo.deferred || replyTo.replied) {
            return replyTo.editReply({ embeds: [ embed ] });
        } else {
            return replyTo.reply({ embeds: [ embed ] });
        }
    }
};
