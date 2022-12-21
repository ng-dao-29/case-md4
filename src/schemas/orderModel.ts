import {Schema, model} from "mongoose";

interface IOder {
    IDUser: string;
    IDProducts: string[],
}

const oderSchema = new Schema<IOder>({
    IDUser: {type: String, required: true},
    IDProducts: {type: [String], required: false}
})

const OderModel = model<IOder>('Oder', oderSchema);
export {OderModel};