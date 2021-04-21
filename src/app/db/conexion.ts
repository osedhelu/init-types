import mongoose from 'mongoose'
import { Env } from "../../../env";
import WinstonLog from '../setting/winston';
const { URL_MONGO } = new Env()
const {_console} = new WinstonLog()
export class DbService {
    constructor() {
        this.connet()
    }
    async connet(): Promise<void> {
       try {
        await mongoose.connect(URL_MONGO, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        _console.warn('Conexion Online')
       } catch (error) {
           _console.error('Error en la conexion')
       }
    }
}