import { serviceProducts } from "../services/productServices.js";

const formulario = document.querySelector("[data-enviar]");
const contenedores = document.querySelector("[data-contenedores]");


function createCard(name, price, image, id) {
    const card = document.createElement('div');
    card.classList.add("card");

    card.innerHTML = `
        <img class="card-img" src="${image}" alt="${name}">
        <p class="card-title">${name}</p>
        <div class="card-body">
            <p>$ ${price}.00</p>
            <i class="fa-solid fa-trash-can ired" data-id="${id}"'></i>                
        </div>
    `;

    const deleteProduct = card.querySelector('[data-id]');
    deleteProduct.addEventListener('click', () => {

        Swal.fire({
            title: "Estás seguro de eliminar el producto?",
            text: "Esta decisión no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar.."
        }).then((result) => {
        if (result.isConfirmed) {
            
            const id = deleteProduct.getAttribute('data-id');
            serviceProducts.deleteProducts(id);
            card.remove();
    
            Swal.fire({
            title: "Eliminado!",
            text: "El producto a sido eliminado con éxito",
            icon: "success"
            });
        }
        });
    })

        contenedores.appendChild(card);
    return card;
}

const render = async () =>{
    try {
        const listProducts = await serviceProducts.productList();
        
        if (listProducts.length === 0) {
           const div = document.createElement('div');
           div.classList.add('noProductos');
           div.innerHTML = 'No hay productos agregados 😓'

            contenedores.appendChild(div)
            return
        }

        listProducts.forEach(product => {
            const {name, price, image, id} = product;
            contenedores.appendChild(
                createCard(name, price, image, id)
            )
        })
    } catch (error) {
        console.log(error);
    }
}


formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    if (nombre.trim() === '' || precio === '' || imagen.trim() === '' ) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Todos los campos son necesarios`,
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    if(!parseInt(precio)){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: `Debe de ingresar un valor númerico en el campo precio`,
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    serviceProducts.createProducts(nombre, precio, imagen)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
})


render();
