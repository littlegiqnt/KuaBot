import type { SlashCommand } from '../../structure/SlashCommand'

import ping from './ping'
import setup from "./setup";

const commands: Array<SlashCommand> = [
	ping,
    setup
]

export default commands
