/*Selectors*/
const contentCart = document.querySelector('#list-cart');

let articulosCarrito = [];
/*Listeners*/
document.addEventListener('DOMContentLoaded', () => {
	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
	insertCartHTML();
});

/*Functions*/
function insertCartHTML() {
	cleanCart();
    console.log(articulosCarrito)
    if (articulosCarrito.length==0){
        const div = document.createElement('div');
        div.innerHTML = `
            <h1 class="text-xl mt-10 mb-10">¡Tu carrito está vacío!</h1>
            <img height="500px" width="600px" src="../img/empty_cart.svg" alt="empty_cart">
            `
        contentCart.appendChild(div);
    }

	articulosCarrito.forEach(producto => {
		const { image, name, price, amount, id } = producto;
		const row = document.createElement('div');
        row.classList.add("product-card");
		row.innerHTML = `
            <img src="${image}" alt="icono">
            <div class="product-info relative">
                <h3>${name}</h3>
                <p class="price">$${price}</p>
                <p>Cantidad: ${amount}</p>
                <a href="#" class="btn-quitar absolute bottom-0 mb-10 text-white" data-id=${id}>Borrar producto</a>
            </div>
		`
		contentCart.appendChild(row);
	});
}

function cleanCart() {
	while (contentCart.firstChild) {
		contentCart.removeChild(contentCart.firstChild);
	}
}

