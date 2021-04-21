import express from 'express';
import WinstonLog from './winston';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import * as bodyParser from "body-parser";
import { Env } from '../../../env';
import { DbService } from '../db/conexion';
import { SocketService } from '../socket';
const {IP_FRONTEND, PORT} = new Env()

const { _console } = new WinstonLog()

export class InitService  {

  private middelewares(app: express.Application) {
    // tslint:disable-next-line: only-arrow-functions
    app.use(function (req: any, res: any, next: any) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, token');
      next();
    });
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }


  public start():void {
    const app = express();
    const httpService = createServer(app)
    this.middelewares(app)
    const io: any = new Server(httpService, {
      cors: {
        origin: IP_FRONTEND,
        allowedHeaders: ['x-Token'],
        credentials: true,
        methods: ["GET", "POST"]
      }
    })



  httpService.listen(PORT, () => {
      // tslint:disable-next-line: no-unused-expression
      new DbService()
      // tslint:disable-next-line: no-unused-expression
      new SocketService(io)
      
      _console.info(`Servidor Corriendo en el puerto ${PORT}`);
    });
  }

}