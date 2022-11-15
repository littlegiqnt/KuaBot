import { NAME } from "config";
import { ActivityType } from "discord.js";
import logger from "structure/Logger";
import rolesManager from "structure/RolesManager";
import { isNormalTextChannel } from "utils/checkChannel";
import isProduction from "utils/isProduction";
import reloadMembersCount from "utils/reloadMembersCount";
import createReadyEventListener from "./createReadyEventListener";

export default createReadyEventListener(async (client) => {
    client.user.setActivity(`${NAME} 서버 전용 봇`, { type: ActivityType.Playing });

    if (isProduction()) {
        const devChannel = client.channels.cache.get("1024959239384477726")!;
        if (isNormalTextChannel(devChannel)) {
            devChannel.send({ content: `봇 켜짐!\nEnvironment: ${process.env.NODE_ENV}` });
        }
    }
    rolesManager.load(client);
    logger.init(client);
    reloadMembersCount(client);

    console.log("Bot is ready");
});
