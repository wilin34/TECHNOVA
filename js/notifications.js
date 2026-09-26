// ============================================
// NOTIFICACIONES CON EMAILJS
// ============================================

function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.warn('⚠️ EmailJS SDK no cargado');
        return false;
    }
    try {
        const publicKey = window.APP_CONFIG?.EMAILJS?.PUBLIC_KEY;
        if (!publicKey) {
            console.warn('⚠️ EmailJS Public Key no configurada');
            return false;
        }
        emailjs.init(publicKey);
        console.log('✅ EmailJS inicializado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
        return false;
    }
}

async function sendEmailToAdmin(data) {
    try {
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            from_phone: data.phone || 'No proporcionado',
            from_company: data.company || 'No proporcionada',
            service: data.service,
            budget: data.budget || 'Por definir',
            message: data.message,
            date: new Date().toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' }),
            to_email: window.APP_CONFIG.ADMIN.email,
            to_name: 'TechNova Solutions',
            reply_to: data.email,
            social_x: window.APP_CONFIG.SOCIAL.x,
            social_linkedin: window.APP_CONFIG.SOCIAL.linkedin,
            social_github: window.APP_CONFIG.SOCIAL.github,
            social_instagram: window.APP_CONFIG.SOCIAL.instagram
        };
        
        console.log('📧 [ADMIN] Enviando a:', window.APP_CONFIG.ADMIN.email);
        console.log('📧 [ADMIN] Template:', window.APP_CONFIG.EMAILJS.TEMPLATE_ADMIN);
        
        const response = await emailjs.send(
            window.APP_CONFIG.EMAILJS.SERVICE_ID,
            window.APP_CONFIG.EMAILJS.TEMPLATE_ADMIN,
            templateParams
        );
        
        console.log('✅ Email admin enviado:', response.status, response.text);
        return { success: true, response };
        
    } catch (error) {
        console.error('❌ Error email admin:', error);
        return { success: false, error };
    }
}

async function sendEmailToClient(data) {
    try {
        const templateParams = {
            to_name: data.name,
            to_email: data.email,
            from_name: 'TechNova Solutions',
            from_email: window.APP_CONFIG.ADMIN.email,
            service: data.service,
            budget: data.budget || 'Por definir',
            message: data.message,
            date: new Date().toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' }),
            reply_to: window.APP_CONFIG.ADMIN.email,
            phone: window.APP_CONFIG.ADMIN.phone,
            social_x: window.APP_CONFIG.SOCIAL.x,
            social_linkedin: window.APP_CONFIG.SOCIAL.linkedin,
            social_github: window.APP_CONFIG.SOCIAL.github,
            social_instagram: window.APP_CONFIG.SOCIAL.instagram
        };
        
        console.log('📧 [CLIENTE] Enviando a:', data.email);
        console.log('📧 [CLIENTE] Template:', window.APP_CONFIG.EMAILJS.TEMPLATE_CLIENTE);
        
        const response = await emailjs.send(
            window.APP_CONFIG.EMAILJS.SERVICE_ID,
            window.APP_CONFIG.EMAILJS.TEMPLATE_CLIENTE,
            templateParams
        );
        
        console.log('✅ Email cliente enviado:', response.status, response.text);
        return { success: true, response };
        
    } catch (error) {
        console.error('❌ Error email cliente:', error);
        return { success: false, error };
    }
}

async function sendWhatsAppToAdmin(data) {
    const CALLMEBOT_APIKEY = 'TU_APIKEY_AQUI';
    
    if (!CALLMEBOT_APIKEY || CALLMEBOT_APIKEY === 'TU_APIKEY_AQUI') {
        console.log('ℹ️ CallMeBot no configurado - saltando WhatsApp');
        return { success: false, message: 'No configurado' };
    }
    
    const message = `
🚀 *NUEVA SOLICITUD - TechNova Solutions*

👤 *Cliente:* ${data.name}
📧 *Email:* ${data.email}
📱 *Teléfono:* ${data.phone || 'N/A'}
🏢 *Empresa:* ${data.company || 'N/A'}

💼 *Servicio:* ${data.service}
💰 *Presupuesto:* ${data.budget || 'Por definir'}

📝 *Mensaje:*
"${data.message}"

⏰ ${new Date().toLocaleString('es-CO')}
`;
    
    try {
        const encodedMsg = encodeURIComponent(message);
        await fetch(
            `https://api.callmebot.com/whatsapp.php?phone=${window.APP_CONFIG.ADMIN.whatsapp}&text=${encodedMsg}&apikey=${CALLMEBOT_APIKEY}`,
            { mode: 'no-cors' }
        );
        console.log('✅ WhatsApp admin enviado');
        return { success: true };
    } catch (error) {
        console.error('❌ Error WhatsApp:', error);
        return { success: false, error };
    }
}

async function sendAllNotifications(data) {
    console.log('📤 Enviando todas las notificaciones...');
    
    const [adminResult, clientResult, whatsappResult] = await Promise.all([
        sendEmailToAdmin(data),
        sendEmailToClient(data),
        sendWhatsAppToAdmin(data)
    ]);
    
    console.log('📊 RESULTADOS:');
    console.log('  📧 Email admin:', adminResult.success ? '✅' : '❌');
    console.log('  📧 Email cliente:', clientResult.success ? '✅' : '❌');
    console.log('  📱 WhatsApp:', whatsappResult.success ? '✅' : '⚠️');
    
    // 🔥 Si el email al cliente falla, mostrar alert al usuario
    if (!clientResult.success) {
        console.warn('⚠️ No se pudo enviar la confirmación al cliente. Revisa EmailJS.');
    }
    
    return {
        emailAdmin: adminResult.success,
        emailClient: clientResult.success,
        whatsapp: whatsappResult.success
    };
}

window.initEmailJS = initEmailJS;
window.sendAllNotifications = sendAllNotifications;
window.sendEmailToAdmin = sendEmailToAdmin;
window.sendEmailToClient = sendEmailToClient;