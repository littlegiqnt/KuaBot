import logger from "structure/Logger";
import createReadyEventListener from "./createReadyEventListener";

export default createReadyEventListener(async (client) => {
    try {
        const now = new Date();
        let millisTill = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime() - now.getTime();
        if (millisTill < 0) {
            millisTill += 1000 * 60 * 60 * 24;
        }
        setTimeout(() => { registerEveryDay(); }, millisTill);
    } catch (e) {
        logger.error(e);
    }
});

const registerEveryDay = () => {
    setInterval(everyDay, 1000 * 60 * 60 * 24);
};

const everyDay = async () => {
    logger.debug(`테스트 히히 ${new Intl.DateTimeFormat("ko-KR", { dateStyle: "short", timeStyle: "medium" }).format(Date.now())}`);
};
