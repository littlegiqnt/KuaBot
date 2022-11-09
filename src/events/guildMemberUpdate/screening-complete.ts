import logger from "structure/Logger";
import createGuildMemberUpdateEventListener from "./createGuildMemberUpdate";

export default createGuildMemberUpdateEventListener(async (oldMember, member) => {
    if ((oldMember.pending ?? false) && !member.pending && !member.user.bot) {
        logger.userJoin(member);
    }
});
