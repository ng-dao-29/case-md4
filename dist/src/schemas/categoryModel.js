"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
const CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
exports.CategoryModel = CategoryModel;
//# sourceMappingURL=categoryModel.js.map