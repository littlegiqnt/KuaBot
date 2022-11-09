import { createEventListenerFactory } from "structure/EventListener";

const createMessageCreateEventListener = createEventListenerFactory("messageCreate");
export default createMessageCreateEventListener;
