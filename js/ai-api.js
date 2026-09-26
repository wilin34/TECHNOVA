// ============================================
// INTEGRACIÓN CON GROQ API
// ============================================
const API_KEY = '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'; // ← Reemplaza con tu clave
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

async function getAIResponse(name, service, message) {
    if (API_KEY === 'gsk_PEGA_TU_CLAVE_AQUI' || API_KEY.trim() === '') {
        console.warn('⚠️ Modo demo activo');
        await new Promise(resolve => setTimeout(resolve, 1500));
        return `Hola ${name}, hemos recibido tu solicitud sobre "${service}". Nuestro equipo de expertos analizará tu proyecto y te contactará en menos de 24 horas con una propuesta personalizada. En TechNova Solutions estamos listos para llevar tu empresa al siguiente nivel tecnológico. ¡Gracias por confiar en nosotros!`;
    }

    const systemPrompt = `Eres un asistente virtual experto de "TechNova Solutions", una agencia de consultoría tecnológica integral que ofrece servicios de: Desarrollo Web, Apps Móviles, Software a Medida, Computación en la Nube, DevOps, Ciberseguridad, Inteligencia Artificial, Machine Learning, Big Data, Business Intelligence, Diseño UX/UI, Marketing Digital, SEO, Blockchain, IoT, Realidad Virtual/Aumentada, Videojuegos, Consultoría Tecnológica y más.

Tu trabajo es responder a clientes potenciales de forma:
- Profesional y cercana
- Breve (máximo 90 palabras)
- Entusiasta y persuasiva
- Con un tono futurista y tecnológico

Debes:
1. Saludar al cliente por su nombre
2. Confirmar que entendiste su necesidad específica
3. Mencionar un beneficio concreto del servicio solicitado
4. Indicar que un experto humano lo contactará en menos de 24 horas
5. Cerrar con una frase motivadora sobre innovación y futuro

Responde SIEMPRE en español.`;

    const userPrompt = `Cliente: ${name}
Servicio de interés: ${service}
Mensaje: "${message}"`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 250
            })
        });

        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('❌ Error IA:', error);
        return `Hola ${name}, hemos recibido tu solicitud sobre "${service}". En este momento nuestro sistema de IA está en mantenimiento, pero un experto humano te contactará personalmente en menos de 24 horas. ¡Gracias por tu paciencia!`;
    }
}