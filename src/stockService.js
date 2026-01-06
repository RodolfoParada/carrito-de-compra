export function validarStock(producto) {
  return producto.cantidad <= producto.stock;
}
