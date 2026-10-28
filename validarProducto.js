export function validarProducto(nombre,cantidadRecibida,precioRecibido,vencimientoRecibido){
    if(nombre.trim()===""){
        return "¡El nombre esta vacio!"
    }
    const cant=Number(cantidadRecibida)
    if(cantidadRecibida.trim()===""||!Number.isInteger(cant)||cant<=0){
        return "¡Ingrese una cantidad mayor a 0 y sin decimales!"
    }
    const precio=Number(precioRecibido)
    if(precioRecibido.trim()===""||!Number.isFinite(precio)||precio<=0){
        return "¡El precio debe ser mayor a 0 y sin letras!"
    }
    if(vencimientoRecibido<0||!Number.isInteger(vencimientoRecibido)){
        return "¡Fecha ingresada no valida!"
    }
    return ""
}