#!/usr/bin/env node

import { program } from 'commander'
import { WebSocket } from './ws.service.js'


const ws = new WebSocket

program.command('start')
	.action(() => {
		ws.start()
	})

program.command('connect')
	.action(() => {
		ws.connect()
	})

program.parse()