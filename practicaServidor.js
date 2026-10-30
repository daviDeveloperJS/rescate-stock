async function consultarProductos(){
    try{
        console.log("Consultando los productos....")
        const consulta=await fetch("http://localhost:3000/productos")
        if(!consulta.ok){
            throw new Error("No se pudieron consultar los productos "+consulta.status)
        }
        const respuesta=await consulta.json()//espera una promesa si fue aceptada o rechazada
        console.log(respuesta)
    }catch(error){
        console.log(error.message)
    }
}

consultarProductos();