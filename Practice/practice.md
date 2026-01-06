Practical exercise to apply the concepts learned.
🛠️ Implementación Práctica
Crea una suite completa de tests unitarios:

Configurar Jest

Instalar dependencias y configurar scripts
Crear archivo de configuración básico
Configurar coverage mínimo
Implementar TDD

Escribir tests que fallen primero
Implementar funcionalidad mínima
Refactorizar manteniendo tests
Crear Tests Unitarios

Tests para funciones puras de cálculo
Tests para validación de datos
Tests para transformación de objetos
Implementar Mocks y Spies

Mock de APIs externas
Spy en métodos de objetos
Control de dependencias externas
Testing Asíncrono

Tests para promesas y async/await
Tests para funciones con timers
Manejo de errores asíncronos
Ejercicio: Implementa tests completos para una función de "carrito de compras" que calcule totales, aplique descuentos y valide stock.

Requerimientos:
# Instalar Jest y dependencias
npm install --save-dev jest

# Para ES6 modules (opcional)
npm install --save-dev @babel/core @babel/preset-env babel-jest

# Configurar scripts en package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}