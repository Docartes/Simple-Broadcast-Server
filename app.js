#!/usr/bin/env node

import { program } from 'commander'
// import pkg from 'ws'
// const { WebSocketServer } = pkg
// const WebSocket = pkg
import { Server } from 'socket.io'
import { io } from 'socket.io-client'

program.command('start')
	.action(() => {
		const ws = new Server({})

		ws.on('connection', (socket) => {
			console.log('user connected socket id: %s', socket.id)
		})

		ws.listen(3000)
	})

program.command('connect')
	.action(() => {
		const socket = io(`ws://localhost:3000`)

		socket.on('connect', () => {
			console.log(`socket ID: %s`, socket.id)
		})
	})

program.parse()