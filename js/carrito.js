/*Selectors*/
const productsContainer = document.querySelector('#products-container');

/*Listeners*/
productsContainer.addEventListener('click',agregarAlCarrito);
let articulosCarrito = [];
document.addEventListener('DOMContentLoaded', () => {    
	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
});

/*Functions*/
function agregarAlCarrito(e){
    e.preventDefault();    
    if(e.target.classList.contains('btn-agregar')){
        const productSelected = e.target.parentElement;
        const imgSrc = e.target.parentElement.parentElement.querySelector('img').src;
        getData(productSelected,imgSrc);
    }
}

function getData(product,src){
    const productAdded = {
        image: src,
        name: product.querySelector('h3').textContent,
        price: product.querySelector('.price').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
    const existe = articulosCarrito.some(producto => producto.id == productAdded.id);
    if (existe) {
		const products = articulosCarrito.map(producto => {
			if (producto.id === productAdded.id) {
				producto.amount++;
				return producto;
			} else {
				return producto;
			}
		});
		articulosCarrito = [...products];
	} else {
		articulosCarrito.push(productAdded);
	}
    insertBadge(articulosCarrito);
    saveStorage();
}

function saveStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}