import { WebSocket } from 'ws'
import { program } from 'commander'

program.command(`connect`)
	.action(() => {
		const ws = new WebSocket(`ws://localhost:8080`, () => {
			console.log(`Hello World`)
		})
	})

program.parse()
