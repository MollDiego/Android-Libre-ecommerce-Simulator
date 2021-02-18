window.onload = () => {
    document.getElementById("searcher").addEventListener('input', e =>{
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
    });
}

function mostrarResultado(result){
    const { results } = result;
    const contenedor = document.getElementById("products-container");
    contenedor.innerHTML = '';
    for(let i = 0; i < 10; i++){
        const { thumbnail, price, title, shipping } = results[i];
        const element = document.createElement("div");
        element.classList.add("product-card");
        element.innerHTML = `
                <img src="${thumbnail}" alt="icono">
                <div class="product-info">
                    <h3>${title}</h3>
                    <p>$${price}</p>
                    ${
                        shipping.free_shipping ? '<p class="envio">Envio gratis!</p>' : ""
                    }
                </div>
                <button onclick='agregarCarrito(${price}, "${title}")' class="btn-agregar">Agregar</button>
        `;

        contenedor.appendChild(element);
    }
}
