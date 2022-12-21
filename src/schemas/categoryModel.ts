import {Schema, model} from "mongoose";

interface ICategory {
    name: string;
}

const categorySchema = new Schema<ICategory>({
    name: {type: String, required: true}
})

const CategoryModel = model<ICategory>('Category', categorySchema);
export {CategoryModel};