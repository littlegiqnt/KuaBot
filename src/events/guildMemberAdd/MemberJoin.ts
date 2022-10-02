import { disableValidators, Guild, GuildMember, Role } from "discord.js";
import { createGuildMemberAddEventListener } from ".";

let dividerrole_profile: Role, dividerrole_notice: Role, dividerrole_games: Role, dividerrole_user: Role;

export default createGuildMemberAddEventListener(async (member: GuildMember) => {
    if (!dividerrole_profile || !dividerrole_notice || !dividerrole_games || !dividerrole_user) {
        await reloadRoles(member.guild);
    }
    member.roles.add([dividerrole_profile, dividerrole_notice, dividerrole_games, dividerrole_user]);
});

async function reloadRoles(guild: Guild) {
    const roles = await guild.roles.fetch();
    dividerrole_profile = roles.get("1023196714078830705")!;
    dividerrole_notice = roles.get("1024229642598621195")!;
    dividerrole_games = roles.get("1024239485732540477")!;
    dividerrole_user = roles.get("1023196824812650506")!;
}
