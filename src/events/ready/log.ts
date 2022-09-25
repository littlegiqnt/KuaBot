import { createReadyEventListener } from './index'

export default createReadyEventListener(() => {
	console.log('Bot is ready')
})
