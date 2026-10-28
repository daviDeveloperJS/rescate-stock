//importaciones
import { descuento_ahorro } from "./calcularDescuento.js";
import { recomendarPromocion } from "./recomendarPromocion.js";
import { calcularDias } from "./calcularDias.js";
import { determinarUrgencia } from "./determinarUrgencia.js";
import {validarProducto} from "./validarProducto.js"
import { mostrarProductos } from "./mostrarProductos.js";
// INPUTS
const input_nombre = document.querySelector("#input_nombre");
const input_cantidad = document.querySelector("#input_cantidad");
const input_precio = document.querySelector("#input_precio");
const input_vencimiento = document.querySelector("#input_vencimiento");

// BOTÓN
const btn_agregarProducto = document.querySelector("#btn_agregarProducto");
const formulario = document.querySelector("#formulario_productos");
// PÁRRAFO
const parrafo_registro_producto = document.querySelector("#parrafo");

// ARREGLO
const arrayProductos = [];

function agregarProducto() {
    const calculoDias = calcularDias(input_vencimiento.value);
    const error=validarProducto(
        input_nombre.value,
        input_cantidad.value,
        input_precio.value,
        calculoDias,
    )
    if(error!==""){
        parrafo_registro_producto.textContent = error;
        return;
    }

    parrafo_registro_producto.textContent = "";

    const cantidad = Number(input_cantidad.value);
    const precio = Number(input_precio.value);
    const urgencia = determinarUrgencia(calculoDias);
    const promocion = recomendarPromocion(calculoDias, cantidad);
    const ahorroyDescuento = descuento_ahorro(promocion, precio);

    const objeto_producto = {
        Nombre: input_nombre.value.trim(),
        Cantidad: cantidad,
        PrecioNormal: precio,
        Vencimiento: input_vencimiento.value,
        diasRestantes: calculoDias,
        Urgencia: urgencia,
        Promocion: promocion,
        ahorroDescuento: ahorroyDescuento
    };

    arrayProductos.push(objeto_producto);
    mostrarProductos(arrayProductos);
    limpiar_formulario();
    
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarProducto();
});


function limpiar_formulario() {
    input_nombre.value = "";
    input_cantidad.value = "";
    input_precio.value = "";
    input_vencimiento.value = "";
}

