// Array para almacenar los jugadores registrados
let jugadores = [];

// Requisitos para el torneo
const REQUISITOS = {
    edadMinima: 15,
    edadMaxima: 45,
    alturaMinima: 1.60,
    posicionesValidas: ['Base', 'Escolta', 'Alero', 'Ala-Pivot', 'Pivot']
};

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', registrarJugador);
    
    // Cargar jugadores guardados del localStorage
    cargarJugadores();
});

// Función principal para registrar jugador
function registrarJugador(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const posicion = document.getElementById('posicion').value;
    
    // Validar que todos los campos estén llenos
    if (!nombre || !edad || !altura || !posicion) {
        mostrarMensaje('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Verificar requisitos
    const resultadoValidacion = verificarRequisitos(nombre, edad, altura, posicion);
    
    if (resultadoValidacion.aceptado) {
        // Crear objeto jugador
        const jugador = {
            id: Date.now(),
            nombre: nombre,
            edad: edad,
            altura: altura,
            posicion: posicion,
            aceptado: true,
            fechaRegistro: new Date().toLocaleDateString('es-ES')
        };
        
        // Agregar al array
        jugadores.push(jugador);
        
        // Guardar en localStorage
        guardarJugadores();
        
        // Mostrar mensaje de éxito
        mostrarMensaje(resultadoValidacion.mensaje, 'exito');
        
        // Actualizar lista
        mostrarJugadores();
        
        // Limpiar formulario
        document.getElementById('registroForm').reset();
    } else {
        // Registrar pero marcar como rechazado
        const jugador = {
            id: Date.now(),
            nombre: nombre,
            edad: edad,
            altura: altura,
            posicion: posicion,
            aceptado: false,
            razon: resultadoValidacion.razones.join(', '),
            fechaRegistro: new Date().toLocaleDateString('es-ES')
        };
        
        jugadores.push(jugador);
        guardarJugadores();
        mostrarMensaje(resultadoValidacion.mensaje, 'error');
        mostrarJugadores();
    }
}

// Función para verificar requisitos
function verificarRequisitos(nombre, edad, altura, posicion) {
    const razones = [];
    let aceptado = true;
    
    // Verificar edad
    if (edad < REQUISITOS.edadMinima) {
        razones.push(`Edad mínima: ${REQUISITOS.edadMinima} años`);
        aceptado = false;
    }
    
    if (edad > REQUISITOS.edadMaxima) {
        razones.push(`Edad máxima: ${REQUISITOS.edadMaxima} años`);
        aceptado = false;
    }
    
    // Verificar altura
    if (altura < REQUISITOS.alturaMinima) {
        razones.push(`Altura mínima: ${REQUISITOS.alturaMinima}m`);
        aceptado = false;
    }
    
    // Verificar posición válida
    if (!REQUISITOS.posicionesValidas.includes(posicion)) {
        razones.push('Posición no válida');
        aceptado = false;
    }
    
    // Construir mensaje
    let mensaje = '';
    if (aceptado) {
        mensaje = `✅ ¡Felicidades ${nombre}! Has sido aceptado en el torneo como ${posicion}.`;
    } else {
        mensaje = `❌ Lo sentimos ${nombre}, no cumples con los requisitos:\n${razones.join('\n')}`;
    }
    
    return {
        aceptado: aceptado,
        razones: razones,
        mensaje: mensaje
    };
}

// A
function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo} show`;
    
    // Hacer scroll al mensaje
    mensajeDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        mensajeDiv.classList.remove('show');
    }, 5000);
}

// Función para mostrar jugadores registrados
function mostrarJugadores() {
    const container = document.getElementById('jugadoresContainer');
    
    if (jugadores.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay jugadores registrados aún.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Mostrar jugadores más recientes primero
    const jugadoresOrdenados = [...jugadores].reverse();
    
    jugadoresOrdenados.forEach(jugador => {
        const card = document.createElement('div');
        card.className = 'jugador-card';
        
        const estadoClass = jugador.aceptado ? 'aceptado' : 'rechazado';
        const estadoTexto = jugador.aceptado ? '✓ ACEPTADO' : '✗ RECHAZADO';
        
        let infoExtra = '';
        if (!jugador.aceptado && jugador.razon) {
            infoExtra = `<div style="margin-top: 10px; padding: 10px; background: rgba(220, 53, 69, 0.1); border-radius: 5px; font-size: 0.9em;">
                <strong>Razón:</strong> ${jugador.razon}
            </div>`;
        }
        
        card.innerHTML = `
            <h3>🏀 ${jugador.nombre}</h3>
            <div class="jugador-info">
                <div class="info-item">
                    <strong>Edad:</strong> <span>${jugador.edad} años</span>
                </div>
                <div class="info-item">
                    <strong>Altura:</strong> <span>${jugador.altura}m</span>
                </div>
                <div class="info-item">
                    <strong>Posición:</strong> <span>${jugador.posicion}</span>
                </div>
                <div class="info-item">
                    <strong>Fecha:</strong> <span>${jugador.fechaRegistro}</span>
                </div>
            </div>
            <span class="estado ${estadoClass}">${estadoTexto}</span>
            ${infoExtra}
        `;
        
        container.appendChild(card);
    });
}

// Funciones para localStorage
function guardarJugadores() {
    localStorage.setItem('jugadoresTorneo', JSON.stringify(jugadores));
}

function cargarJugadores() {
    const jugadoresGuardados = localStorage.getItem('jugadoresTorneo');
    if (jugadoresGuardados) {
        jugadores = JSON.parse(jugadoresGuardados);
        mostrarJugadores();
    }
}

// Función para limpiar todos los registros (opcional, para desarrollo)
function limpiarRegistros() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los registros?')) {
        jugadores = [];
        localStorage.removeItem('jugadoresTorneo');
        mostrarJugadores();
        mostrarMensaje('Todos los registros han sido eliminados', 'info');
    }
}

// Exportar función para usar en consola si es necesario
window.limpiarRegistros = limpiarRegistros;
