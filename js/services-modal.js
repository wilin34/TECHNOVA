// ============================================
// MODAL DE SERVICIOS - Información detallada
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    createServicesModal();
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            const serviceId = card.dataset.serviceId || getIdFromCard(card);
            openServiceModal(serviceId);
        });
    });
});

function getIdFromCard(card) {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const map = {
        'desarrollo web': 'web', 'apps móviles': 'mobile', 'software a medida': 'software',
        'erp y crm': 'erp', 'apis y microservicios': 'apis', 'aplicaciones de escritorio': 'desktop',
        'computación en la nube': 'cloud', 'devops y ci/cd': 'devops', 'servidores y hosting': 'servers',
        'bases de datos': 'databases', 'contenedores': 'containers', 'cdn y redes': 'cdn',
        'ciberseguridad': 'cyber', 'pentesting': 'pentest', 'backup y recuperación': 'backup',
        'monitoreo 24/7': 'monitoring', 'protección de datos': 'gdpr', 'identidad y accesos': 'identity',
        'inteligencia artificial': 'ai', 'chatbots y asistentes': 'chatbots', 'big data': 'bigdata',
        'business intelligence': 'bi', 'automatización rpa': 'rpa', 'visión por computadora': 'vision',
        'seo': 'seo', 'publicidad digital': 'ads', 'redes sociales': 'social', 'email marketing': 'email',
        'analytics': 'analytics', 'content marketing': 'content',
        'diseño ux/ui': 'uxui', 'branding': 'branding', 'diseño gráfico': 'graphic',
        'motion graphics': 'motion', 'modelado 3d': '3d', 'prototipado': 'prototype',
        'consultoría tecnológica': 'consulting', 'soporte técnico': 'support',
        'mantenimiento': 'maintenance', 'auditoría de software': 'audit',
        'capacitación': 'training', 'transformación digital': 'transformation',
        'videojuegos': 'games', 'vr / ar': 'vr', 'blockchain y web3': 'blockchain',
        'iot': 'iot', 'impresión 3d': 'print3d'
    };
    return map[title] || card.id || 'custom';
}

function createServicesModal() {
    if (document.getElementById('service-modal')) return;
    
    const modalHTML = `
        <div id="service-modal" class="service-modal">
            <div class="service-modal-overlay"></div>
            <div class="service-modal-content">
                <button class="service-modal-close" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
                <div class="service-modal-body" id="service-modal-body"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('service-modal');
    modal.querySelector('.service-modal-overlay').addEventListener('click', closeServiceModal);
    modal.querySelector('.service-modal-close').addEventListener('click', closeServiceModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeServiceModal();
        }
    });
}

function openServiceModal(serviceId) {
    const data = window.SERVICES_DATA?.[serviceId];
    if (!data) {
        console.warn('⚠️ Servicio no encontrado:', serviceId);
        return;
    }
    
    const modal = document.getElementById('service-modal');
    const body = document.getElementById('service-modal-body');
    
    body.innerHTML = `
        <div class="service-modal-header">
            <div class="service-modal-icon">
                <i class="${data.icon}"></i>
            </div>
            <span class="service-modal-category">${data.category}</span>
            <h2>${data.title}</h2>
            <p class="service-modal-desc">${data.description}</p>
        </div>
        
        <div class="service-modal-info">
            <div class="service-modal-info-grid">
                <div class="service-info-item">
                    <i class="fas fa-dollar-sign"></i>
                    <div>
                        <span>Rango de precio</span>
                        <strong>${data.priceRange}</strong>
                    </div>
                </div>
                <div class="service-info-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <span>Tiempo de entrega</span>
                        <strong>${data.deliveryTime}</strong>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="service-modal-section">
            <h3><i class="fas fa-check-circle"></i> ¿Qué incluye?</h3>
            <ul class="service-features">
                ${data.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
        </div>
        
        <div class="service-modal-section">
            <h3><i class="fas fa-microchip"></i> Tecnologías</h3>
            <div class="service-tech-tags">
                ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
        </div>
        
        <div class="service-modal-actions">
            <a href="contacto.html?servicio=${encodeURIComponent(data.title)}" class="btn-primary btn-large">
                <i class="fas fa-paper-plane"></i> Solicitar Cotización
            </a>
            <button class="btn-secondary btn-large" onclick="closeServiceModal()">
                <i class="fas fa-arrow-left"></i> Seguir Explorando
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;