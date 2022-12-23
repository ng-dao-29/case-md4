// import axios from "express-session/session/memory";
// const addToCart = (productId) => {
//     console.log(productId)
//     axios.post('/admin/products/addToCart', {
//         productId
//     }).then(() => {
//         alert('Success')
//     })
// }
const searchProduct = (value) => {

    axios.get('/admin/product/search', {
        params: {
            keyword: value
        }
    }).then(res => {
        let products = res.data;
        let html = '';

        products.forEach((product, index) => {
            html += '<tr>';
            html += `<td>${index + 1}  </td>`;
            html += `<td><img style="width: 100px" src="/upload/${product.picture}" alt=""></td>`;
            html += `<td>${product.name}</td>`;
            html += `<td>${product.price}</td>`;
            html += `<td>${product.category}</td>`;
            html += `<td>${product.quality}</td>`;
            html += `<td>${product.description}</td>`;
            html += `<td>${product.producer}</td>`;
            html += `<td><a onclick="return confirm('Chắc chắn muốn xóa ?')" href="/admin/product/<%= product._id %>/delete"><button  class="btn btn-outline-danger" type="button">delete</button></a>
                     <a href="/admin/product/<%= product._id %>/update"><button class="btn btn-outline-success" type="button">update</button></a>
                     </td>`;
            html += '</tr>';
        })

        document.getElementById('list-product').innerHTML = html;
    })
}