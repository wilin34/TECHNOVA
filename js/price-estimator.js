// ============================================
// ESTIMADOR DE PRECIOS CON IA
// ============================================

const PRICE_ESTIMATOR_PROMPT = `Eres un experto en presupuestos de servicios tecnológicos de "TechNova Solutions". 
Tu tarea es dar un estimado REALISTA de precio basándote en la información del cliente.

Considera:
- El servicio solicitado
- El presupuesto mencionado
- El tamaño/complejidad descrito
- El plazo si lo menciona

Devuelve SIEMPRE un JSON con este formato exacto:
{
    "rangeMin": 1500,
    "rangeMax": 5000,
    "currency": "USD",
    "complejidad": "Media",
    "duracion": "4-8 semanas",
    "recomendacion": "texto breve de 1-2 frases",
    "factores": ["factor1", "factor2", "factor3"]
}

NO incluyas texto adicional. Solo el JSON.`;

async function estimatePrice(service, budget, message) {
    const API_KEY = window.getGroqKey ? window.getGroqKey() : '';
    
    if (!API_KEY || API_KEY === 'gsk_PEGA_TU_CLAVE_AQUI') {
        return getLocalEstimate(service);
    }
    
    try {
        const response = await fetch(window.APP_CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: window.getGroqModel ? window.getGroqModel() : window.APP_CONFIG.GROQ_MODEL,
                messages: [
                    { role: 'system', content: PRICE_ESTIMATOR_PROMPT },
                    { role: 'user', content: `Servicio: ${service}\nPresupuesto del cliente: ${budget || 'No especificado'}\nDescripción: ${message}` }
                ],
                temperature: 0.3,
                max_tokens: 400,
                response_format: { type: "json_object" }
            })
        });
        
        const data = await response.json();
        let text = data.choices[0].message.content.trim();
        
        if (text.startsWith('```')) {
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        }
        
        return JSON.parse(text);
        
    } catch (error) {
        console.error('❌ Error estimador:', error);
        return getLocalEstimate(service);
    }
}

function getLocalEstimate(service) {
    const estimates = {
        'Desarrollo Web': { rangeMin: 800, rangeMax: 15000, complejidad: 'Variable', duracion: '3-8 semanas' },
        'Apps Móviles': { rangeMin: 3000, rangeMax: 40000, complejidad: 'Alta', duracion: '6-16 semanas' },
        'Software a Medida': { rangeMin: 5000, rangeMax: 60000, complejidad: 'Alta', duracion: '2-6 meses' },
        'Computación en la Nube': { rangeMin: 1500, rangeMax: 50000, complejidad: 'Media', duracion: '2-12 semanas' },
        'Ciberseguridad': { rangeMin: 2500, rangeMax: 40000, complejidad: 'Alta', duracion: '3-12 semanas' },
        'Inteligencia Artificial': { rangeMin: 3000, rangeMax: 80000, complejidad: 'Muy Alta', duracion: '4-16 semanas' },
        'Chatbots': { rangeMin: 1500, rangeMax: 30000, complejidad: 'Media', duracion: '3-10 semanas' },
        'SEO': { rangeMin: 500, rangeMax: 5000, complejidad: 'Media', duracion: 'Mensual' },
        'Diseño UX/UI': { rangeMin: 1500, rangeMax: 20000, complejidad: 'Media', duracion: '3-10 semanas' },
        'Videojuegos': { rangeMin: 5000, rangeMax: 100000, complejidad: 'Muy Alta', duracion: '3-12 meses' }
    };
    
    const est = estimates[service] || { rangeMin: 1000, rangeMax: 20000, complejidad: 'Variable', duracion: 'A definir' };
    
    return {
        ...est,
        currency: 'USD',
        recomendacion: 'Un asesor se pondrá en contacto para darte un presupuesto exacto según tus necesidades específicas.',
        factores: ['Alcance del proyecto', 'Complejidad técnica', 'Plazos de entrega']
    };
}

function renderPriceEstimator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <button type="button" id="estimate-btn" class="btn-secondary" style="width:100%;">
            <i class="fas fa-calculator"></i> Estimar Precio con IA
        </button>
        <div id="estimate-result" class="estimate-result hidden"></div>
    `;
    
    document.getElementById('estimate-btn').addEventListener('click', async () => {
        const service = document.getElementById('service-type')?.value;
        const budget = document.getElementById('budget')?.value;
        const message = document.getElementById('message')?.value;
        
        if (!service || !message) {
            alert('Por favor completa el servicio y el mensaje primero');
            return;
        }
        
        const btn = document.getElementById('estimate-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analizando con IA...';
        btn.disabled = true;
        
        const estimate = await estimatePrice(service, budget, message);
        
        const resultDiv = document.getElementById('estimate-result');
        resultDiv.innerHTML = `
            <div class="estimate-header">
                <i class="fas fa-chart-line"></i>
                <h4>Estimación Preliminar</h4>
            </div>
            <div class="estimate-price">
                <span>$${estimate.rangeMin.toLocaleString()}</span>
                <small>a</small>
                <span>$${estimate.rangeMax.toLocaleString()}</span>
                <small>${estimate.currency}</small>
            </div>
            <div class="estimate-details">
                <div><strong>Complejidad:</strong> ${estimate.complejidad}</div>
                <div><strong>Duración:</strong> ${estimate.duracion}</div>
            </div>
            <div class="estimate-factors">
                <strong>Factores clave:</strong>
                <ul>
                    ${estimate.factores.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <p class="estimate-recommendation">
                <i class="fas fa-lightbulb"></i> ${estimate.recomendacion}
            </p>
            <p class="estimate-note">
                * Estimación aproximada. El precio final puede variar.
            </p>
        `;
        resultDiv.classList.remove('hidden');
        
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

window.estimatePrice = estimatePrice;
window.renderPriceEstimator = renderPriceEstimator;