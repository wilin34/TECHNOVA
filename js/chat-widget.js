// ============================================
// CHAT WIDGET FLOTANTE CON IA
// ============================================

const CHAT_SYSTEM_PROMPT = `Eres "Nova", el asistente virtual de TechNova Solutions. 
Eres amable, profesional, breve (máximo 60 palabras) y siempre respondes en español.

Servicios de TechNova: Desarrollo Web, Apps Móviles, Software a Medida, ERP/CRM, Cloud, DevOps, Servidores, Bases de Datos, Ciberseguridad, Pentesting, Backup, Monitoreo 24/7, Inteligencia Artificial, Chatbots, Big Data, Business Intelligence, RPA, Visión por Computadora, SEO, Publicidad Digital, Redes Sociales, Email Marketing, Diseño UX/UI, Branding, Motion Graphics, Consultoría, Soporte 24/7, Capacitación, Transformación Digital, Videojuegos, VR/AR, Blockchain, IoT e Impresión 3D.

Precios aproximados:
- SEO: desde $500 USD
- Desarrollo Web: $800 - $15,000 USD
- Apps Móviles: $3,000 - $40,000 USD
- IA/Chatbots: $1,500 - $80,000 USD
- Ciberseguridad: $2,500 - $40,000 USD

Ayudas a:
- Informar sobre servicios
- Dar estimaciones de precios
- Guiar al formulario de contacto
- Responder dudas

Usa emojis ocasionalmente. Nunca inventes info. Si no sabes algo, sugiere contactar al equipo.`;

let chatHistory = [];
let chatInitialized = false;

function createChatWidget() {
    if (chatInitialized || document.getElementById('chat-widget')) return;
    chatInitialized = true;
    
    const widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.innerHTML = `
        <button id="chat-toggle" class="chat-toggle" aria-label="Chat con IA">
            <i class="fas fa-comments"></i>
            <span class="chat-badge">IA</span>
        </button>
        
        <div id="chat-window" class="chat-window hidden">
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div>
                        <strong>Nova - Asistente IA</strong>
                        <span class="chat-status"><i class="fas fa-circle"></i> En línea</span>
                    </div>
                </div>
                <button id="chat-close" class="chat-close" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div id="chat-messages" class="chat-messages">
                <div class="chat-message bot">
                    <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
                    <div class="chat-message-content">
                        ¡Hola! 👋 Soy Nova, tu asistente IA de TechNova Solutions.
                        <br><br>
                        ¿En qué puedo ayudarte? Puedo darte info sobre servicios, precios o guiarte con tu proyecto.
                    </div>
                </div>
            </div>
            
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." autocomplete="off">
                <button id="chat-send" aria-label="Enviar">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    document.getElementById('chat-toggle').addEventListener('click', toggleChat);
    document.getElementById('chat-close').addEventListener('click', closeChat);
    document.getElementById('chat-send').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    
    console.log('💬 Chat widget inicializado');
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        setTimeout(() => document.getElementById('chat-input')?.focus(), 300);
    }
}

function closeChat() {
    document.getElementById('chat-window')?.classList.add('hidden');
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    
    addChatMessage('user', message);
    input.value = '';
    
    const typingId = addTypingIndicator();
    const response = await getChatResponse(message);
    document.getElementById(typingId)?.remove();
    
    addChatMessage('bot', response);
}

function addChatMessage(type, text) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${type}`;
    
    if (type === 'bot') {
        msgDiv.innerHTML = `
            <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
            <div class="chat-message-content">${text}</div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="chat-message-content">${text}</div>
            <div class="chat-message-avatar user"><i class="fas fa-user"></i></div>
        `;
    }
    
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function addTypingIndicator() {
    const messages = document.getElementById('chat-messages');
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = 'chat-message bot';
    msgDiv.innerHTML = `
        <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
        <div class="chat-message-content typing">
            <span></span><span></span><span></span>
        </div>
    `;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
    return id;
}

async function getChatResponse(userMessage) {
    const API_KEY = window.getGroqKey ? window.getGroqKey() : '';
    
    if (!API_KEY || API_KEY === 'gsk_PEGA_TU_CLAVE_AQUI') {
        console.warn('⚠️ Chat en modo demo (sin API Key)');
        await new Promise(r => setTimeout(r, 1000));
        return getFallbackResponse(userMessage);
    }
    
    chatHistory.push({ role: 'user', content: userMessage });
    
    try {
        console.log('🤖 Enviando mensaje al chat IA...');
        
        const response = await fetch(window.APP_CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: window.getGroqModel ? window.getGroqModel() : window.APP_CONFIG.GROQ_MODEL,
                messages: [
                    { role: 'system', content: CHAT_SYSTEM_PROMPT },
                    ...chatHistory.slice(-10)
                ],
                temperature: 0.7,
                max_tokens: 200
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Error del chat:', errorData);
            throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Desconocido'}`);
        }
        
        const data = await response.json();
        
        // 🔥 FIX: Verificar que la respuesta sea válida
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('❌ Respuesta inválida de Groq:', data);
            return getFallbackResponse(userMessage);
        }
        
        const botResponse = data.choices[0].message.content;
        chatHistory.push({ role: 'assistant', content: botResponse });
        console.log('✅ Respuesta IA recibida');
        return botResponse;
        
    } catch (error) {
        console.error('❌ Error chat IA:', error);
        return getFallbackResponse(userMessage);
    }
}

function getFallbackResponse(msg) {
    const lower = msg.toLowerCase();
    
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto')) {
        return 'Los precios varían según el servicio: SEO desde $500 USD, Web desde $800, Apps desde $3,000, IA desde $1,500. ¿Qué servicio te interesa? 💰';
    }
    if (lower.includes('web') || lower.includes('página') || lower.includes('sitio')) {
        return '¡Excelente! Desarrollo web desde $800 hasta $15,000 USD según complejidad. Incluye diseño responsive, SEO y hosting. 🚀';
    }
    if (lower.includes('app') || lower.includes('móvil')) {
        return 'Apps iOS/Android desde $3,000 USD con Flutter o React Native. ¿Tienes una idea? 📱';
    }
    if (lower.includes('ia') || lower.includes('inteligencia') || lower.includes('chatbot')) {
        return 'IA y chatbots desde $1,500 USD 🤖. ¿Qué necesitas automatizar?';
    }
    if (lower.includes('hola') || lower.includes('buenos') || lower.includes('hey')) {
        return '¡Hola! 👋 ¿En qué puedo ayudarte? Te puedo dar info sobre servicios, precios o guiarte al formulario.';
    }
    if (lower.includes('contacto') || lower.includes('asesor') || lower.includes('humano')) {
        return 'Perfecto 🙌. Ve a la sección Contacto y llena el formulario. Un experto te responderá en menos de 24h.';
        
    }
     if (lower.includes('gracias') || lower.includes('ok') || lower.includes('vale')) {
        return 'Estoy aca para ayudarte';
    }
    return 'Gracias 😊. ¿Qué servicio te interesa? También puedes contactarnos por WhatsApp o email.';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
} else {
    createChatWidget();
}

window.createChatWidget = createChatWidget;
window.openChat = function() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow?.classList.contains('hidden')) toggleChat();
};
