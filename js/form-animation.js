// ============================================
// ANIMACIÓN DE ENVÍO DE CARTA + MODAL DE ÉXITO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const letterAnimation = document.getElementById('letter-animation');
    const successModal = document.getElementById('success-modal');
    const aiText = document.getElementById('ai-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Guardar texto original del botón
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        submitBtn.disabled = true;

        // Obtener datos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone')?.value.trim() || '';
        const company = document.getElementById('company')?.value.trim() || '';
        const service = document.getElementById('service-type').value;
        const budget = document.getElementById('budget')?.value || '';
        const message = document.getElementById('message').value.trim();

        try {
            // 1. Llamar a la IA
            const aiResponse = await getAIResponse(name, service, message);

            // 2. Mostrar animación de carta
            letterAnimation.classList.remove('hidden');
            setTimeout(() => letterAnimation.classList.add('active'), 50);

            // 3. Esperar a que la carta se abra
            await new Promise(resolve => setTimeout(resolve, 1200));

            // 4. Hacer volar la carta hacia la derecha
            const envelope = letterAnimation.querySelector('.letter-envelope');
            envelope.classList.add('letter-flying');

            // 5. Esperar a que termine el vuelo
            await new Promise(resolve => setTimeout(resolve, 1600));

            // 6. Ocultar animación
            letterAnimation.classList.remove('active');
            setTimeout(() => {
                letterAnimation.classList.add('hidden');
                envelope.classList.remove('letter-flying');
            }, 400);

            // 7. Mostrar modal de éxito
            aiText.textContent = aiResponse;
            setTimeout(() => {
                successModal.classList.remove('hidden');
                setTimeout(() => successModal.classList.add('active'), 50);
            }, 300);

            // 8. Resetear formulario
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar. Por favor intenta de nuevo.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

// Función global para cerrar el modal
window.closeSuccessModal = function() {
    const successModal = document.getElementById('success-modal');
    successModal.classList.remove('active');
    setTimeout(() => {
        successModal.classList.add('hidden');
    }, 400);
};