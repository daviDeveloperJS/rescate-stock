//inputs
const input_nombre=document.querySelector('#input_nombre')
const input_cantidad=document.querySelector('#input_cantidad')
const input_precio=document.querySelector('#input_precio')
const input_vencimiento=document.querySelector('#input_vencimiento')

//boton 
const btn_agregarProducto=document.querySelector('#btn_agregarProducto')
//parrafos
const parrafo_registro_producto=document.querySelector('#parrafo')
//arreglo
const arrayProductos=[]

function agregarProducto(){  
    const cantidad=Number(input_cantidad.value)     
    const precio=Number(input_precio.value)  


    if(input_nombre.value.trim()===""){
        parrafo_registro_producto.textContent="El nombre esta vacio!"
        return
    }else if(input_cantidad.value===""||
        !Number.isInteger(cantidad)||
        cantidad<=0)
    {
        parrafo_registro_producto.textContent="Ingrese una cantidad mayor a 0, y sin decimales!"
        return
    }
    else if(input_precio.value===""||precio<=0||!Number.isFinite(precio)){
        parrafo_registro_producto.textContent="El precio debe ser mayor a 0 y sin letras!"
        return
    }else if(input_vencimiento.value===""){
        parrafo_registro_producto.textContent="Debe ingresar una fecha valida"
        return
    }

    const calculoDias=calcularDias(input_vencimiento.value)
    
    if(!Number.isFinite(calculoDias)){
        parrafo_registro_producto.textContent="La fecha ingresada no es válida"
        return
    }else if(calculoDias<0){
        parrafo_registro_producto.textContent =
        "No se puede registrar un producto vencido";
        return;
    }
    else{ 
        parrafo_registro_producto.textContent=""
        
        const urgencia= determinarUrgencia(calculoDias)

        const promocion= recomendarPromocion(calculoDias,cantidad)
    
        const ahorroyDescuento=descuento_ahorro(promocion,precio)

        const objeto_producto={
            Nombre: input_nombre.value.trim(),
            Cantidad:cantidad,
            PrecioNormal: precio,
            Vencimiento: input_vencimiento.value,
            diasRestantes: calculoDias,
            Urgencia: urgencia,
            Promocion: promocion,
            ahorroDescuento: ahorroyDescuento
        }
        arrayProductos.push(objeto_producto)
        mostrarProductos()
        limpiar_formulario()
        
    }
}

btn_agregarProducto.addEventListener('click',(e)=>{
    e.preventDefault();//evita la acción predeterminada del botón, que en este caso es enviar el formulario y recargar la página.
    agregarProducto()
})

const division_productos=document.querySelector('#lista_productos')

function mostrarProductos(){ //mostrar el array
    division_productos.textContent=""


    const arreglo_ordenado_copia=[...arrayProductos].sort((a,b)=>{
        return a.diasRestantes-b.diasRestantes
    })

    arreglo_ordenado_copia.forEach((e)=>{
        const div_div_productos=document.createElement("div")

        const nombre=document.createElement("h2")
        const cantidad=document.createElement("p")
        const PrecioNormal=document.createElement("p")
        const vencimiento=document.createElement("p")
        const parrafo_dias_vencimiento=document.createElement("p")
        const urgencia_vencimiento=document.createElement("p")
        const recomendacion=document.createElement("p")
        const precioFinalCalculo=document.createElement("p")
        const descuentoAhorrado=document.createElement("p")
        const mensaje_2x1=document.createElement("p")

        nombre.textContent="Nombre: "+e.Nombre
        cantidad.textContent="Cantidad: "+ e.Cantidad
        PrecioNormal.textContent="Precio Normal S/: "+e.PrecioNormal.toFixed(2)
        vencimiento.textContent="Vencimiento: "+e.Vencimiento
        parrafo_dias_vencimiento.textContent="Dias restantes para su vencimiento: "+e.diasRestantes
        urgencia_vencimiento.textContent="Urgencia clasificada: "+e.Urgencia
        recomendacion.textContent="Promocion: "+e.Promocion.descripcion
        if (e.Promocion.tipo === "2x1") {
        precioFinalCalculo.textContent ="Precio por 2 unidades: S/ " +e.ahorroDescuento.precioFinalProducto.toFixed(2)
        mensaje_2x1.textContent ="Promoción 2x1: " + e.ahorroDescuento.Texto

        div_div_productos.appendChild(mensaje_2x1)
        }else{
            precioFinalCalculo.textContent="Precio Final S/: "+e.ahorroDescuento.precioFinalProducto.toFixed(2)
        }
        descuentoAhorrado.textContent="Dinero ahorrado S/: "+e.ahorroDescuento.Descuento.toFixed(2)
        


        div_div_productos.appendChild(nombre)
        div_div_productos.appendChild(cantidad)
        div_div_productos.appendChild(PrecioNormal)
        div_div_productos.appendChild(vencimiento)
        div_div_productos.appendChild(parrafo_dias_vencimiento)
        div_div_productos.appendChild(urgencia_vencimiento)
        div_div_productos.appendChild(recomendacion)
        div_div_productos.appendChild(precioFinalCalculo)
        div_div_productos.appendChild(descuentoAhorrado)

        division_productos.appendChild(div_div_productos)


    })
}
function limpiar_formulario(){
    input_nombre.value=""
    input_cantidad.value=""
    input_precio.value=""
    input_vencimiento.value=""
}

function calcularDias(fechaIngresada){
    const fechaActual=new Date()//fecha actual en un objeto

    fechaActual.setHours(0,0,0,0)

    const fechaVencimiento=new Date(fechaIngresada+"T00:00:00")//convertimos texto en un objeto Date

    const diferencia=fechaVencimiento-fechaActual

    const milisegundosPorDia=1000*60*60*24
    
    const resultado=Math.ceil(diferencia/milisegundosPorDia)
    
    return resultado
}

function determinarUrgencia(diasRestantes){
    if(diasRestantes<0){
        return "¡Producto vencido!"
    }else if(diasRestantes<=1){
        return "¡Critica!"
    }else if(diasRestantes<=3){
        return "¡ALTA!"
    }else if (diasRestantes <= 7) {
        return "¡MODERADA!";
    } else {
        return "¡BAJA!";
    }
}

function descuento_ahorro(promocion, precioNormall) {
    if (promocion.tipo === "vencido") {
        return null;
    }

    if (promocion.tipo === "2x1") {
        return {
            precioFinalProducto: precioNormall,
            Descuento: precioNormall,
            Texto: "Te llevas 2 por el precio de 1",
            unidades: 2

        };
    }

    if (promocion.tipo === "ninguna") {
        return {
            precioFinalProducto: precioNormall,
            Descuento: 0,
            unidades: 1
        };
    }

    if (promocion.tipo === "descuento") {
        const descuento = Number(
            (precioNormall * promocion.porcentaje / 100).toFixed(2)
        );

        const precioFinal = Number(
            (precioNormall - descuento).toFixed(2)
        );

        return {
            precioFinalProducto: precioFinal,
            Descuento: descuento,
            unidades: 1
        };
    }

    throw new Error("Tipo de promoción no reconocido");
}

function recomendarPromocion(diasRestantes, cantidadStock) {
    if (diasRestantes < 0) {
        return {
            tipo: "vencido",
            porcentaje: 0,
            descripcion: "Producto vencido"
        }
    }

    let porcentaje
    let descripcion

    if (diasRestantes <= 1) {
        if (cantidadStock >= 20) {
            porcentaje = 60
            descripcion = "Liquidación: 60 % de descuento"
        } else if (cantidadStock >= 10) {
            porcentaje = 50
            descripcion = "Liquidación: 50 % de descuento"
        } else {
            porcentaje = 40
            descripcion = "Descuento del 40 %"
        }

    } else if (diasRestantes <= 3) {
        if (cantidadStock >= 20) {
            return {
                tipo: "2x1",
                porcentaje: 0,
                descripcion: "Promoción 2x1"
            }
        } else if (cantidadStock >= 10) {
            porcentaje = 35
            descripcion = "Descuento del 35 %"
        } else {
            porcentaje = 25
            descripcion = "Descuento del 25 %"
        }

    } else if (diasRestantes <= 7) {
        if (cantidadStock >= 20) {
            porcentaje = 25
            descripcion = "Descuento del 25 %"
        } else if (cantidadStock >= 10) {
            porcentaje = 20
            descripcion = "Descuento del 20 %"
        } else {
            porcentaje = 15
            descripcion = "Descuento del 15 %"
        }

    } else {
        return {
            tipo: "ninguna",
            porcentaje: 0,
            descripcion: "Sin promoción urgente"
        }
    }

    return {
        tipo: "descuento",
        porcentaje: porcentaje,
        descripcion: descripcion
    }
}