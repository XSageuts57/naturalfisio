// Navegación móvil mejorada
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

// Crear overlay para móviles
const mobileOverlay = document.createElement('div');
mobileOverlay.className = 'mobile-overlay';
document.body.appendChild(mobileOverlay);

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en overlay
mobileOverlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    mobileOverlay.classList.remove('active');
    body.style.overflow = '';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
    });
});

// Prevenir scroll horizontal en móviles
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
        }
    }
});

// Efectos de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Observar elementos con clases de animación
document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
    observer.observe(el);
});

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Manejo del formulario de reservas
const bookingForm = document.getElementById('reserva-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(bookingForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const date = formData.get('date');
    const message = formData.get('message');
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `Hola, me gustaría reservar una cita en Naturalfisio:%0A%0A` +
                           `*Nombre:* ${name}%0A` +
                           `*Email:* ${email}%0A` +
                           `*Teléfono:* ${phone}%0A` +
                           `*Servicio:* ${service}%0A` +
                           `*Fecha preferida:* ${date}%0A` +
                           `*Mensaje:* ${message || 'Sin mensaje adicional'}`;
    
    // Número de WhatsApp
    const whatsappNumber = '+51984759301';
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Redirigir a WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Mostrar mensaje de confirmación
    alert('¡Gracias por tu solicitud! Serás redirigido a WhatsApp para completar tu reserva.');
    
    // Limpiar formulario
    bookingForm.reset();
});

// Efecto de carga inicial
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Asegurarse de que los elementos en la vista inicial se animen
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('appear');
        }
    });
});

// Prevenir zoom en inputs en iOS
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        document.body.style.zoom = "100%";
    }
});