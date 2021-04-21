import { InitService } from '../setting/config'
import { Token } from './token'
export default class FunctionPersonales extends InitService {
    verifyToken(token: any): { ok: boolean, message: string, data: any } {
        const aa = new Token()
        return aa.validar(token)
    }

}