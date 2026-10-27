export function descuento_ahorro(promocion,precioNormall){
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