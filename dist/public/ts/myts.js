"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_1 = __importDefault(require("express-session/session/memory"));
const searchProduct = (value) => {
    memory_1.default.get('/admin/product/search', {
        params: {
            keyword: value
        }
    }).then(res => {
        let products = res.data;
        let html = '';
        products.forEach((product, index) => {
            html += '<tr>';
            html += `<td>${index + 1}  </td>`;
            html += `<td>${product.name}</td>`;
            html += `<td>${product.description}</td>`;
            html += `<td>${product.price}</td>`;
            html += `<td>${product.category.name}</td>`;
            html += `<td><a onclick="return confirm('Are you sure you want to delete this product?')" href="/admin/products/${product._id}/delete" class="btn btn-danger">Delete</a></td>`;
            html += '</tr>';
        });
        document.getElementById('list-product').innerHTML = html;
    });
};
//# sourceMappingURL=myts.js.map