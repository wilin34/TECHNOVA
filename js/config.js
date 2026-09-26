// ============================================
// CONFIGURACIÓN GLOBAL - TECHVNOVA SOLUTIONS
// ============================================

window.APP_CONFIG = {
    // ========================================
    // GROQ API (https://console.groq.com/keys)
    // ========================================
    // 🔥 IMPORTANTE: Pega tu clave REAL aquí (empieza con gsk_)
    GROQ_API_KEY: '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', // ← CAMBIA ESTO
    
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    
    // 🔥 MODELO: Cambia según los disponibles en tu cuenta
    // Verifica con: https://console.groq.com/docs/models
    GROQ_MODEL: 'openai/gpt-oss-120b',
    
    // ========================================
    // EMAILJS
    // ========================================
    EMAILJS: {
        PUBLIC_KEY: 'DJ-LcXGYz6ipDLn9X',
        SERVICE_ID: 'service_wz3v4s9',
        TEMPLATE_ADMIN: 'template_jwb2arf',
        TEMPLATE_CLIENTE: 'template_83f3idd'
    },
    
    // ========================================
    // DATOS DEL ADMIN
    // ========================================
    ADMIN: {
        email: 'xxxpurga@gmail.com',
        whatsapp: '573174980521',
        phone: '+57 317 498 0521'
    },
    
    // ========================================
    // REDES SOCIALES
    // ========================================
    SOCIAL: {
        x: 'https://x.com/Alexander_rzxs',
        linkedin: 'https://www.linkedin.com/in/breiner-alexander-lb-41378b425',
        github: 'https://github.com/shh4x',
        instagram: 'https://instagram.com/alexande_rzzz'
    }
};

// ============================================
// VALIDACIÓN Y LOGS
// ============================================
(function() {
    const key = window.APP_CONFIG.GROQ_API_KEY;
    const isPlaceholder = key === 'gsk_PEGA_TU_CLAVE_AQUI' || !key || !key.startsWith('gsk_');
    
    console.log('%c⚙️ TechNova Config', 'color: #00E6FF; font-size: 16px; font-weight: bold;');
    
    if (isPlaceholder) {
        console.warn('%c⚠️ API Key de Groq NO configurada', 'color: #FF3B30; font-weight: bold;');
        console.warn('%c   → Ve a js/config.js y pega tu clave real', 'color: #FF3B30;');
        console.warn('%c   → Obtenla gratis en: https://console.groq.com/keys', 'color: #FF3B30;');
    } else {
        console.log('%c✅ API Key configurada: ' + key.substring(0, 12) + '...', 'color: #00E650;');
    }
    
    console.log('%c📊 Modelo:', 'color: #00E6FF;', window.APP_CONFIG.GROQ_MODEL);
    console.log('%c📧 EmailJS:', 'color: #00E6FF;', window.APP_CONFIG.EMAILJS.PUBLIC_KEY ? '✅' : '❌');
})();