import { createEventListenerFactory } from '../../structure/EventListener'
export const createInteractionCreateEventListener = createEventListenerFactory('interactionCreate')

import executeCommands from "./executeCommands";
import executeButtons from "./ExecuteButtons";

export default [
	executeCommands,
    executeButtons
]
