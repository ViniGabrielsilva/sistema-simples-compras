const products = [
    { id: 1, name: 'Iphone', price: 1000.00, image: 'iphone.jpg', description: 'Iphone é um smartphone de alta tecnologia com recursos avançados.' },
    { id: 2, name: 'Fone', price: 500.00, image: 'fone.jpg', description: 'Fones de ouvido com som de alta qualidade e design ergonômico.' },
    { id: 3, name: 'Camera', price: 300.00, image: 'camera.jpg', description: 'Câmera digital com lente de alta definição e múltiplos modos de fotografia.' }
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Preço: R$${product.price.toFixed(2)}</p>
                <p>Entrega para todo o Brasil</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
    updateCart(); // Atualiza a visualização do carrinho
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
            ${item.name} - R$${item.price.toFixed(2)} 
            <button onclick="removeFromCart(${index})">Remover</button>`;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('total').innerText = total.toFixed(2);
    document.getElementById('cart').style.display = cart.length > 0 ? 'block' : 'none'; // Exibe o carrinho se houver itens
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    if (cart.length > 0) {
        alert('Compra realizada com sucesso!');
        cart = []; // Limpa o carrinho após a compra
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    } else {
        alert('O carrinho está vazio!');
    }
}

displayProducts();
