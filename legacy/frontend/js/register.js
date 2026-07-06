document.getElementById('formularioRegistro').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    if (passwordInput !== confirmPasswordInput) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    try {
        const respuesta = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                correo: emailInput, 
                password: passwordInput 
            })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
            window.location.href = 'index.html';
        } else {
            alert('Error al registrar: ' + datos.mensaje);
        }

    } catch (error) {
        console.error('Error de red:', error);
        alert('Error crítico: No se pudo contactar al servidor.');
    }
});
