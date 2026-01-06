import { apiDescuento } from './api';
import { validarStock } from './stockService';

export function calcularTotal(productos) {
  productos.forEach(p => {
    if (p.precio < 0 || p.cantidad < 0) {
      throw new Error('Datos inválidos');
    }
    if (!validarStock(p)) {
      throw new Error('Stock insuficiente');
    }
  });

  return productos.reduce(
    (total, p) => total + p.precio * p.cantidad,
    0
  );
}

export async function procesarCompra(productos, cupon = null) {
  let total = calcularTotal(productos);

  if (cupon) {
    const info = await apiDescuento.validarCupon(cupon);
    if (info.valido) {
      total -= total * info.porcentaje;
    }
  }

  return total;
}
