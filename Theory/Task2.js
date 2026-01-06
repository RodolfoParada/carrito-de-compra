// Task 2: Configuración y Primeros Tests con Jest (7 minutos)
// Configuración inicial de Jest y escritura de primeros tests unitarios.

// ⚙️ Configuración Básica de Jest
// Instalación y configuración:

// # Instalar Jest
// npm install --save-dev jest

// # En package.json agregar scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
// Archivo de configuración jest.config.js:

module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/index.js',
    '!src/**/*.test.{js,ts}',
    '!src/**/*.spec.{js,ts}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
// Concepto clave: Jest se configura una vez y funciona automáticamente.

// 🧪 Estructura Básica de un Test
// Patrón AAA (Arrange-Act-Assert):

// Función a testear
function calcularImpuesto(precio, tasa = 0.21) {
  if (precio < 0) throw new Error('Precio no puede ser negativo');
  return precio * tasa;
}

// Tests unitarios
describe('calcularImpuesto', () => {
  test('calcula impuesto correctamente con tasa por defecto', () => {
    // Arrange
    const precio = 100;

    // Act
    const resultado = calcularImpuesto(precio);

    // Assert
    expect(resultado).toBe(21);
  });

  test('calcula impuesto con tasa personalizada', () => {
    const precio = 200;
    const tasa = 0.10;
    const resultado = calcularImpuesto(precio, tasa);
    expect(resultado).toBe(20);
  });

  test('lanza error para precio negativo', () => {
    expect(() => calcularImpuesto(-50)).toThrow('Precio no puede ser negativo');
  });
});
// Concepto clave: Los tests siguen estructura clara y verifican un comportamiento específico.