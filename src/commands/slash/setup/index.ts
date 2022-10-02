import { SlashCommand } from '../../../structure/SlashCommand'
import buttons from "./buttons";
import join from "./join";
import roles from "./roles";
import verify1 from "./verify1";

export default new SlashCommand({
	name: 'setup',
	subCommands: [
        buttons,
		roles,
        verify1,
        join
	],
})
