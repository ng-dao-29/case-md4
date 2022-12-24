"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OderModel = void 0;
const mongoose_1 = require("mongoose");
const oderSchema = new mongoose_1.Schema({
    IDUser: { type: String, required: true },
    IDProducts: { type: [String], required: false }
});
const OderModel = (0, mongoose_1.model)('Oder', oderSchema);
exports.OderModel = OderModel;
//# sourceMappingURL=orderModel.js.map