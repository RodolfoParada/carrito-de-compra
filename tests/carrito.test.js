import { calcularTotal, procesarCompra } from '../src/carrito';
import { apiDescuento } from '../src/api';
import * as stockService from '../src/stockService';

jest.mock('../src/api.js');

describe('Carrito de Compras - Tests Unitarios', () => {

  // Test de cálculo
  test('calcula correctamente el total', () => {
    const carrito = [
      { precio: 10, cantidad: 2, stock: 5 },
      { precio: 5, cantidad: 1, stock: 2 }
    ];

    expect(calcularTotal(carrito)).toBe(25);
  });

  // Validación de datos
  test('lanza error si precio es negativo', () => {
    const carrito = [{ precio: -1, cantidad: 1, stock: 5 }];

    expect(() => calcularTotal(carrito)).toThrow('Datos inválidos');
  });

  // 📦 Validación de stock
  test('lanza error si no hay stock suficiente', () => {
    const carrito = [{ precio: 10, cantidad: 5, stock: 2 }];

    expect(() => calcularTotal(carrito)).toThrow('Stock insuficiente');
  });

  // 🎭 Mock API externa
  test('aplica descuento si el cupón es válido', async () => {
    apiDescuento.validarCupon.mockResolvedValue({
      valido: true,
      porcentaje: 0.1
    });

    const carrito = [{ precio: 10, cantidad: 2, stock: 5 }];

    const total = await procesarCompra(carrito, 'DESC10');

    expect(total).toBe(18);
    expect(apiDescuento.validarCupon).toHaveBeenCalledWith('DESC10');
  });

  // Spy sobre método
  test('valida stock usando spy', () => {
    const spy = jest.spyOn(stockService, 'validarStock');

    const carrito = [{ precio: 10, cantidad: 1, stock: 5 }];
    calcularTotal(carrito);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  //Error async
  test('maneja error async correctamente', async () => {
    apiDescuento.validarCupon.mockRejectedValue(new Error('API caída'));

    const carrito = [{ precio: 10, cantidad: 1, stock: 5 }];

    await expect(
      procesarCompra(carrito, 'ERROR')
    ).rejects.toThrow('API caída');
  });

  // ⏱ Timers
  test('función con timeout', () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    setTimeout(fn, 1000);

    jest.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalled();
  });

  test('NO aplica descuento si el cupón es inválido', async () => {
  apiDescuento.validarCupon.mockResolvedValue({
    valido: false,
    porcentaje: 0
  });

  const carrito = [{ precio: 10, cantidad: 2, stock: 5 }];

  const total = await procesarCompra(carrito, 'INVALIDO');

  expect(total).toBe(20);
});


});
