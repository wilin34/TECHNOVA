// ============================================
// INTEGRACIÓN CON GROQ API
// ============================================

function getGroqKey() {
    return window.APP_CONFIG?.GROQ_API_KEY || '';
}

async function getAIResponse(name, service, message) {
    const API_KEY = getGroqKey();
    
    if (!API_KEY || API_KEY === 'gsk_PEGA_TU_CLAVE_AQUI') {
        console.warn('⚠️ Modo demo - configura tu API Key de Groq en js/config.js');
        await new Promise(r => setTimeout(r, 1500));
        return `Hola ${name}, hemos recibido tu solicitud sobre "${service}". Nuestro equipo de expertos analizará tu proyecto y te contactará en menos de 24 horas. ¡Gracias por confiar en TechNova Solutions!`;
    }

    const systemPrompt = `Eres un asistente virtual experto de "TechNova Solutions", una agencia de consultoría tecnológica integral.
Tu trabajo es responder a clientes potenciales de forma profesional, cercana, breve (máximo 90 palabras), entusiasta y con tono futurista.
Saluda al cliente por su nombre, confirma su necesidad, menciona un beneficio, indica que un experto lo contactará en menos de 24h, y cierra con una frase motivadora.
Responde SIEMPRE en español.`;

    const userPrompt = `Cliente: ${name}\nServicio: ${service}\nMensaje: "${message}"`;

    try {
        const response = a// ============================================
// INTEGRACIÓN CON GROQ API
// ============================================

function getGroqKey() {
    return window.APP_CONFIG?.GROQ_API_KEY || '';
}

function getGroqModel() {
    return window.APP_CONFIG?.GROQ_MODEL || 'llama-3.1-8b-instant';
}

async function getAIResponse(name, service, message) {
    const API_KEY = getGroqKey();
    
    if (!API_KEY || API_KEY === 'gsk_PEGA_TU_CLAVE_AQUI') {
        console.warn('⚠️ Modo demo - configura tu API Key de Groq en js/config.js');
        await new Promise(r => setTimeout(r, 1500));
        return `Hola ${name}, hemos recibido tu solicitud sobre "${service}". Nuestro equipo de expertos analizará tu proyecto y te contactará en menos de 24 horas. ¡Gracias por confiar en TechNova Solutions!`;
    }

    const systemPrompt = `Eres un asistente virtual experto de "TechNova Solutions", una agencia de consultoría tecnológica integral.
Tu trabajo es responder a clientes potenciales de forma profesional, cercana, breve (máximo 90 palabras), entusiasta y con tono futurista.
Saluda al cliente por su nombre, confirma su necesidad, menciona un beneficio, indica que un experto lo contactará en menos de 24h, y cierra con una frase motivadora.
Responde SIEMPRE en español.`;

    const userPrompt = `Cliente: ${name}\nServicio: ${service}\nMensaje: "${message}"`;

    try {
        console.log('🤖 Generando respuesta IA con modelo:', getGroqModel());
        
        const response = await fetch(window.APP_CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: getGroqModel(),
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 250
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Error de Groq:', errorData);
            throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Desconocido'}`);
        }
        
        const data = await response.json();
        console.log('✅ Respuesta IA generada');
        return data.choices[0].message.content;

    } catch (error) {
        console.error('❌ Error IA:', error);
        return `Hola ${name}, hemos recibido tu solicitud sobre "${service}". Un experto humano te contactará en menos de 24 horas. ¡Gracias por tu paciencia!`;
    }
}

window.getAIResponse = getAIResponse;
window.getGroqKey = getGroqKey;
window.getGroqModel = getGroqModel;wait fetch(window.APP_CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: window.APP_CONFIG.GROQ_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 250
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Desconocido'}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('❌ Error IA:', error);
        return `Hola ${name}, hemos recibido tu solicitud sobre "${service}". Un experto humano te contactará en menos de 24 horas. ¡Gracias por tu paciencia!`;
    }
}

window.getAIResponse = getAIResponse;
window.getGroqKey = getGroqKey;