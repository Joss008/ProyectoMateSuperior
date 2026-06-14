// Archivo: frontend/js/panel.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificamos si el usuario ha iniciado sesión (buscando el token)
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol'); // 'cliente' o 'admin'

    if (!token) {
        // Si no hay token, significa que no ha iniciado sesión o expiró
        alert('Por favor, inicia sesión para acceder al panel.');
        window.location.href = 'index.html';
        return; // Detenemos la ejecución del script
    }

    // 2. Si el usuario está validado, configuramos su interfaz según su rol
    const body = document.body;
    const tituloMenu = document.getElementById('user-role-title');
    const mensajeBienvenida = document.getElementById('welcome-message');

    if (rol === 'admin') {
        // Asignamos la clase que muestra las secciones de administrador
        body.classList.add('role-admin');
        tituloMenu.innerText = 'Panel Admin';
        mensajeBienvenida.innerText = 'Bienvenido, Administrador';
    } else {
        // Por defecto, si es 'cliente' (u otro rol), mostramos la vista de cliente
        body.classList.add('role-cliente');
        tituloMenu.innerText = 'Panel Cliente';
        mensajeBienvenida.innerText = 'Bienvenido, Cliente';
    }

    // 3. Mostramos la pantalla suavemente (evita el parpadeo inicial)
    body.classList.add('loaded');

    // 4. Lógica para el botón de Cerrar Sesión
    document.getElementById('enlace-logout').addEventListener('click', (evento) => {
        evento.preventDefault();
        
        // Borramos los datos de sesión del almacenamiento del navegador
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        
        // Redirigimos a la página de inicio
        window.location.href = 'index.html';
    });
});

// Función para cargar módulos dinámicamente sin recargar la página
window.cargarModulo = async function(modulo) {
    const contenedor = document.getElementById('dynamic-content');
    
    if (modulo === 'inicio') {
        contenedor.innerHTML = `
            <h3>Bienvenido al Laboratorio Matemático</h3>
            <p style="color: #64748b; margin-top: 10px;">Selecciona un módulo en la barra lateral para comenzar la demostración.</p>
        `;
        return;
    }

    try {
        contenedor.innerHTML = '<p>Cargando módulo matemático...</p>';
        
        // Petición al archivo HTML del módulo
        const respuesta = await fetch(`modules/${modulo}.html`);
        if (!respuesta.ok) throw new Error('Módulo no encontrado');
        
        const html = await respuesta.text();
        contenedor.innerHTML = html;
        
        // Ejecutar los scripts que vengan dentro del HTML cargado (si es necesario)
        const scripts = contenedor.querySelectorAll('script');
        scripts.forEach(script => {
            const nuevoScript = document.createElement('script');
            if (script.src) {
                nuevoScript.src = script.src;
            } else {
                nuevoScript.textContent = script.textContent;
            }
            document.body.appendChild(nuevoScript);
            document.body.removeChild(nuevoScript); // Limpieza
        });

    } catch (error) {
        console.error('Error cargando módulo:', error);
        contenedor.innerHTML = `<p style="color:red;">Error cargando el módulo: ${modulo}</p>`;
    }
};
