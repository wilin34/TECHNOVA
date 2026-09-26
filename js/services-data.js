// ============================================
// BASE DE DATOS DE SERVICIOS - TECHVNOVA
// ============================================

const SERVICES_DATA = {
    // ========================================
    // DESARROLLO Y SOFTWARE
    // ========================================
    'web': {
        title: 'Desarrollo Web',
        icon: 'fas fa-globe',
        category: 'Desarrollo',
        description: 'Creamos sitios web corporativos, e-commerce, landing pages y aplicaciones web progresivas (PWA) que combinan diseño impactante con rendimiento excepcional.',
        features: [
            'Diseño responsive y mobile-first',
            'Optimización SEO desde el primer día',
            'Velocidad de carga menor a 2 segundos',
            'Panel de administración personalizado',
            'Integración con pasarelas de pago',
            'Hosting, dominio y SSL incluidos'
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Node.js', 'WordPress', 'Shopify'],
        priceRange: '$800 - $15,000 USD',
        deliveryTime: '3 - 8 semanas'
    },
    'mobile': {
        title: 'Apps Móviles',
        icon: 'fas fa-mobile-alt',
        category: 'Desarrollo',
        description: 'Desarrollamos aplicaciones nativas e híbridas para iOS y Android con Flutter, React Native y Swift, enfocadas en UX excepcional.',
        features: [
            'Publicación en App Store y Google Play',
            'Notificaciones push',
            'Modo offline',
            'Autenticación biométrica',
            'Analytics integrado',
            'Mantenimiento post-lanzamiento'
        ],
        tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
        priceRange: '$3,000 - $40,000 USD',
        deliveryTime: '6 - 16 semanas'
    },
    'software': {
        title: 'Software a Medida',
        icon: 'fas fa-laptop-code',
        category: 'Desarrollo',
        description: 'Sistemas personalizados que se adaptan exactamente a tus procesos de negocio, sin limitaciones de software genérico.',
        features: [
            'Análisis de procesos actuales',
            'Arquitectura escalable',
            'Integración con sistemas existentes',
            'Capacitación al equipo',
            'Documentación completa',
            'Soporte continuo'
        ],
        tech: ['Python', 'Java', '.NET', 'Node.js', 'PostgreSQL', 'MongoDB'],
        priceRange: '$5,000 - $60,000 USD',
        deliveryTime: '2 - 6 meses'
    },
    'erp': {
        title: 'ERP y CRM',
        icon: 'fas fa-building',
        category: 'Desarrollo',
        description: 'Implementación y desarrollo de sistemas de gestión empresarial (ERP) y relación con clientes (CRM) para automatizar toda tu operación.',
        features: [
            'Módulos de ventas, inventario y contabilidad',
            'Reportes ejecutivos en tiempo real',
            'Automatización de procesos',
            'Acceso multi-sucursal',
            'App móvil complementaria',
            'Integración con facturación electrónica'
        ],
        tech: ['Odoo', 'SAP', 'Salesforce', 'HubSpot', 'Zoho'],
        priceRange: '$8,000 - $100,000 USD',
        deliveryTime: '2 - 8 meses'
    },
    'apis': {
        title: 'APIs y Microservicios',
        icon: 'fas fa-plug',
        category: 'Desarrollo',
        description: 'Arquitecturas modernas y escalables para conectar todos tus sistemas con APIs RESTful y microservicios.',
        features: [
            'APIs REST y GraphQL',
            'Documentación con Swagger',
            'Autenticación JWT/OAuth',
            'Rate limiting y seguridad',
            'Escalabilidad horizontal',
            'Monitoreo y logs'
        ],
        tech: ['Node.js', 'Python FastAPI', 'GraphQL', 'Docker', 'Kubernetes'],
        priceRange: '$2,000 - $30,000 USD',
        deliveryTime: '3 - 10 semanas'
    },
    'desktop': {
        title: 'Aplicaciones de Escritorio',
        icon: 'fas fa-desktop',
        category: 'Desarrollo',
        description: 'Software nativo para Windows, macOS y Linux con alto rendimiento y acceso completo al hardware.',
        features: [
            'Instaladores multiplataforma',
            'Actualizaciones automáticas',
            'Modo offline',
            'Integración con el sistema operativo',
            'Alto rendimiento',
            'Bajo consumo de recursos'
        ],
        tech: ['Electron', 'C#', 'Qt', 'Rust', 'Go'],
        priceRange: '$3,000 - $25,000 USD',
        deliveryTime: '4 - 12 semanas'
    },

    // ========================================
    // INFRAESTRUCTURA Y CLOUD
    // ========================================
    'cloud': {
        title: 'Computación en la Nube',
        icon: 'fas fa-server',
        category: 'Cloud',
        description: 'Migración y gestión de infraestructura en AWS, Azure y Google Cloud Platform con la mejor relación costo-rendimiento.',
        features: [
            'Migración sin downtime',
            'Auto-escalado según demanda',
            'Backups automáticos',
            'Alta disponibilidad 99.99%',
            'Reducción de costos hasta 40%',
            'Monitoreo 24/7'
        ],
        tech: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
        priceRange: '$1,500 - $50,000 USD',
        deliveryTime: '2 - 12 semanas'
    },
    'devops': {
        title: 'DevOps y CI/CD',
        icon: 'fas fa-infinity',
        category: 'Cloud',
        description: 'Automatización de despliegues, integración continua y monitoreo para acelerar la entrega de software.',
        features: [
            'Pipelines de CI/CD',
            'Automatización de tests',
            'Deploy automático',
            'Rollback instantáneo',
            'Infraestructura como código',
            'Monitoreo proactivo'
        ],
        tech: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Docker', 'Kubernetes'],
        priceRange: '$2,000 - $35,000 USD',
        deliveryTime: '3 - 10 semanas'
    },
    'servers': {
        title: 'Servidores y Hosting',
        icon: 'fas fa-hdd',
        category: 'Cloud',
        description: 'Administración de servidores Linux/Windows y hosting optimizado con la mejor seguridad y rendimiento.',
        features: [
            'Configuración inicial',
            'Hardening de seguridad',
            'Backups diarios',
            'Monitoreo proactivo',
            'Soporte 24/7',
            'Migración gratuita'
        ],
        tech: ['Ubuntu', 'CentOS', 'Windows Server', 'Nginx', 'Apache'],
        priceRange: '$500 - $10,000 USD',
        deliveryTime: '1 - 4 semanas'
    },
    'databases': {
        title: 'Bases de Datos',
        icon: 'fas fa-database',
        category: 'Cloud',
        description: 'Diseño, optimización y administración de bases de datos SQL y NoSQL para máximo rendimiento.',
        features: [
            'Diseño de esquemas',
            'Optimización de queries',
            'Replicación y alta disponibilidad',
            'Backups automáticos',
            'Migración sin pérdida de datos',
            'Seguridad y encriptación'
        ],
        tech: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
        priceRange: '$1,000 - $20,000 USD',
        deliveryTime: '2 - 8 semanas'
    },
    'containers': {
        title: 'Contenedores y Kubernetes',
        icon: 'fab fa-docker',
        category: 'Cloud',
        description: 'Docker y Kubernetes para aplicaciones portables, escalables y fáciles de desplegar.',
        features: [
            'Containerización de apps',
            'Orquestación con Kubernetes',
            'Auto-scaling',
            'Service mesh',
            'Registros privados',
            'Monitoreo de contenedores'
        ],
        tech: ['Docker', 'Kubernetes', 'Helm', 'Istio', 'Prometheus'],
        priceRange: '$2,500 - $40,000 USD',
        deliveryTime: '3 - 12 semanas'
    },
    'cdn': {
        title: 'CDN y Redes',
        icon: 'fas fa-network-wired',
        category: 'Cloud',
        description: 'Distribución global de contenido y optimización de redes para máxima velocidad.',
        features: [
            'CDN global',
            'Optimización de imágenes',
            'Caché inteligente',
            'Compresión Gzip/Brotli',
            'Protección DDoS',
            'Balanceo de carga'
        ],
        tech: ['Cloudflare', 'CloudFront', 'Fastly', 'Akamai'],
        priceRange: '$500 - $15,000 USD',
        deliveryTime: '1 - 6 semanas'
    },

    // ========================================
    // CIBERSEGURIDAD
    // ========================================
    'cyber': {
        title: 'Ciberseguridad',
        icon: 'fas fa-user-shield',
        category: 'Seguridad',
        description: 'Protegemos tus datos y sistemas contra cualquier amenaza con auditorías, monitoreo y sistemas de defensa avanzada.',
        features: [
            'Auditoría de seguridad completa',
            'Análisis de vulnerabilidades',
            'Sistemas de detección de intrusos',
            'Encriptación de datos',
            'Capacitación al personal',
            'Plan de respuesta a incidentes'
        ],
        tech: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nessus', 'Burp Suite'],
        priceRange: '$2,500 - $40,000 USD',
        deliveryTime: '3 - 12 semanas'
    },
    'pentest': {
        title: 'Pentesting',
        icon: 'fas fa-bug',
        category: 'Seguridad',
        description: 'Pruebas de penetración y ethical hacking para encontrar vulnerabilidades antes que los atacantes.',
        features: [
            'Test de penetración web',
            'Test de penetración móvil',
            'Test de red interna',
            'Ingeniería social',
            'Reporte ejecutivo y técnico',
            'Re-test gratuito'
        ],
        tech: ['Burp Suite', 'OWASP ZAP', 'Nmap', 'Metasploit'],
        priceRange: '$1,500 - $25,000 USD',
        deliveryTime: '2 - 6 semanas'
    },
    'backup': {
        title: 'Backup y Recuperación',
        icon: 'fas fa-cloud-upload-alt',
        category: 'Seguridad',
        description: 'Sistemas de respaldo automáticos y planes de recuperación ante desastres para no perder nunca tu información.',
        features: [
            'Backups automáticos',
            'Almacenamiento redundante',
            'Recuperación granular',
            'Pruebas de restauración',
            'Encriptación AES-256',
            'Cumplimiento normativo'
        ],
        tech: ['Veeam', 'Acronis', 'AWS Backup', 'Backblaze'],
        priceRange: '$800 - $15,000 USD',
        deliveryTime: '1 - 6 semanas'
    },
    'monitoring': {
        title: 'Monitoreo 24/7',
        icon: 'fas fa-eye',
        category: 'Seguridad',
        description: 'Detección de intrusiones y respuesta ante incidentes en tiempo real, todos los días del año.',
        features: [
            'Monitoreo continuo 24/7',
            'Alertas en tiempo real',
            'Análisis de logs',
            'Respuesta ante incidentes',
            'Reportes mensuales',
            'Dashboard en vivo'
        ],
        tech: ['Datadog', 'Splunk', 'ELK Stack', 'Grafana'],
        priceRange: '$500 - $8,000 USD/mes',
        deliveryTime: '1 - 3 semanas'
    },
    'gdpr': {
        title: 'Protección de Datos',
        icon: 'fas fa-balance-scale',
        category: 'Seguridad',
        description: 'Cumplimiento GDPR, ISO 27001 y normativas de protección de datos para tu empresa.',
        features: [
            'Auditoría de cumplimiento',
            'Políticas de privacidad',
            'Consentimiento de usuarios',
            'Registro de tratamientos',
            'Capacitación al personal',
            'Asesoría legal continua'
        ],
        tech: ['GDPR', 'ISO 27001', 'LOPD', 'CCPA'],
        priceRange: '$1,500 - $20,000 USD',
        deliveryTime: '3 - 10 semanas'
    },
    'identity': {
        title: 'Identidad y Accesos',
        icon: 'fas fa-fingerprint',
        category: 'Seguridad',
        description: 'Sistemas IAM, autenticación biométrica y control de accesos para proteger tu información.',
        features: [
            'Single Sign-On (SSO)',
            'Autenticación multifactor',
            'Biometría',
            'Gestión de roles',
            'Auditoría de accesos',
            'Integración con AD/LDAP'
        ],
        tech: ['Okta', 'Auth0', 'Azure AD', 'Keycloak'],
        priceRange: '$2,000 - $30,000 USD',
        deliveryTime: '3 - 10 semanas'
    },

    // ========================================
    // IA Y DATOS
    // ========================================
    'ai': {
        title: 'Inteligencia Artificial',
        icon: 'fas fa-brain',
        category: 'IA y Datos',
        description: 'Modelos de machine learning personalizados para automatizar decisiones y descubrir insights ocultos en tus datos.',
        features: [
            'Modelos predictivos',
            'Procesamiento de lenguaje natural',
            'Computer vision',
            'Recomendadores inteligentes',
            'Integración con sistemas existentes',
            'Entrenamiento continuo'
        ],
        tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face'],
        priceRange: '$3,000 - $80,000 USD',
        deliveryTime: '4 - 16 semanas'
    },
    'chatbots': {
        title: 'Chatbots y Asistentes',
        icon: 'fas fa-comments',
        category: 'IA y Datos',
        description: 'Asistentes virtuales con IA para atención al cliente 24/7 que entienden el contexto y resuelven problemas reales.',
        features: [
            'Integración con WhatsApp, web y redes',
            'Entrenamiento con tu información',
            'Escalado a humano',
            'Multi-idioma',
            'Analytics de conversaciones',
            'Integración con CRM'
        ],
        tech: ['OpenAI GPT', 'Dialogflow', 'Rasa', 'LangChain'],
        priceRange: '$1,500 - $30,000 USD',
        deliveryTime: '3 - 10 semanas'
    },
    'bigdata': {
        title: 'Big Data',
        icon: 'fas fa-chart-bar',
        category: 'IA y Datos',
        description: 'Procesamiento y análisis de grandes volúmenes de datos para tomar mejores decisiones de negocio.',
        features: [
            'Pipelines de datos',
            'ETL automatizado',
            'Almacenamiento distribuido',
            'Análisis en tiempo real',
            'Visualizaciones interactivas',
            'Escalabilidad masiva'
        ],
        tech: ['Hadoop', 'Spark', 'Kafka', 'Snowflake', 'BigQuery'],
        priceRange: '$5,000 - $100,000 USD',
        deliveryTime: '6 - 20 semanas'
    },
    'bi': {
        title: 'Business Intelligence',
        icon: 'fas fa-chart-pie',
        category: 'IA y Datos',
        description: 'Dashboards interactivos y reportes ejecutivos en tiempo real para que tomes decisiones basadas en datos.',
        features: [
            'Dashboards personalizados',
            'Reportes automatizados',
            'KPIs en tiempo real',
            'Acceso multi-dispositivo',
            'Integración con múltiples fuentes',
            'Alertas inteligentes'
        ],
        tech: ['Power BI', 'Tableau', 'Looker', 'Metabase'],
        priceRange: '$2,000 - $35,000 USD',
        deliveryTime: '4 - 12 semanas'
    },
    'rpa': {
        title: 'Automatización RPA',
        icon: 'fas fa-robot',
        category: 'IA y Datos',
        description: 'Robots de software que automatizan tareas repetitivas para liberar a tu equipo de trabajo manual.',
        features: [
            'Identificación de tareas automatizables',
            'Bots personalizados',
            'Integración con sistemas legacy',
            'Monitoreo de bots',
            'Escalabilidad',
            'ROI medible'
        ],
        tech: ['UiPath', 'Automation Anywhere', 'Power Automate', 'Python'],
        priceRange: '$3,000 - $50,000 USD',
        deliveryTime: '4 - 14 semanas'
    },
    'vision': {
        title: 'Visión por Computadora',
        icon: 'fas fa-camera',
        category: 'IA y Datos',
        description: 'Reconocimiento facial, de objetos y análisis de imágenes para automatizar procesos visuales.',
        features: [
            'Detección de objetos',
            'Reconocimiento facial',
            'Análisis de video en vivo',
            'Control de calidad automatizado',
            'Conteo de personas',
            'Integración con cámaras IP'
        ],
        tech: ['OpenCV', 'YOLO', 'TensorFlow', 'PyTorch'],
        priceRange: '$4,000 - $60,000 USD',
        deliveryTime: '6 - 16 semanas'
    },

    // ========================================
    // MARKETING DIGITAL
    // ========================================
    'seo': {
        title: 'SEO y Posicionamiento',
        icon: 'fas fa-search',
        category: 'Marketing',
        description: 'Posicionamiento orgánico en Google y motores de búsqueda para atraer tráfico de calidad a tu web.',
        features: [
            'Auditoría SEO completa',
            'Investigación de keywords',
            'Optimización on-page',
            'Link building',
            'SEO técnico',
            'Reportes mensuales'
        ],
        tech: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog'],
        priceRange: '$500 - $5,000 USD/mes',
        deliveryTime: 'Mensual'
    },
    'ads': {
        title: 'Publicidad Digital',
        icon: 'fas fa-bullhorn',
        category: 'Marketing',
        description: 'Campañas en Google Ads, Meta Ads y otras plataformas con ROI medible y optimización continua.',
        features: [
            'Estrategia personalizada',
            'Creación de anuncios',
            'Segmentación avanzada',
            'A/B testing',
            'Optimización de conversiones',
            'Reportes de ROI'
        ],
        tech: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads'],
        priceRange: '$800 - $5,000 USD/mes + inversión',
        deliveryTime: 'Mensual'
    },
    'social': {
        title: 'Redes Sociales',
        icon: 'fas fa-share-alt',
        category: 'Marketing',
        description: 'Community management y estrategias de contenido para construir una comunidad sólida alrededor de tu marca.',
        features: [
            'Calendario de contenido',
            'Diseño de piezas gráficas',
            'Gestión de comentarios',
            'Campañas pagas',
            'Reportes de engagement',
            'Estrategia de influencers'
        ],
        tech: ['Meta Business', 'Hootsuite', 'Buffer', 'Canva'],
        priceRange: '$400 - $3,000 USD/mes',
        deliveryTime: 'Mensual'
    },
    'email': {
        title: 'Email Marketing',
        icon: 'fas fa-envelope',
        category: 'Marketing',
        description: 'Campañas automatizadas y segmentación inteligente para mantener a tus clientes conectados.',
        features: [
            'Diseño de plantillas',
            'Automatizaciones',
            'Segmentación avanzada',
            'A/B testing',
            'Métricas detalladas',
            'Integración con CRM'
        ],
        tech: ['Mailchimp', 'SendGrid', 'ActiveCampaign', 'Brevo'],
        priceRange: '$300 - $2,500 USD/mes',
        deliveryTime: 'Mensual'
    },
    'analytics': {
        title: 'Analytics y Tracking',
        icon: 'fas fa-chart-area',
        category: 'Marketing',
        description: 'Google Analytics, tracking y medición de resultados para optimizar tus estrategias digitales.',
        features: [
            'Configuración de GA4',
            'Eventos personalizados',
            'Conversion tracking',
            'Dashboards personalizados',
            'Reportes automáticos',
            'Atribución multicanal'
        ],
        tech: ['Google Analytics', 'GTM', 'Mixpanel', 'Hotjar'],
        priceRange: '$500 - $5,000 USD',
        deliveryTime: '2 - 6 semanas'
    },
    'content': {
        title: 'Content Marketing',
        icon: 'fas fa-pen-fancy',
        category: 'Marketing',
        description: 'Creación de contenido de valor: blogs, videos, infografías que atraen y convierten.',
        features: [
            'Estrategia de contenidos',
            'Redacción SEO',
            'Diseño de infografías',
            'Producción de video',
            'Distribución multicanal',
            'Medición de resultados'
        ],
        tech: ['WordPress', 'Canva', 'Adobe Suite', 'HubSpot'],
        priceRange: '$500 - $4,000 USD/mes',
        deliveryTime: 'Mensual'
    },

    // ========================================
    // DISEÑO Y EXPERIENCIA
    // ========================================
    'uxui': {
        title: 'Diseño UX/UI',
        icon: 'fas fa-pencil-ruler',
        category: 'Diseño',
        description: 'Interfaces intuitivas y experiencias centradas en el usuario que aumentan conversiones.',
        features: [
            'Investigación de usuarios',
            'Wireframes y prototipos',
            'Design system',
            'Test de usabilidad',
            'Diseño responsive',
            'Entrega en Figma'
        ],
        tech: ['Figma', 'Adobe XD', 'Sketch', 'Framer'],
        priceRange: '$1,500 - $20,000 USD',
        deliveryTime: '3 - 10 semanas'
    },
    'branding': {
        title: 'Branding e Identidad Visual',
        icon: 'fas fa-fingerprint',
        category: 'Diseño',
        description: 'Identidad visual completa: logotipo, paleta de colores, tipografías y manual de marca.',
        features: [
            'Diseño de logotipo',
            'Manual de marca',
            'Paleta de colores',
            'Tipografías corporativas',
            'Aplicaciones (tarjetas, etc.)',
            'Archivos editables'
        ],
        tech: ['Illustrator', 'Photoshop', 'InDesign', 'Figma'],
        priceRange: '$800 - $15,000 USD',
        deliveryTime: '2 - 6 semanas'
    },
    'graphic': {
        title: 'Diseño Gráfico',
        icon: 'fas fa-image',
        category: 'Diseño',
        description: 'Material publicitario, flyers, banners y todo lo que necesitas para comunicar visualmente.',
        features: [
            'Flyers y volantes',
            'Banners publicitarios',
            'Tarjetas de presentación',
            'Catálogos',
            'Empaques y packaging',
            'Material para redes'
        ],
        tech: ['Photoshop', 'Illustrator', 'InDesign', 'Canva'],
        priceRange: '$200 - $5,000 USD',
        deliveryTime: '1 - 4 semanas'
    },
    'motion': {
        title: 'Motion Graphics',
        icon: 'fas fa-film',
        category: 'Diseño',
        description: 'Animaciones, videos explicativos y motion design que dan vida a tu marca.',
        features: [
            'Videos explicativos',
            'Animación de logos',
            'Intros y outtros',
            'Motion para redes sociales',
            'Locución profesional',
            'Música y efectos'
        ],
        tech: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'Blender'],
        priceRange: '$500 - $10,000 USD',
        deliveryTime: '2 - 6 semanas'
    },
    '3d': {
        title: 'Modelado 3D',
        icon: 'fas fa-cube',
        category: 'Diseño',
        description: 'Modelos 3D, renders y visualizaciones arquitectónicas de alta calidad.',
        features: [
            'Modelado de productos',
            'Renders fotorrealistas',
            'Visualización arquitectónica',
            'Animación 3D',
            'Impresión 3D ready',
            'Optimización para web'
        ],
        tech: ['Blender', '3ds Max', 'Maya', 'Cinema 4D'],
        priceRange: '$500 - $15,000 USD',
        deliveryTime: '2 - 8 semanas'
    },
    'prototype': {
        title: 'Prototipado',
        icon: 'fas fa-drafting-compass',
        category: 'Diseño',
        description: 'Wireframes y prototipos interactivos en Figma para validar ideas antes de desarrollar.',
        features: [
            'Wireframes de baja fidelidad',
            'Prototipos interactivos',
            'Test con usuarios',
            'Iteración rápida',
            'Documentación',
            'Handoff a desarrollo'
        ],
        tech: ['Figma', 'Adobe XD', 'InVision', 'Marvel'],
        priceRange: '$800 - $8,000 USD',
        deliveryTime: '1 - 4 semanas'
    },

    // ========================================
    // SOPORTE Y CONSULTORÍA
    // ========================================
    'consulting': {
        title: 'Consultoría Tecnológica',
        icon: 'fas fa-lightbulb',
        category: 'Soporte',
        description: 'Asesoría estratégica para la transformación digital de tu empresa, sin compromiso.',
        features: [
            'Análisis de madurez digital',
            'Roadmap tecnológico',
            'Selección de tecnologías',
            'Optimización de costos',
            'Plan de transformación',
            'Acompañamiento continuo'
        ],
        tech: ['Metodologías ágiles', 'Design Thinking', 'Lean Startup'],
        priceRange: '$500 - $5,000 USD/mes',
        deliveryTime: 'Continuo'
    },
    'support': {
        title: 'Soporte Técnico 24/7',
        icon: 'fas fa-tools',
        category: 'Soporte',
        description: 'Atención 24/7 y mantenimiento preventivo de sistemas para que tu negocio nunca se detenga.',
        features: [
            'Atención telefónica y por chat',
            'Soporte remoto y presencial',
            'Tiempo de respuesta garantizado',
            'Mantenimiento preventivo',
            'Actualizaciones',
            'Reportes de incidencias'
        ],
        tech: ['TeamViewer', 'AnyDesk', 'Zendesk', 'Freshdesk'],
        priceRange: '$300 - $3,000 USD/mes',
        deliveryTime: 'Continuo'
    },
    'maintenance': {
        title: 'Mantenimiento',
        icon: 'fas fa-wrench',
        category: 'Soporte',
        description: 'Actualizaciones, parches de seguridad y optimización continua de tus sistemas.',
        features: [
            'Actualizaciones regulares',
            'Parches de seguridad',
            'Optimización de rendimiento',
            'Limpieza de código',
            'Backup programado',
            'Monitoreo continuo'
        ],
        tech: ['Git', 'Docker', 'Ansible', 'Nagios'],
        priceRange: '$300 - $5,000 USD/mes',
        deliveryTime: 'Continuo'
    },
    'audit': {
        title: 'Auditoría de Software',
        icon: 'fas fa-clipboard-check',
        category: 'Soporte',
        description: 'Revisión de código, rendimiento y buenas prácticas para asegurar la calidad de tu software.',
        features: [
            'Revisión de código',
            'Análisis de rendimiento',
            'Buenas prácticas',
            'Seguridad de código',
            'Documentación técnica',
            'Plan de mejora'
        ],
        tech: ['SonarQube', 'ESLint', 'Jest', 'Selenium'],
        priceRange: '$1,000 - $15,000 USD',
        deliveryTime: '2 - 6 semanas'
    },
    'training': {
        title: 'Capacitación y Formación',
        icon: 'fas fa-graduation-cap',
        category: 'Soporte',
        description: 'Formación de equipos en nuevas tecnologías y metodologías con instructores expertos.',
        features: [
            'Cursos personalizados',
            'Modalidad presencial u online',
            'Material didáctico',
            'Certificados',
            'Evaluaciones',
            'Soporte post-curso'
        ],
        tech: ['Plataformas LMS', 'Moodle', 'Google Classroom'],
        priceRange: '$500 - $8,000 USD',
        deliveryTime: 'Según curso'
    },
    'transformation': {
        title: 'Transformación Digital',
        icon: 'fas fa-rocket',
        category: 'Soporte',
        description: 'Acompañamiento integral en la digitalización completa de tu negocio, de principio a fin.',
        features: [
            'Diagnóstico completo',
            'Plan estratégico',
            'Implementación por fases',
            'Gestión del cambio',
            'Capacitación del equipo',
            'Medición de resultados'
        ],
        tech: ['Metodologías ágiles', 'PMBOK', 'Scrum'],
        priceRange: '$10,000 - $150,000 USD',
        deliveryTime: '6 - 24 meses'
    },

    // ========================================
    // OTROS SERVICIOS
    // ========================================
    'games': {
        title: 'Desarrollo de Videojuegos',
        icon: 'fas fa-gamepad',
        category: 'Otros',
        description: 'Videojuegos 2D y 3D para PC, consolas y móviles con Unity y Unreal Engine.',
        features: [
            'Diseño de gameplay',
            'Arte 2D/3D',
            'Programación',
            'Sonido y música',
            'Publicación multiplataforma',
            'Monetización'
        ],
        tech: ['Unity', 'Unreal Engine', 'Godot', 'Blender'],
        priceRange: '$5,000 - $100,000 USD',
        deliveryTime: '3 - 12 meses'
    },
    'vr': {
        title: 'Realidad Virtual / Aumentada',
        icon: 'fas fa-vr-cardboard',
        category: 'Otros',
        description: 'Experiencias inmersivas VR y AR para marketing, educación, entrenamiento y más.',
        features: [
            'Apps VR para Meta Quest',
            'AR para móviles',
            'Contenido 360°',
            'Simulaciones interactivas',
            'Integración con web',
            'Experiencias personalizadas'
        ],
        tech: ['Unity', 'Unreal', 'WebXR', 'ARKit', 'ARCore'],
        priceRange: '$5,000 - $80,000 USD',
        deliveryTime: '2 - 8 meses'
    },
    'blockchain': {
        title: 'Blockchain y Web3',
        icon: 'fas fa-link',
        category: 'Otros',
        description: 'Smart contracts, NFTs y aplicaciones descentralizadas (dApps) en las principales redes blockchain.',
        features: [
            'Smart contracts',
            'dApps',
            'NFTs y marketplaces',
            'Tokens ERC-20/ERC-721',
            'Auditoría de contratos',
            'Integración con wallets'
        ],
        tech: ['Solidity', 'Ethereum', 'Polygon', 'Web3.js', 'Hardhat'],
        priceRange: '$3,000 - $60,000 USD',
        deliveryTime: '4 - 16 semanas'
    },
    'iot': {
        title: 'IoT (Internet de las Cosas)',
        icon: 'fas fa-microchip',
        category: 'Otros',
        description: 'Dispositivos conectados inteligentes y plataformas IoT para automatizar cualquier entorno.',
        features: [
            'Sensores personalizados',
            'Conectividad WiFi/LoRa',
            'Dashboard de control',
            'Automatización',
            'Alertas inteligentes',
            'Integración con sistemas'
        ],
        tech: ['Arduino', 'Raspberry Pi', 'ESP32', 'MQTT', 'Node-RED'],
        priceRange: '$2,000 - $50,000 USD',
        deliveryTime: '6 - 20 semanas'
    },
    'print3d': {
        title: 'Impresión 3D',
        icon: 'fas fa-cubes',
        category: 'Otros',
        description: 'Diseño y fabricación aditiva de prototipos, piezas y productos personalizados.',
        features: [
            'Modelado 3D',
            'Prototipado rápido',
            'Impresión en múltiples materiales',
            'Post-procesado',
            'Producción en serie',
            'Diseño personalizado'
        ],
        tech: ['Fusion 360', 'Blender', 'PrusaSlicer', 'Cura'],
        priceRange: '$200 - $20,000 USD',
        deliveryTime: '1 - 8 semanas'
    },
    'custom': {
        title: 'Servicio Personalizado',
        icon: 'fas fa-plus-circle',
        category: 'Personalizado',
        description: '¿No encuentras lo que buscas? Cuéntanos tu necesidad y crearemos una solución a tu medida.',
        features: [
            'Análisis de tu necesidad',
            'Propuesta personalizada',
            'Presupuesto a medida',
            'Plazo adaptado',
            'Equipo dedicado',
            'Acompañamiento total'
        ],
        tech: ['Todo lo que necesites'],
        priceRange: 'A convenir',
        deliveryTime: 'A convenir'
    }
};

window.SERVICES_DATA = SERVICES_DATA;
console.log('📚 Base de datos de servicios cargada:', Object.keys(SERVICES_DATA).length, 'servicios');