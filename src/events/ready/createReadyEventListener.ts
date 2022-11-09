import { createEventListenerFactory } from "../../structure/EventListener";

const createReadyEventListener = createEventListenerFactory("ready");
export default createReadyEventListener;
