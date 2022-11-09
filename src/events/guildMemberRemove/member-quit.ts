import logger from "structure/Logger";
import reloadMembersCount from "utils/reloadMembersCount";
import createGuildMemberRemoveEventListener from "./createGuildMemberRemoveEventListener";

export default createGuildMemberRemoveEventListener(async (member) => {
    logger.userQuit(member);
    reloadMembersCount(member.client);
});
