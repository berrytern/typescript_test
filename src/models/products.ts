import mongoose, { Document, Schema } from 'mongoose'


export interface IProduct extends Document {
    name: string,
    desc: string,
    price: number
}
const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    }
})
export const Product = mongoose.model<IProduct>('product', ProductSchema)