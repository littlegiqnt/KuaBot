import { scheduleJob } from "node-schedule";
import createReadyEventListener from "./createReadyEventListener";

export default createReadyEventListener(async () => {
    scheduleJob("0 0 * * *", onEveryDay);
});

const onEveryDay = async () => {
    // logger.debug(`${new Intl.DateTimeFormat("ko-KR", { dateStyle: "short", timeStyle: "medium" }).format(Date.now())}`);
};
