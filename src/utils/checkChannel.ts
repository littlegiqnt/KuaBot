import type { Channel, TextChannel } from "discord.js";

export const isNormalTextChannel = (channel: Channel): channel is TextChannel =>
    channel.isTextBased() && !channel.isThread() && !channel.isDMBased();
