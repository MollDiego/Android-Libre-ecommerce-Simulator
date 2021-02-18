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

