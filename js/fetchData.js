window.onload = () => {
  /*Selectores*/
  const search = document.querySelector('#searcher');
  /*Listeners*/
  search.addEventListener('input', busqueda);

}

function busqueda(e){
  const busqueda = e.target.value.replace(" ", "%20");
  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=android%20${busqueda}`).then((response)=> {
        if(response.ok) {
          response.json().then((miData)=> {
            mostrarResultado(miData);
          });
        } else {
          console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
}

function mostrarResultado(result){
    const { results } = result;
    const contenedor = document.querySelector('#products-container');
    contenedor.innerHTML = '';
    if (results.length==0){
      const emptySearch = document.createElement("h1")
      emptySearch.classList.add("empty-search");
      emptySearch.innerHTML='¡No se encontraron resultados para su busqueda!';
      contenedor.appendChild(emptySearch);
    }else{
    for(let i = 0; i < 10; i++){
        const { thumbnail, price, title, shipping, id } = results[i];
        const element = document.createElement("div");
        element.classList.add("product-card");
        element.innerHTML = `
                <img class="col-start-1 col-span-2" src="${thumbnail}" alt="icono">
                <div class="product-info relative mt-4 ml-4 mr-4">
                    <h3>${title}</h3>
                    <p class="price">$${price}</p>
                    ${
                        shipping.free_shipping ? '<p class="envio">Envio gratis!</p>' : ""
                    }
                    <a href="#" class="btn btn-agregar absolute bottom-0 mb-6 text-white" data-id=${id}>Agregar al Carrito</a>
                </div>                
        `;
        contenedor.appendChild(element);
    }
  }
}
