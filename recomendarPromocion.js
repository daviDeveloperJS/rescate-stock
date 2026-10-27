export function recomendarPromocion(diasRestantes, cantidadStock) {
    if (diasRestantes < 0) {
        return {
            tipo: "vencido",
            porcentaje: 0,
            descripcion: "Producto vencido"
        };
    }

    let porcentaje;
    let descripcion;

    if (diasRestantes <= 1) {
        if (cantidadStock >= 20) {
            porcentaje = 60;
            descripcion = "Liquidación: 60 % de descuento";
        } else if (cantidadStock >= 10) {
            porcentaje = 50;
            descripcion = "Liquidación: 50 % de descuento";
        } else {
            porcentaje = 40;
            descripcion = "Descuento del 40 %";
        }
    } else if (diasRestantes <= 3) {
        if (cantidadStock >= 20) {
            return {
                tipo: "2x1",
                porcentaje: 0,
                descripcion: "Promoción 2x1"
            };
        } else if (cantidadStock >= 10) {
            porcentaje = 35;
            descripcion = "Descuento del 35 %";
        } else {
            porcentaje = 25;
            descripcion = "Descuento del 25 %";
        }
    } else if (diasRestantes <= 7) {
        if (cantidadStock >= 20) {
            porcentaje = 25;
            descripcion = "Descuento del 25 %";
        } else if (cantidadStock >= 10) {
            porcentaje = 20;
            descripcion = "Descuento del 20 %";
        } else {
            porcentaje = 15;
            descripcion = "Descuento del 15 %";
        }
    } else {
        return {
            tipo: "ninguna",
            porcentaje: 0,
            descripcion: "Sin promoción urgente"
        };
    }

    return {
        tipo: "descuento",
        porcentaje: porcentaje,
        descripcion: descripcion
    };
}