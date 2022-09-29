import { createEventListenerFactory } from '../../structure/EventListener'
export const createInteractionCreateEventListener = createEventListenerFactory('interactionCreate')

import executeCommands from "./execute-commands";
import executeButtons from "./execute-buttons";

export default [
	executeCommands,
    executeButtons
]
