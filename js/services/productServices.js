const productList = () => {
    return fetch("https://api-fake-alura-geek.vercel.app/products")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const createProducts = (name, price, image) => {

    return fetch("https://api-fake-alura-geek.vercel.app/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, price, image
        })
    }).then((res) => {
        res.json(),
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto guardado con éxito...",
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(() => {
            window.location.href = "../../index.html";
        }, 2300);
    })
    .catch((err) => console.log(err));
}

const deleteProducts = (id) =>{
    return fetch(`https://api-fake-alura-geek.vercel.app/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }})
        .then((res) => {
            res.json()
            
            setTimeout(() => {
                window.location.href = "../../index.html";
            }, 2300);
        })
        .catch((err) => console.log(err))
}

export const serviceProducts = {
    productList, createProducts, deleteProducts
}