import { NAME } from "config";
import type { GuildMember } from "discord.js";
import { channelMention, userMention } from "discord.js";

export const title = `《${NAME}》✨`;
export const description = (member: GuildMember) => `\
${userMention(member.id)}님! 유저가 이끄는 서버, **${NAME}**에 오신것을 환영합니다!
서버에서 활동을 시작하시려면 ${channelMention("1023079946215772180")}에서 필수 역할들을 선택해 주세요!
If you can't read korean, please select your language in ${channelMention("1041491453752389702")}.`;
