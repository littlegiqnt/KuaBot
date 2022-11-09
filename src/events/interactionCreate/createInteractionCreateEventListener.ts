import { createEventListenerFactory } from "structure/EventListener";

const createInteractionCreateEventListener = createEventListenerFactory("interactionCreate");
export default createInteractionCreateEventListener;
