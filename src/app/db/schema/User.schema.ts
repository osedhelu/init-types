import mongoose, { Document, Schema } from 'mongoose';
export interface IUsers extends Document {
    nombre: string;
    apellidos: string;
    email: string;
    celular: string;
    password: string;
    role: string;
    estado: boolean;
    primera_vez: boolean;
    patrocinador: string;
}

const rolesValidos = {
    values: ['EMPRESA', 'USUARIO', 'SUPER'],
    message: '{VALUE} no es un rol permitido'
};
// tslint:disable-next-line: only-arrow-functions
const validateEmail = function (email: any) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellidos: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
        validate: [validateEmail, 'este email no es correcto']
    },
    celular: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    role: {
        type: String,
        required: true,
        default: 'USUARIO',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        required: false,
        default: false
    },
    primera_vez: {
        type: Boolean,
        required: false,
        default: true
    },
    patrocinador: {
        type: String
    },
}, {
    versionKey: false
})

export default mongoose.model<IUsers>('usuarios', UserSchema)