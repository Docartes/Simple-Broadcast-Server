import { Server } from 'socket.io'
import { io } from 'socket.io-client'
import inquirer from 'inquirer'

class WebSocket {
	start() {
		const io = new Server({})

		io.on('connection', (socket) => {
			console.log(`a user connected with socket id: %s`, socket.id);

			io.emit('users', Array.from(io.sockets.sockets.keys()))

			socket.on('chat', (message) => {
				console.log('message: %s', message)

				io.emit('chat', {
					from: socket.id,
					message
				})
			})

			socket.on('disconnect', () => {
				console.log(`a user disconnected from server`)

				io.emit('users', Array.from(io.sockets.sockets.keys()))
			})
		})

		io.listen(3000)
	}

	connect() {
		const socket = io(`ws://localhost:3000`)

		socket.on(`connect`, () => {
			console.log(`socket id: %s`, socket.id)
		})

		socket.on('users', (users) => {
			console.log(`list conected users: ${users}`)
		})

		socket.on('chat', (data) => {
			console.log(`[${data.from}]: ${data.message}`)
		})

		const ask = async() => {
			const { message } = await inquirer.prompt([{
				name: 'message',
				message: 'type a message or quit (q to quit) ?'
			}]);

			if ( message == 'q') {
				socket.disconnect();
				return;
			}

			socket.emit('chat', message)
			ask();
		}

		ask()
	}
}

export {
	WebSocket
}