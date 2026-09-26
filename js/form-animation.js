// ============================================
// FORM ANIMATION + NOTIFICACIONES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initEmailJS === 'function') {
        initEmailJS();
    }
    
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const letterAnimation = document.getElementById('letter-animation');
    const successModal = document.getElementById('success-modal');
    const aiText = document.getElementById('ai-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        submitBtn.disabled = true;

        const data = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone')?.value.trim() || '',
            company: document.getElementById('company')?.value.trim() || '',
            service: document.getElementById('service-type').value,
            budget: document.getElementById('budget')?.value || '',
            message: document.getElementById('message').value.trim()
        };

        let notifResults = { emailAdmin: false, emailClient: false, whatsapp: false };
        let aiResponse = '';

        // ============================================
        // PASO 1: ENVIAR NOTIFICACIONES (crítico)
        // ============================================
        try {
            console.log('📤 Enviando notificaciones...');
            notifResults = await window.sendAllNotifications(data);
            console.log('📊 Resultados:', notifResults);
        } catch (error) {
            console.error('❌ Error en notificaciones:', error);
        }

        // ============================================
        // PASO 2: GENERAR RESPUESTA IA (opcional)
        // ============================================
        try {
            console.log('🤖 Generando respuesta IA...');
            if (typeof getAIResponse === 'function') {
                aiResponse = await getAIResponse(data.name, data.service, data.message);
            } else {
                console.warn('⚠️ getAIResponse no está definida, usando fallback');
                aiResponse = `Hola ${data.name}, hemos recibido tu solicitud sobre "${data.service}". Nuestro equipo te contactará en menos de 24 horas. ¡Gracias por confiar en TechNova Solutions!`;
            }
        } catch (error) {
            console.error('⚠️ Error IA (no crítico):', error);
            aiResponse = `Hola ${data.name}, hemos recibido tu solicitud sobre "${data.service}". Un experto te contactará en menos de 24 horas. ¡Gracias por tu paciencia!`;
        }

        // ============================================
        // PASO 3: VERIFICAR SI AL MENOS UN EMAIL SE ENVIÓ
        // ============================================
        const emailExitoso = notifResults.emailAdmin || notifResults.emailClient;
        
        if (!emailExitoso) {
            // Solo mostrar error si NINGÚN email se envió
            console.error('❌ Ningún email se pudo enviar');
            alert('Hubo un problema al enviar tu solicitud. Por favor contáctanos directamente:\n📧 xxxpurga@gmail.com\n📱 +57 317 498 0521');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        // ============================================
        // PASO 4: ANIMACIÓN DE CARTA (siempre se ejecuta)
        // ============================================
        try {
            letterAnimation.classList.remove('hidden');
            setTimeout(() => letterAnimation.classList.add('active'), 50);
            await new Promise(r => setTimeout(r, 1200));

            const envelope = letterAnimation.querySelector('.letter-envelope');
            envelope.classList.add('letter-flying');
            await new Promise(r => setTimeout(r, 1600));

            letterAnimation.classList.remove('active');
            setTimeout(() => {
                letterAnimation.classList.add('hidden');
                envelope.classList.remove('letter-flying');
            }, 400);
        } catch (error) {
            console.error('⚠️ Error en animación:', error);
            letterAnimation.classList.add('hidden');
        }

        // ============================================
        // PASO 5: MODAL DE ÉXITO
        // ============================================
        aiText.textContent = aiResponse;
        
        setTimeout(() => {
            successModal.classList.remove('hidden');
            setTimeout(() => successModal.classList.add('active'), 50);
        }, 300);

        // Reset
        form.reset();
        document.getElementById('estimate-result')?.classList.add('hidden');
        document.getElementById('assistant-panel')?.classList.add('hidden');
        assistantStep = 0;

        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});

window.closeSuccessModal = function() {
    const successModal = document.getElementById('success-modal');
    if (!successModal) return;
    successModal.classList.remove('active');
    setTimeout(() => successModal.classList.add('hidden'), 400);
};