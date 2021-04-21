import { Socket } from 'socket.io'
import WinstonLog from '../setting/winston'
const { _console } = new WinstonLog()


export class SocketService {
    constructor(public io: Socket) {
        this.initStart()
    }

    initStart(): void {

        this.io.on('conecction', async (socket: Socket) => {
            try {
                socket.emit('con', { ok: true, message: 'conexion con el nsat' })
            } catch (err) {
                _console.error(err)
            }
        })
    }
}