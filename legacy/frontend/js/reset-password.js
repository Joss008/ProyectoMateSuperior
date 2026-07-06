document.getElementById('formularioReset').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    // 1. Obtener el token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        alert('Token de restablecimiento no válido o ausente.');
        window.location.href = 'index.html';
        return;
    }

    const passwordInput = document.getElementById('password').value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    if (passwordInput !== confirmPasswordInput) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    try {
        // 2. Enviar los datos al backend mediante llamada relativa
        const respuesta = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                token: token,
                password: passwordInput 
            })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert('¡Tu contraseña ha sido restablecida con éxito! Ahora puedes iniciar sesión.');
            window.location.href = 'index.html';
        } else {
            alert('Error al restablecer: ' + datos.mensaje);
        }

    } catch (error) {
        console.error('Error de red:', error);
        alert('Error crítico: No se pudo contactar al servidor.');
    }
});
