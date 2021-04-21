import mongoose, { Document, Schema, Types } from 'mongoose';
export interface Iusos extends Document {
    usuario: Types.ObjectId; 
    detalles: string;
    cantidad: number;
    rate: string;
    fechayhora: string;
    fecha: string;
    estado: string;
}

const UsosSchema: Schema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: [true, 'debe asociar un usuario a este registro']
    },
    detalles: { type: String, required: true },
    cantidad: { type: Number, required: true },
    rate: { type: String, required: true },
    fechayhora: { type: Date, required: true },
    fecha: { type: Date, required: true },
    estado: { type: Boolean, required: true }
}, { versionKey: false })

export default mongoose.model<Iusos>('usos', UsosSchema)