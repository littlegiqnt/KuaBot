import { createEventListenerFactory } from '../../structure/EventListener'
export const createInteractionCreateEventListener = createEventListenerFactory('interactionCreate')

import executeCommands from "./executeCommands";
import executeButtons from "./executeButtons";

export default [
	executeCommands,
    executeButtons
]
