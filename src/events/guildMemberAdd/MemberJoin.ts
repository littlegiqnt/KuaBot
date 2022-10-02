import { EmbedBuilder, Guild, GuildMember, Role, TextBasedChannel, TextChannel, User } from "discord.js";
import { createGuildMemberAddEventListener } from ".";

let dividerrole_profile: Role, dividerrole_notice: Role, dividerrole_games: Role, dividerrole_user: Role;

export default createGuildMemberAddEventListener(async (member: GuildMember) => {
    if (!dividerrole_profile || !dividerrole_notice || !dividerrole_games || !dividerrole_user) {
        await reloadRoles(member.guild);
    }
    member.roles.add([dividerrole_profile, dividerrole_notice, dividerrole_games, dividerrole_user]);
    sendJoinEmbed(member.user, member.guild.channels.cache.get("1023191661167263859") as TextBasedChannel);
    return;
});

async function reloadRoles(guild: Guild) {
    const roles = await guild.roles.fetch();
    dividerrole_profile = roles.get("1023196714078830705")!;
    dividerrole_notice = roles.get("1024229642598621195")!;
    dividerrole_games = roles.get("1024239485732540477")!;
    dividerrole_user = roles.get("1023196824812650506")!;
}

async function sendJoinEmbed(user: User, channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle(`《PRISM》✨`)
        .setDescription(
            `<@${user.id}>님! 유저가 이끄는 서버, **프리즘**에 오신것을 환영합니다!\n\n` +
                "<#1023077753504944138>를 잘 숙지하시고 <#1023189655576916038>에서 간단한 인증을 진행해 주시면 바로 활동하실 수 있어요!"
        );

    await channel.send({ embeds: [embed] });
}
