import { SlashCommand } from '../../../structure/SlashCommand'
import buttons from "./buttons";
import roles from "./roles";

export default new SlashCommand({
	name: 'setup',
	subCommands: [
        buttons,
		roles,
	],
})
