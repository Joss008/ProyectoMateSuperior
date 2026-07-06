document.getElementById('formularioRecuperar').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const emailInput = document.getElementById('email').value;

    try {
        const respuesta = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                correo: emailInput
            })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert(datos.mensaje + '\n\n(Nota para desarrollo: Revisa la consola del servidor Node.js para ver el enlace simulado)');
            window.location.href = 'index.html';
        } else {
            alert('Error: ' + datos.mensaje);
        }

    } catch (error) {
        console.error('Error de red:', error);
        alert('Error crítico: No se pudo contactar al servidor.');
    }
});
