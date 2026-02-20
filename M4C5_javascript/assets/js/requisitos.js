// Array para almacenar los jugadores registrados
let jugadores = [];

// Requisitos para el torneo
const REQUISITOS = {
    edadMinima: 15,
    edadMaxima: 45,
    alturaMinima: 1.60,
    posicionesValidas: ['Base', 'Escolta', 'Alero', 'Ala-Pivot', 'Pivot']
};

// Array de imágenes para fondo aleatorio
const imagenesFondo = [
    'assets/img/image.webp',
    'assets/img/image (2).webp',
    'assets/img/image (3).webp',
    'assets/img/image (4).webp'
];

let indiceActual = Math.floor(Math.random() * imagenesFondo.length);
let fondoActivo = 1;

function aplicarFondoAleatorio() {
    const fondo1 = document.getElementById('fondo1');
    const fondo2 = document.getElementById('fondo2');
    
    if (fondoActivo === 1) {
        fondo1.style.backgroundImage = `url('${imagenesFondo[indiceActual]}')`;
        fondo1.style.opacity = '1';
        fondo2.style.opacity = '0';
    } else {
        fondo2.style.backgroundImage = `url('${imagenesFondo[indiceActual]}')`;
        fondo2.style.opacity = '1';
        fondo1.style.opacity = '0';
    }
}

function alternarFondo() {
    indiceActual = (indiceActual + 1) % imagenesFondo.length;
    fondoActivo = fondoActivo === 1 ? 2 : 1;
    aplicarFondoAleatorio();
}

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', registrarJugador);
    
    // Cargar jugadores guardados del localStorage
    cargarJugadores();
    
    // Aplicar fondo aleatorio
    aplicarFondoAleatorio();
    
    // Alternar fondo cada 4 segundos
    setInterval(alternarFondo, 4000);
    
    // Reproducir audio en loop alternando
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    
    if (audio1 && audio2) {
        audio1.volume = 0.05;
        audio2.volume = 0.05;
        
        audio1.play().then(() => {
            audio1.addEventListener('ended', function() {
                audio2.play();
            });
        }).catch(() => {
            console.log('Autoplay bloqueado. El usuario debe interactuar primero.');
        });
        
        audio2.addEventListener('ended', function() {
            audio1.play();
        });
    }
});

// Función principal para registrar jugador
function registrarJugador(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const posicion = document.getElementById('posicion').value;
    
    // Validar que todos los campos estén llenos
    if (!nombre || !email || !edad || !altura || !posicion) {
        mostrarMensaje('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Verificar requisitos
    const resultadoValidacion = verificarRequisitos(nombre, email, edad, altura, posicion);
    
    if (resultadoValidacion.aceptado) {
        // Crear objeto jugador
        const jugador = {
            id: Date.now(),
            nombre: nombre,
            email: email,
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
            email: email,
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
function verificarRequisitos(nombre, email, edad, altura, posicion) {
    const razones = [];
    let aceptado = true;
    
    // Verificar edad
    let categoria = '';
    if (edad >= 15 && edad <= 17) {
        categoria = 'JUVENIL';
    } else if (edad >= 18 && edad <= 45) {
        categoria = 'ADULTO';
    }
    
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
        mensaje = `✅ ¡Felicidades ${nombre}! Has sido aceptado en el torneo como ${posicion} (${categoria}).\n\n📧 Pronto enviaremos un correo a ${email} con toda la información de la competición, horarios e indicaciones previas.`;
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
        let categoria = '';
        if (jugador.edad >= 15 && jugador.edad <= 17) {
            categoria = 'JUVENIL';
        } else if (jugador.edad >= 18 && jugador.edad <= 45) {
            categoria = 'ADULTO';
        }
        
        if (!jugador.aceptado && jugador.razon) {
            infoExtra = `<div style="margin-top: 10px; padding: 10px; background: rgba(220, 53, 69, 0.1); border-radius: 5px; font-size: 0.9em;">
                <strong>Razón:</strong> ${jugador.razon}
            </div>`;
        }
        
        card.innerHTML = `
            <h3>🏀 ${jugador.nombre}</h3>
            <div class="jugador-info">
                <div class="info-item">
                    <strong>Email:</strong> <span>${jugador.email}</span>
                </div>
                <div class="info-item">
                    <strong>Edad:</strong> <span>${jugador.edad} años (${categoria})</span>
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
            <div class="card-actions">
                <span class="estado ${estadoClass}">${estadoTexto}</span>
                <button class="btn-eliminar" onclick="eliminarJugador(${jugador.id})">✗ ELIMINAR</button>
            </div>
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

function eliminarJugador(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
        jugadores = jugadores.filter(j => j.id !== id);
        guardarJugadores();
        mostrarJugadores();
        mostrarMensaje('Jugador eliminado correctamente', 'info');
    }
}

// Exportar función para usar en consola si es necesario
window.limpiarRegistros = limpiarRegistros;
window.eliminarJugador = eliminarJugador;
