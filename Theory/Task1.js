// Task 1: Fundamentos del Testing y TDD (8 minutos)
// Comprensión de por qué y cómo implementar testing efectivo en desarrollo de software.

// 🎯 ¿Por qué es Crítico el Testing en Desarrollo Moderno?
// El testing no es opcional - es fundamental para calidad y mantenibilidad:

// Problemas sin testing adecuado:

// Bugs en producción que afectan usuarios reales
// Miedo a refactorizar código legacy
// Regresiones silenciosas que rompen funcionalidades existentes
// Dificultad para integrar cambios sin romper nada
// Confianza baja en el código y despliegues
// Beneficios del testing sistemático:

// Confianza en cambios: Refactorizar sin miedo
// Documentación viva: Tests explican qué hace el código
// Detección temprana: Bugs encontrados antes de producción
// Mejor diseño: Código testable = código bien diseñado
// Reducción de costos: Bugs baratos de arreglar en desarrollo
// Concepto clave: El testing es inversión que se paga sola en forma de estabilidad y velocidad de desarrollo.

// 📋 Metodología TDD (Test-Driven Development)
// Ciclo RED-GREEN-REFACTOR:

// 🔴 RED: Escribe test que falle (describe comportamiento deseado)
// 🟢 GREEN: Escribe código mínimo para pasar el test
// 🔵 REFACTOR: Mejora código manteniendo tests verdes
// Ejemplo de TDD en práctica:

// 1. RED: Test falla inicialmente
test('suma dos números correctamente', () => {
  expect(sumar(2, 3)).toBe(5);
});

// 2. GREEN: Implementación mínima
function sumar(a, b) {
  return a + b;
}

// 3. REFACTOR: Mejorar sin cambiar comportamiento
function sumar(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos argumentos deben ser números');
  }
  return a + b;
}

// Concepto clave: TDD fuerza pensar en comportamiento antes de implementación.

