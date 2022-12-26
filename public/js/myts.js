
const searchProduct = (value) => {

    axios.get('/admin/product/search', {
        params: {
            keyword: value
        }
    }).then(res => {
        let products = res.data;
        console.log(products)
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
            html += `<td>
                         <a href="">
                         <button class="btn btn-outline-danger"
                         type="button">order
                         </button>
                         </a>
                         <a>
                         <button onclick="AddCart(`${product._id}`)"
                         class="btn btn-outline-success">add cart</button>
                         </a>
                         </td>`;
            html += '</tr>';
        })
        document.getElementById('list-product').innerHTML = html;
    })
}

const AddCart = (idProduct) => {
    axios.get('/user/product', {
        params: {
            id: idProduct
        }
    }).then(res => {
        let quantity = prompt("enter the quantity", [1]);
        if (quantity !== undefined) {
            let product = res.data;
            axios.post('/user/product/add-cart', {
                product: product,
                quantity: quantity
            })
                .then(res => {
                    alert("Product added to cart successfully")
                })
        }

    })
}