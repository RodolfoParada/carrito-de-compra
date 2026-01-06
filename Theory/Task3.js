// Task 3: Mocks, Stubs y Spies (8 minutos)
// Técnicas para testing aislado cuando hay dependencias externas.

// 🎭 ¿Por qué Necesitamos Mocks?
// Problemas con dependencias en tests:

// APIs externas: Tests lentos e inestables
// Bases de datos: Estado mutable entre tests
// Módulos externos: Comportamiento impredecible
// Funciones no puras: Efectos secundarios
// Solución: Testing aislado con mocks

// Tipos de mocks:

// Stub: Reemplaza implementación completa
// Spy: Observa llamadas sin cambiar comportamiento
// Mock: Controla comportamiento y verifica interacciones
// Concepto clave: Los mocks permiten controlar dependencias para testing predictible.

// 🔧 Implementación Práctica de Mocks
// Mock de módulos:

// api.js - módulo a mockear
export const api = {
  getUser: (id) => fetch(`/api/users/${id}`).then(r => r.json()),
  saveUser: (user) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  }).then(r => r.json())
};

// userService.js - código que usa la API
import { api } from './api.js';

export async function getUserName(id) {
  const user = await api.getUser(id);
  return user.name;
}

// userService.test.js
import { api } from './api.js';
import { getUserName } from './userService.js';

// Mock del módulo api
jest.mock('./api.js');

describe('getUserName', () => {
  test('retorna nombre del usuario', async () => {
    // Arrange: Configurar mock
    api.getUser.mockResolvedValue({ id: 1, name: 'Juan' });

    // Act
    const result = await getUserName(1);

    // Assert
    expect(result).toBe('Juan');
    expect(api.getUser).toHaveBeenCalledWith(1);
  });
});
// Spy para funciones existentes:

// math.js
export const math = {
  sumar: (a, b) => a + b,
  multiplicar: (a, b) => a * b
};

// calculator.js
import { math } from './math.js';

export function calcularTotal(precios) {
  return precios.reduce((total, precio) => {
    return math.sumar(total, precio);
  }, 0);
}

// calculator.test.js
import { math } from './math.js';
import { calcularTotal } from './calculator.js';

// Spy en función específica
const spySumar = jest.spyOn(math, 'sumar');

describe('calcularTotal', () => {
  afterEach(() => {
    spySumar.mockRestore(); // Limpiar spy
  });

  test('calcula total correctamente', () => {
    const precios = [10, 20, 30];
    const resultado = calcularTotal(precios);

    expect(resultado).toBe(60);
    expect(spySumar).toHaveBeenCalledTimes(2); // Llamado 2 veces en reduce
  });
});
// Concepto clave: Los spies permiten verificar interacciones sin cambiar comportamiento.