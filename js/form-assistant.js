// ============================================
// ASISTENTE IA DENTRO DEL FORMULARIO
// ============================================

const ASSISTANT_SYSTEM_PROMPT = `Eres un asistente de TechNova Solutions que ayuda a los clientes a definir mejor su proyecto.
Tu trabajo es hacer preguntas para entender:
1. Qué quieren lograr
2. Para quién es (público)
3. Características clave
4. Plazo esperado
5. Presupuesto aproximado

Haz UNA pregunta a la vez, de forma amigable y breve. Después de 3-4 intercambios, genera un resumen estructurado del proyecto.

Cuando tengas suficiente info, devuelve un resumen con este formato EXACTO:
---RESUMEN---
**Objetivo:** [descripción]
**Público:** [descripción]
**Características:** [lista]
**Plazo:** [estimado]
**Presupuesto:** [rango]
---FIN---

Siempre en español.`;

let assistantHistory = [];
let assistantStep = 0;

function initFormAssistant() {
    const container = document.getElementById('form-assistant-container');
    if (!container) return;
    
    container.innerHTML = `
        <button type="button" id="assistant-btn" class="btn-secondary" style="width:100%;">
            <i class="fas fa-magic"></i> Ayúdame a definir mi idea con IA
        </button>
        <div id="assistant-panel" class="assistant-panel hidden">
            <div class="assistant-header">
                <div>
                    <i class="fas fa-robot"></i>
                    <strong>Asistente IA</strong>
                    <span>Definamos juntos tu proyecto</span>
                </div>
                <button type="button" id="assistant-close" class="assistant-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="assistant-messages" class="assistant-messages"></div>
            <div class="assistant-input-area">
                <input type="text" id="assistant-input" placeholder="Escribe tu respuesta...">
                <button type="button" id="assistant-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('assistant-btn').addEventListener('click', openAssistant);
    document.getElementById('assistant-close').addEventListener('click', closeAssistant);
    document.getElementById('assistant-send').addEventListener('click', sendAssistantMessage);
    document.getElementById('assistant-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAssistantMessage();
    });
}

function openAssistant() {
    const panel = document.getElementById('assistant-panel');
    panel.classList.remove('hidden');
    
    if (assistantHistory.length === 0) {
        const service = document.getElementById('service-type')?.value || 'un servicio tecnológico';
        const initialMsg = `¡Hola! 👋 Soy tu asistente IA. Voy a hacerte unas preguntas rápidas para entender mejor tu proyecto de "${service}" y así ayudarte a definir tu idea. 
        
        <br><br>Para empezar: <strong>¿Qué te gustaría lograr con este proyecto?</strong>`;
        
        addAssistantMessage('bot', initialMsg);
        assistantHistory.push({ role: 'assistant', content: `El usuario quiere: ${service}. Empecemos.` });
    }
    
    setTimeout(() => document.getElementById('assistant-input')?.focus(), 300);
}

function closeAssistant() {
    document.getElementById('assistant-panel').classList.add('hidden');
}

async function sendAssistantMessage() {
    const input = document.getElementById('assistant-input');
    const message = input.value.trim();
    if (!message) return;
    
    addAssistantMessage('user', message);
    assistantHistory.push({ role: 'user', content: message });
    input.value = '';
    
    const typingId = addAssistantTyping();
    const response = await getAssistantResponse();
    document.getElementById(typingId)?.remove();
    
    if (response && response.includes('---RESUMEN---')) {
        const match = response.match(/---RESUMEN---([\s\S]*?)---FIN---/);
        if (match) {
            const summary = match[1].trim();
            const messageField = document.getElementById('message');
            const currentText = messageField.value.trim();
            const finalText = currentText 
                ? `${currentText}\n\n📋 RESUMEN GENERADO POR IA:\n${summary.replace(/\*\*/g, '')}`
                : `📋 RESUMEN GENERADO POR IA:\n${summary.replace(/\*\*/g, '')}`;
            
            messageField.value = finalText;
            
            addAssistantMessage('bot', '✅ ¡Perfecto! He añadido el resumen a tu descripción del proyecto. Puedes seguir editándolo o cerrar este asistente y enviar tu solicitud.');
            
            setTimeout(() => {
                messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                messageField.style.borderColor = '#00E6FF';
                messageField.style.boxShadow = '0 0 20px rgba(0, 230, 255, 0.6)';
                setTimeout(() => {
                    messageField.style.borderColor = '';
                    messageField.style.boxShadow = '';
                }, 3000);
            }, 500);
            
            return;
        }
    }
    
    addAssistantMessage('bot', response);
    assistantHistory.push({ role: 'assistant', content: response });
}

function addAssistantMessage(type, text) {
    const messages = document.getElementById('assistant-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `assistant-message ${type}`;
    msgDiv.innerHTML = `<div class="assistant-msg-content">${text}</div>`;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function addAssistantTyping() {
    const messages = document.getElementById('assistant-messages');
    const id = 'assistant-typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = 'assistant-message bot';
    msgDiv.innerHTML = `<div class="assistant-msg-content typing"><span></span><span></span><span></span></div>`;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
    return id;
}

async function getAssistantResponse() {
    const API_KEY = window.getGroqKey ? window.getGroqKey() : '';
    
    if (!API_KEY || API_KEY === 'gsk_PEGA_TU_CLAVE_AQUI') {
        await new Promise(r => setTimeout(r, 800));
        return getAssistantFallback();
    }
    
    try {
        console.log('🤖 Asistente enviando consulta...');
        
        const response = await fetch(window.APP_CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: window.getGroqModel ? window.getGroqModel() : window.APP_CONFIG.GROQ_MODEL,
                messages: [
                    { role: 'system', content: ASSISTANT_SYSTEM_PROMPT },
                    ...assistantHistory
                ],
                temperature: 0.7,
                max_tokens: 400
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Error del asistente:', errorData);
            throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Desconocido'}`);
        }
        
        const data = await response.json();
        
        // 🔥 FIX: Verificar que la respuesta sea válida
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('❌ Respuesta inválida de Groq:', data);
            return getAssistantFallback();
        }
        
        console.log('✅ Respuesta del asistente recibida');
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('❌ Error asistente:', error);
        return getAssistantFallback();
    }
}

function getAssistantFallback() {
    assistantStep++;
    const fallbacks = [
        '¡Genial! 👏 Ahora cuéntame: <strong>¿Para quién es este proyecto?</strong> (usuarios, empresas, público general...)',
        'Perfecto. <strong>¿Qué características clave necesitas?</strong> (login, pagos, chat, dashboard, etc.)',
        'Excelente. <strong>¿En qué plazo te gustaría tenerlo listo?</strong> (semanas, meses...)',
        'Última pregunta: <strong>¿Cuál es tu presupuesto aproximado?</strong> (para ajustar la solución)',
        `<strong>✅ ¡Listo!</strong> Con esta información, te recomiendo:<br><br>
        ---RESUMEN---
        Objetivo: Proyecto tecnológico personalizado
        Público: Por definir con más detalle
        Características: A definir según alcance
        Plazo: Por confirmar
        Presupuesto: A convenir
        ---FIN---
        
        He añadido este resumen a tu descripción.`
    ];
    
    return fallbacks[Math.min(assistantStep - 1, fallbacks.length - 1)];
}

document.addEventListener('DOMContentLoaded', initFormAssistant);

window.initFormAssistant = initFormAssistant;