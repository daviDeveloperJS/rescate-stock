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

//express pueda interpretar las solicitudes con formato json de parte del cliente 
servidor.use(express.json())

//post
servidor.post("/productos",(req,res)=>{
    const nombre=req.body.Nombre
    const cantidad=req.body.Cantidad
    const precioNormal=req.body.PrecioNormal
    const vencimiento=req.body.Vencimiento
    let idMayor = 0;

    productos.forEach((e) => {
        if (e.id > idMayor) {
            idMayor = e.id;
        }
    });

    const id = idMayor + 1;

    if (typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({
            error: "El nombre es obligatorio y no puede estar vacío"
        });
    }

    
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        return res.status(400).json({
            error: "La cantidad debe ser un entero mayor que cero"
        });
    }

    
    if (!Number.isFinite(precioNormal) || precioNormal <= 0) {
        return res.status(400).json({
            error: "El precio debe ser un número mayor que cero"
        });
    }

    if (vencimiento === undefined || vencimiento === null || vencimiento === "") {
        return res.status(400).json({
            error: "Debe ingresar una fecha"
        });
    }
    const fecha = new Date(vencimiento + "T00:00:00");

    if (!Number.isFinite(fecha.getTime())) {
        return res.status(400).json({
            error: "La fecha no es válida"
        });
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha < hoy) {
        return res.status(400).json({
            error: "No se puede registrar un producto vencido"
        });
    }

    const nuevoProducto = {
        id: id,
        Nombre: nombre,
        Cantidad: cantidad,
        PrecioNormal: precioNormal,
        Vencimiento: vencimiento
    };  
    productos.push(nuevoProducto)

    res.status(201).json(nuevoProducto);
})

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