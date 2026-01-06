// Task 4: Testing de Código Asíncrono (7 minutos)
// Manejo especial requerido para promesas, async/await y timers.

// ⏱️ Patrones de Testing Asíncrono
// Testing con async/await:

// Función asíncrona a testear
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Usuario no encontrado');
  }
  return await response.json();
}

// Tests para código asíncrono
describe('fetchUserData', () => {
  test('retorna datos de usuario correctamente', async () => {
    // Mock de fetch global
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: 'Juan' })
      })
    );

    const result = await fetchUserData(1);

    expect(result).toEqual({ id: 1, name: 'Juan' });
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  test('lanza error para usuario no encontrado', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    await expect(fetchUserData(999)).rejects.toThrow('Usuario no encontrado');
  });
});
// Testing con setTimeout/setInterval:

// Función con timer
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// Tests con timers
describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Usar timers falsos
  });

  afterEach(() => {
    jest.clearAllTimers(); // Limpiar timers
  });

  test('ejecuta función después del delay', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();

    // Función no se ejecuta inmediatamente
    expect(mockFunc).not.toHaveBeenCalled();

    // Avanzar tiempo
    jest.advanceTimersByTime(1000);

    // Ahora sí se ejecuta
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test('reinicia timer si se llama nuevamente', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    jest.advanceTimersByTime(500); // Medio delay

    debouncedFunc(); // Reiniciar
    jest.advanceTimersByTime(500); // Otro medio delay

    // Aún no se ejecuta (reiniciado)
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000); // Delay completo desde último llamado
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
// Concepto clave: Jest maneja automáticamente promesas y timers en tests.