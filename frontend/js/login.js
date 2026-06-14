// Archivo: frontend/js/login.js

// Escuchamos el momento exacto en que el usuario envía el formulario
document.getElementById('formularioLogin').addEventListener('submit', async (evento) => {
    
    // 1. Evitamos que el navegador recargue la página (comportamiento por defecto)
    evento.preventDefault();

    // 2. Extraemos el texto que el usuario escribió en los campos
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    try {
        // 3. Hacemos la llamada "Fetch" a nuestro backend real
        const respuesta = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Le decimos al servidor que enviamos datos JSON
            },
            body: JSON.stringify({ 
                correo: emailInput, 
                password: passwordInput 
            })
        });

        // 4. Convertimos la respuesta del servidor para poder leerla
        const datos = await respuesta.json();

        // 5. Evaluamos si el servidor nos dio luz verde (Status 200 OK)
        if (respuesta.ok) {
            // ¡Éxito! Guardamos el Pase VIP (Token) y el Rol en la memoria del navegador (Local Storage)
            localStorage.setItem('token', datos.token);
            localStorage.setItem('rol', datos.rol);

            alert('¡Inicio de sesión exitoso!');

            // Redirigimos al usuario a su panel de control
            window.location.href = 'panel.html';
        } else {
            // Si el servidor responde con error (Ej. clave incorrecta), lo mostramos
            alert('Acceso denegado: ' + datos.mensaje);
        }

    } catch (error) {
        // Este bloque atrapa errores graves (Ej. el servidor Node.js está apagado)
        console.error('Error de red:', error);
        alert('Error crítico: No se pudo contactar al servidor.');
    }
});