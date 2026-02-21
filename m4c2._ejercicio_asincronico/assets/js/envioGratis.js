// 1. Seleccionar los elementos del HTML
const inputTotal = document.getElementById('totalCompra');
const btnCalcular = document.getElementById('btnCalcular');
const cajaResultado = document.getElementById('resultado');
const rules = {
    basic: document.getElementById('rule-a'),
    special: document.getElementById('rule-b'),
    advanced: document.getElementById('rule-c'),
    premium: document.getElementById('rule-d')
};

// Helper function to update active rule
function setActiveRule(activeId) {
    // Remove active class from all rules
    Object.values(rules).forEach(rule => rule.classList.remove('active-rule'));
    // Add active class to the current rule if provided
    if (activeId && rules[activeId]) {
        rules[activeId].classList.add('active-rule');
    }
}

// 2. Escuchar el clic del botón
btnCalcular.addEventListener('click', () => {
    // Obtener el valor ingresado y convertirlo a número
    const totalCompra = Number(inputTotal.value);
    let costoEnvio;
    let mensajeEnvio;

    // Validación por si el usuario no ingresa nada o pone un 0
    if (totalCompra <= 0) {
        cajaResultado.innerHTML = `<p style="color: #dc3545;">Por favor, ingresa un monto válido.</p>`;
        setActiveRule(null);
        return; // Detiene la ejecución aquí
    }

    // 3. Lógica condicional optimizada con colores y selección de regla
    if (totalCompra < 30000) {
        costoEnvio = 5000;
        mensajeEnvio = `Envío estándar. Costo: $${costoEnvio}`;
        cajaResultado.className = 'result-display basico';
        setActiveRule('basic');
    } else if (totalCompra < 70000) {
        costoEnvio = 2500;
        mensajeEnvio = `Descuento del 50% aplicado. Costo: $${costoEnvio}`;
        cajaResultado.className = 'result-display especial';
        setActiveRule('special');
    } else if (totalCompra < 100000) {
        costoEnvio = 1000;
        mensajeEnvio = `Descuento del 80% aplicado. Costo: $${costoEnvio}`;
        cajaResultado.className = 'result-display avanzado';
        setActiveRule('advanced');
    } else {
        costoEnvio = 0;
        mensajeEnvio = `¡Felicidades! Tienes envío GRATIS.`;
        cajaResultado.className = 'result-display premium';
        setActiveRule('premium');
    }

    // 4. Mostrar el resultado directamente en la página web
    cajaResultado.innerHTML = `
              <p><strong>Detalle:</strong> ${mensajeEnvio}</p>
              <h2>Total a pagar: $${totalCompra + costoEnvio}</h2>
          `;
});