import { Server } from 'socket.io'
import { io } from 'socket.io-client'
import inquirer from 'inquirer'

class WebSocket {
	start() {
		const list = []
		const io = new Server({})

		io.on('connection', (socket) => {
			console.log(`a user connected with socket id: %s`, socket.id);
			socket.on(`message`, (arg, cb) => {
				console.log(arg)
				cb(arg)
			})
			list.push(socket.id)
		})

		io.listen(3000)
	}

	options() {
		inquirer
			.prompt([
				'disconnected',
				'send message'
			])
			.then((answers) => {
				
			})
	}

	connect() {
		const socket = io(`ws://localhost:3000`)

		socket.on(`connect`, () => {
			console.log(`socket id: %s`, socket.id)
		})

		socket.on('disconnect', () => {
			if ( socket.id == undefined ) {
				console.log(`You are disconnected from the websocket`)
			}
		})

		socket.emit(`message`, `hello world`, (response) => {
			console.log(response);
		})
	}

	disconnect() {
		const socket = io(`ws://localhost:3000`)
		socket.on('disconnect', () => {
			if ( socket.id == undefined ) {
				console.log(`You are disconnected from the websocket`)
			}
		})
	}
}

export {
	WebSocket
}