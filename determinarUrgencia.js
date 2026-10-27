export function determinarUrgencia(diasRestantes) {
    if (diasRestantes < 0) {
        return "¡Producto vencido!";
    } else if (diasRestantes <= 1) {
        return "¡CRÍTICA!";
    } else if (diasRestantes <= 3) {
        return "¡ALTA!";
    } else if (diasRestantes <= 7) {
        return "¡MODERADA!";
    } else {
        return "¡BAJA!";
    }
}
