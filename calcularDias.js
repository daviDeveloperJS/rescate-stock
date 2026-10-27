export function calcularDias(fechaIngresada) {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const fechaVencimiento = new Date(fechaIngresada + "T00:00:00");
    const diferencia = fechaVencimiento - fechaActual;
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const resultado = Math.ceil(diferencia / milisegundosPorDia);

    return resultado;
}