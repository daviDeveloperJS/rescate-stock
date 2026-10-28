//importaciones
import { descuento_ahorro } from "./calcularDescuento.js";
import { recomendarPromocion } from "./recomendarPromocion.js";
import { calcularDias } from "./calcularDias.js";
import { determinarUrgencia } from "./determinarUrgencia.js";
import {validarProducto} from "./validarProducto.js"

// INPUTS
const input_nombre = document.querySelector("#input_nombre");
const input_cantidad = document.querySelector("#input_cantidad");
const input_precio = document.querySelector("#input_precio");
const input_vencimiento = document.querySelector("#input_vencimiento");

// BOTÓN
const btn_agregarProducto = document.querySelector("#btn_agregarProducto");

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
    mostrarProductos();
    limpiar_formulario();
    
}

btn_agregarProducto.addEventListener("click", (e) => {
    e.preventDefault();
    agregarProducto();
});

const division_productos = document.querySelector("#lista_productos");

function mostrarProductos() {
    division_productos.textContent = "";

    const arreglo_ordenado_copia = [...arrayProductos].sort((a, b) => {
        return a.diasRestantes - b.diasRestantes;
    });

    arreglo_ordenado_copia.forEach((e) => {
        const div_div_productos = document.createElement("div");
        const nombre = document.createElement("h2");
        const cantidad = document.createElement("p");
        const PrecioNormal = document.createElement("p");
        const vencimiento = document.createElement("p");
        const parrafo_dias_vencimiento = document.createElement("p");
        const urgencia_vencimiento = document.createElement("p");
        const recomendacion = document.createElement("p");
        const promocionAplicada = document.createElement("p");
        const precioFinalCalculo = document.createElement("p");
        const descuentoAhorrado = document.createElement("p");
        const mensaje_2x1 = document.createElement("p");

        const btn_revisarPromocion = document.createElement("button");
        const btn_aceptarPromocion = document.createElement("button");
        const btn_modificarPromocion = document.createElement("button");
        const btn_mantenerPrecio = document.createElement("button");

        nombre.textContent = "Nombre: " + e.Nombre;
        cantidad.textContent = "Cantidad: " + e.Cantidad;

        PrecioNormal.textContent =
            "Precio Normal S/: " + e.PrecioNormal.toFixed(2);

        vencimiento.textContent = "Vencimiento: " + e.Vencimiento;

        parrafo_dias_vencimiento.textContent =
            "Días restantes para su vencimiento: " + e.diasRestantes;

        urgencia_vencimiento.textContent =
            "Urgencia clasificada: " + e.Urgencia;

        recomendacion.textContent =
            "Promoción sugerida: " + e.Promocion.descripcion;

        // Recupera los mensajes según la decisión guardada.
        if (
            e.decisionPromocion === "aceptada" ||
            e.decisionPromocion === "aplicada"
        ) {
            recomendacion.textContent = "Decisión: promoción aprobada";

            promocionAplicada.textContent =
                "Promoción aplicada: " + e.Promocion.descripcion;

            if (e.Promocion.tipo === "2x1") {
                precioFinalCalculo.textContent =
                    "Precio aprobado por 2 unidades: S/ " +
                    e.ahorroDescuento.precioFinalProducto.toFixed(2);

                descuentoAhorrado.textContent =
                    "Ahorro por 2 unidades: S/ " +
                    e.ahorroDescuento.Descuento.toFixed(2);

                mensaje_2x1.textContent =
                    "2x1 aplicado: llevas 2 y pagas 1";
            } else {
                precioFinalCalculo.textContent =
                    "Precio aprobado por unidad: S/ " +
                    e.ahorroDescuento.precioFinalProducto.toFixed(2);

                descuentoAhorrado.textContent =
                    "Ahorro por unidad: S/ " +
                    e.ahorroDescuento.Descuento.toFixed(2);
            }
        } else if (e.decisionPromocion === "mantenida") {
            // Recupera la decisión de mantener el precio.
            recomendacion.textContent =
                "Decisión: mantener precio original";

            promocionAplicada.textContent =
                "Promoción aplicada: ninguna";

            precioFinalCalculo.textContent =
                "Precio final por unidad: S/ " +
                e.PrecioNormal.toFixed(2);

            descuentoAhorrado.textContent =
                "Descuento aplicado: S/ 0.00";
        } else {
            // Producto sin decisión: muestra la sugerencia.
            if (e.Promocion.tipo === "2x1") {
                precioFinalCalculo.textContent =
                    "Precio sugerido por 2 unidades: S/ " +
                    e.ahorroDescuento.precioFinalProducto.toFixed(2);

                mensaje_2x1.textContent =
                    "2x1 sugerido: llevas 2 y pagas 1";

                descuentoAhorrado.textContent =
                    "Ahorro sugerido por 2 unidades: S/ " +
                    e.ahorroDescuento.Descuento.toFixed(2);
            } else {
                precioFinalCalculo.textContent =
                    "Precio sugerido por unidad: S/ " +
                    e.ahorroDescuento.precioFinalProducto.toFixed(2);

                descuentoAhorrado.textContent =
                    "Ahorro sugerido por unidad: S/ " +
                    e.ahorroDescuento.Descuento.toFixed(2);
            }
        }

        const opciones_recomendacion = document.createElement("div");
        opciones_recomendacion.className = "opciones-recomendacion";

        // Texto del botón que faltaba en la última versión.
        btn_revisarPromocion.textContent = "Revisar promoción";

        btn_revisarPromocion.addEventListener("click", () => {
            opciones_recomendacion.appendChild(btn_aceptarPromocion);
            opciones_recomendacion.appendChild(btn_modificarPromocion);
            opciones_recomendacion.appendChild(btn_mantenerPrecio);

            btn_aceptarPromocion.textContent = "¿Aceptar promoción?";
            btn_modificarPromocion.textContent = "¿Modificar promoción?";
            btn_mantenerPrecio.textContent = "Mantener precio original";
        });

        btn_aceptarPromocion.addEventListener("click", (m) => {
            e.decisionPromocion = "aceptada";

            btn_revisarPromocion.remove();
            btn_aceptarPromocion.remove();
            btn_modificarPromocion.remove();
            btn_mantenerPrecio.remove();
            label_modificar.remove();
            input_modificar.remove();

            // El mensaje del 2x1 se conserva y cambia de texto.
            if (e.Promocion.tipo === "2x1") {
                nombre.textContent = "Nombre: " + e.Nombre;
                cantidad.textContent = "Cantidad: " + e.Cantidad;

                PrecioNormal.textContent =
                    "Precio Normal S/: " + e.PrecioNormal.toFixed(2);

                vencimiento.textContent =
                    "Vencimiento: " + e.Vencimiento;

                parrafo_dias_vencimiento.textContent =
                    "Días restantes para su vencimiento: " +
                    e.diasRestantes;

                urgencia_vencimiento.textContent =
                    "Urgencia clasificada: " + e.Urgencia;

                recomendacion.textContent =
                    "Recomendación original: " +
                    e.Promocion.descripcion;

                promocionAplicada.textContent =
                    "Promoción aplicada: " + e.Promocion.descripcion;

                precioFinalCalculo.textContent =
                    "Precio aprobado por 2 unidades: S/ " +
                    e.ahorroDescuento.precioFinalProducto.toFixed(2);

                descuentoAhorrado.textContent =
                    "Ahorro por 2 unidades: S/ " +
                    e.ahorroDescuento.Descuento.toFixed(2);

                mensaje_2x1.textContent =
                    "2x1 aplicado: llevas 2 y pagas 1";
            } else {
                nombre.textContent = "Nombre: " + e.Nombre;
                cantidad.textContent = "Cantidad: " + e.Cantidad;

                PrecioNormal.textContent =
                    "Precio Normal S/: " + e.PrecioNormal.toFixed(2);

                vencimiento.textContent =
                    "Vencimiento: " + e.Vencimiento;

                parrafo_dias_vencimiento.textContent =
                    "Días restantes para su vencimiento: " +
                    e.diasRestantes;

                urgencia_vencimiento.textContent =
                    "Urgencia clasificada: " + e.Urgencia;

                recomendacion.textContent =
                    "Recomendación original: " +
                    e.Promocion.descripcion;

                promocionAplicada.textContent =
                    "Promoción aplicada: " + e.Promocion.descripcion;

                precioFinalCalculo.textContent =
                    "Precio aprobado: S/ " +
                    e.ahorroDescuento.precioFinalProducto.toFixed(2);

                descuentoAhorrado.textContent =
                    "Ahorrado S/: " +
                    e.ahorroDescuento.Descuento.toFixed(2);
            }
        });

        // Se crean una sola vez por tarjeta, fuera de los clics.
        const label_modificar = document.createElement("label");
        const input_modificar = document.createElement("input");
        const btn_aplicarModificacion = document.createElement("button");
        const parrafo_modificar = document.createElement("p");

        btn_modificarPromocion.addEventListener("click", (m) => {
            btn_aplicarModificacion.textContent = "Aplicar descuento";

            btn_revisarPromocion.remove();
            btn_aceptarPromocion.remove();
            btn_modificarPromocion.remove();
            btn_mantenerPrecio.remove();

            label_modificar.appendChild(input_modificar);
            div_div_productos.appendChild(label_modificar);
            div_div_productos.appendChild(btn_aplicarModificacion);
        });

        // Evento separado: se registra una sola vez por tarjeta.
        btn_aplicarModificacion.addEventListener("click", () => {
            const numero_modificar = Number(input_modificar.value);

            btn_revisarPromocion.remove();
            btn_aceptarPromocion.remove();
            btn_modificarPromocion.remove();
            btn_mantenerPrecio.remove();

            if (
                !Number.isInteger(numero_modificar) ||
                numero_modificar <= 0 ||
                numero_modificar > 99
            ) {
                parrafo_modificar.textContent = "Ingrese un numero valido!";
                div_div_productos.appendChild(parrafo_modificar);
            } else {
                e.decisionPromocion = "aplicada";

                parrafo_modificar.textContent = "";
                label_modificar.remove();
                input_modificar.remove();
                btn_aplicarModificacion.remove();

                mensaje_2x1.remove();
                e.Promocion.porcentaje = numero_modificar;

                if (e.Promocion.tipo === "2x1") {
                    btn_modificarPromocion.textContent =
                        "Aplicar descuento!!!";

                    e.Promocion.tipo = "descuento";

                    nombre.textContent = "Nombre: " + e.Nombre;
                    cantidad.textContent = "Cantidad: " + e.Cantidad;

                    PrecioNormal.textContent =
                        "Precio Normal S/: " + e.PrecioNormal.toFixed(2);

                    vencimiento.textContent =
                        "Vencimiento: " + e.Vencimiento;

                    parrafo_dias_vencimiento.textContent =
                        "Días restantes para su vencimiento: " +
                        e.diasRestantes;

                    urgencia_vencimiento.textContent =
                        "Urgencia clasificada: " + e.Urgencia;

                    recomendacion.textContent =
                        "Recomendación original: " +
                        e.Promocion.descripcion;

                    e.Promocion.descripcion =
                        "Descuento del " + numero_modificar + "%";

                    promocionAplicada.textContent =
                        "Promoción aplicada: " + e.Promocion.descripcion;

                    e.ahorroDescuento = descuento_ahorro(
                        e.Promocion,
                        e.PrecioNormal
                    );

                    precioFinalCalculo.textContent =
                        "Precio aprobado: S/ " +
                        e.ahorroDescuento.precioFinalProducto.toFixed(2);

                    descuentoAhorrado.textContent =
                        "Ahorrado S/: " +
                        e.ahorroDescuento.Descuento.toFixed(2);
                } else {
                    nombre.textContent = "Nombre: " + e.Nombre;
                    cantidad.textContent = "Cantidad: " + e.Cantidad;

                    e.Promocion.tipo = "descuento";

                    PrecioNormal.textContent =
                        "Precio Normal S/: " + e.PrecioNormal.toFixed(2);

                    vencimiento.textContent =
                        "Vencimiento: " + e.Vencimiento;

                    parrafo_dias_vencimiento.textContent =
                        "Días restantes para su vencimiento: " +
                        e.diasRestantes;

                    urgencia_vencimiento.textContent =
                        "Urgencia clasificada: " + e.Urgencia;

                    recomendacion.textContent =
                        "Recomendación original: " +
                        e.Promocion.descripcion;

                    e.Promocion.descripcion =
                        "Descuento del " + numero_modificar + "%";

                    promocionAplicada.textContent =
                        "Promoción aplicada: " + e.Promocion.descripcion;

                    e.ahorroDescuento = descuento_ahorro(
                        e.Promocion,
                        e.PrecioNormal
                    );

                    precioFinalCalculo.textContent =
                        "Precio aprobado: S/ " +
                        e.ahorroDescuento.precioFinalProducto.toFixed(2);

                    descuentoAhorrado.textContent =
                        "Ahorrado S/: " +
                        e.ahorroDescuento.Descuento.toFixed(2);
                }
            }
        });

        btn_mantenerPrecio.addEventListener("click", (m) => {
            const parrafoPrecioMantenido = document.createElement("p");

            btn_revisarPromocion.remove();
            btn_aceptarPromocion.remove();
            btn_modificarPromocion.remove();
            btn_mantenerPrecio.remove();

            mensaje_2x1.remove();
            e.decisionPromocion = "mantenida";

            nombre.textContent = "Nombre: " + e.Nombre;
            cantidad.textContent = "Cantidad: " + e.Cantidad;

            PrecioNormal.textContent =
                "Precio Normal S/: " + e.PrecioNormal.toFixed(2);

            vencimiento.textContent = "Vencimiento: " + e.Vencimiento;

            parrafo_dias_vencimiento.textContent =
                "Días restantes para su vencimiento: " + e.diasRestantes;

            urgencia_vencimiento.textContent =
                "Urgencia clasificada: " + e.Urgencia;

            e.Promocion.tipo = "ninguna";
            e.Promocion.porcentaje = 0;
            e.Promocion.descripcion = "Sin promoción";

            recomendacion.textContent =
                "Promoción aplicada: " + e.Promocion.tipo;

            e.ahorroDescuento = descuento_ahorro(
                e.Promocion,
                e.PrecioNormal
            );

            descuentoAhorrado.textContent =
                "Descuento aplicado: " + e.ahorroDescuento.Descuento;

            precioFinalCalculo.textContent =
                "Precio final: S/ " + e.PrecioNormal.toFixed(2);

            parrafoPrecioMantenido.textContent =
                "Precio original implementado!";

            div_div_productos.appendChild(parrafoPrecioMantenido);
        });

        // Este bloque determina el orden de la tarjeta.
        div_div_productos.appendChild(nombre);
        div_div_productos.appendChild(cantidad);
        div_div_productos.appendChild(PrecioNormal);
        div_div_productos.appendChild(vencimiento);
        div_div_productos.appendChild(parrafo_dias_vencimiento);
        div_div_productos.appendChild(urgencia_vencimiento);
        div_div_productos.appendChild(recomendacion);
        div_div_productos.appendChild(promocionAplicada);
        div_div_productos.appendChild(precioFinalCalculo);

        // El mensaje del 2x1 se agrega una sola vez,
        // después del precio.
        if (e.Promocion.tipo === "2x1") {
            div_div_productos.appendChild(mensaje_2x1);
        }

        div_div_productos.appendChild(descuentoAhorrado);

        // Revisar solo aparece cuando no hay una decisión final.
        if (
            e.decisionPromocion !== "aceptada" &&
            e.decisionPromocion !== "aplicada" &&
            e.decisionPromocion !== "mantenida"
        ) {
            div_div_productos.appendChild(btn_revisarPromocion);
        }

        div_div_productos.appendChild(opciones_recomendacion);
        division_productos.appendChild(div_div_productos);
    });
}

function limpiar_formulario() {
    input_nombre.value = "";
    input_cantidad.value = "";
    input_precio.value = "";
    input_vencimiento.value = "";
}

