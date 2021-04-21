import express from "express";
import bodyParser from "body-parser";
import { env } from "../../env";
export class initConfig {
    app = express();
    port = '1000';
    ServerIO = require('http').createServer(this.app);
    io = require('socket.io')(this.ServerIO, {
              handlePreflightRequest: (req: any, res: any) => {
                res.writeHead(200, {
                  "Access-Control-Allow-Origin": env.url_frontend,
                  "Access-Control-Allow-Methods": "GET,POST",
                  "Access-Control-Allow-Headers": "x-Token",
                  "Access-Control-Allow-Credentials": true
                });
                res.end();
              }
            });
    constructor() {
        this.middelewares()
        // RouterApi(this.app)
        // sockerConfig(this.io)
    }
    middelewares() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, token');
            next();
        });
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    listen() {
        
        this.ServerIO.listen(this.port, () => {
            console.log(`Servidor Corriendo en el puerto ${this.port}`);
            //   _logger.info();
        })
    }
    
}
