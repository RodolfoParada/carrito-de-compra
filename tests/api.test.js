import { apiDescuento } from '../src/api';

describe('API Descuento - Implementación real', () => {

  test('devuelve cupón inválido por defecto', async () => {
    const resultado = await apiDescuento.validarCupon('CUALQUIERA');

    expect(resultado).toEqual({
      valido: false,
      porcentaje: 0
    });
  });

});
