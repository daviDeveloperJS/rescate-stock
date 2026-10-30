
async function postProductos(){
    try{    
        const respuesta=await fetch("http://localhost:3000/productos",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({
                Nombre: "yogur",
                Cantidad: 2,
                PrecioNormal: 6.5,
                Vencimiento: "2026-11-10"
            })
        })
        const aplicado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                "Estado " + respuesta.status + ": " + aplicado.error
            );
        }

        console.log(aplicado);

    }catch(error){
        console.log(error.message)
    }
}
postProductos()