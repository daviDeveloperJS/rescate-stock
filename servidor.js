const express=require("express")

const productos = [
    {
        id: 1,
        Nombre: "Pan",
        Cantidad: 20,
        PrecioNormal: 10,
        Vencimiento: "2026-11-05"
    },
    {
        id: 2,
        Nombre: "Leche",
        Cantidad: 5,
        PrecioNormal: 20,
        Vencimiento: "2026-11-10"
    }
];

const servidor=express()

servidor.get("/",(req,res)=>{
    return res.status(200).json({
        mensaje: "Bienvenido a la API de RescateStock"
    });
})

servidor.get("/productos",(req,res)=>{
    return res.status(200).json(productos)
})


servidor.get("/productos/:id",(req,res)=>{

    const id=Number(req.params.id)

    if(id<=0||!Number.isInteger(id)){
        return res.status(400).json({
            error: "El ID debe ser un entero mayor que cero"
        })
    }
    
    const productoEncontrado = productos.find((productos) => {
        return productos.id === id
    })

    if (productoEncontrado === undefined) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    return res.status(200).json(productoEncontrado)

})

servidor.use("",(req,res)=>{
    return res.status(404).json({
        error:"Ruta no encontrada"
    })
})

servidor.listen(3000,()=>{
    console.log("¡Servidor listo en el puerto 3000!")
})