import * as jwt from 'jsonwebtoken'
import { Env } from '../../../env'

export class Token {
    semilla!: any
    constructor() {
        const {SEED_TOKEN}:any = new Env()
        this.semilla = SEED_TOKEN
    }
    validar(token: string):any {
        jwt.verify(token, this.semilla,(err:any , data: any) => {
            if(err){
                return {ok: false, message: 'Este roken no es valido'}
            }else {
                return {ok: true, data }
            }
        })
        return {
            ok: true
        }
    }      
}