import { Server } from 'socket.io'
import { createServer } from 'http'

class WebSocket {
	static start() {
		const httpServer = createServer()
		const io = new Server({})

		io.on('connection', (socket) => {
			console.log(socket.id)
		})

		io.listen(3000)
	}
}

export {
	WebSocket
}