/*selectors*/
const cartbadge = document.querySelector('#cart-badge')

function insertBadge(articulos){
    cleanBadge();
    const badge = document.createElement('span');
    badge.innerHTML = `${articulos.length}`;
    cartbadge.appendChild(badge);
}

function cleanBadge() {
	while (cartbadge.firstChild) {
		cartbadge.removeChild(cartbadge.firstChild);
	}
}