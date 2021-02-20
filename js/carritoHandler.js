/*Selectors*/
const contentCart = document.querySelector('#list-cart');

let articulosCarrito = [];
document.addEventListener('DOMContentLoaded', () => {    
	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    insertBadge(articulosCarrito)
	insertCartHTML();
});
/*Listeners*/
contentCart.addEventListener('click', quitarProducto);

/*Functions*/
function insertCartHTML() {
	cleanCart();
    if (articulosCarrito.length==0){
        const div = document.createElement('div');
        div.innerHTML = `
            <h1 class="text-xl mt-10 mb-10">¡Tu carrito está vacío!</h1>
            <img height="500px" width="600px" src="../img/empty_cart.svg" alt="empty_cart">
            `
        contentCart.appendChild(div);
    }else{
        articulosCarrito.forEach(producto => {
            const { image, name, price, amount, id } = producto;
            const row = document.createElement('div');
            row.classList.add("product-card");
            row.innerHTML = `
                <img src="${image}" alt="icono">
                <div class="product-info relative mt-4 ml-4 mr-4">
                    <h3>${name}</h3>
                    <p class="price">$${price}</p>
                    <p>Cantidad: ${amount}</p>
                    <a href="#" class=" btn btn-delete absolute bottom-0 mb-6 text-white" data-id=${id}>Borrar producto</a>
                </div>
            `
            contentCart.appendChild(row);
        });
        }
}

function quitarProducto(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-delete')) {
        const productoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);
        insertCartHTML();
        saveStorage();
        insertBadge(articulosCarrito)
    }
}

function saveStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function cleanCart() {
	while (contentCart.firstChild) {
		contentCart.removeChild(contentCart.firstChild);
	}
}

