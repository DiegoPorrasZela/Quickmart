// Productos JavaScript - Funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const productosCards = document.querySelectorAll('.producto-card');
    const cargarMasBtn = document.getElementById('cargarMasBtn');
    const btnExplorar = document.querySelector('.btn-explorar');
    
    // Variables para el sistema de filtrado
    let categoriaActiva = 'todos';
    let productosVisibles = 8;
    const productosPorCarga = 4;
    
    // Inicializar la página
    init();
    
    function init() {
        setupFiltros();
        setupCargarMas();
        setupScrollSuave();
        setupAnimacionesScroll();
        mostrarProductosIniciales();
    }
    
    // Sistema de filtros
    function setupFiltros() {
        filtrosBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const categoria = this.dataset.categoria;
                cambiarFiltro(categoria, this);
            });
        });
    }
    
    function cambiarFiltro(categoria, btnActivo) {
        // Actualizar botones activos
        filtrosBtns.forEach(btn => btn.classList.remove('active'));
        btnActivo.classList.add('active');
        
        // Aplicar filtro con animación
        categoriaActiva = categoria;
        filtrarProductos(categoria);
        
        // Efecto de pulso en el botón
        btnActivo.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnActivo.style.transform = 'scale(1.05)';
        }, 100);
        setTimeout(() => {
            btnActivo.style.transform = 'scale(1)';
        }, 200);
    }
    
    function filtrarProductos(categoria) {
        productosCards.forEach((card, index) => {
            const cardCategoria = card.dataset.categoria;
            const shouldShow = categoria === 'todos' || cardCategoria === categoria;
            
            if (shouldShow) {
                // Mostrar con animación escalonada
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                    card.style.animationDelay = `${index * 0.1}s`;
                }, index * 50);
            } else {
                // Ocultar con animación
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
        
        // Actualizar contador y botón cargar más
        actualizarContadorProductos();
    }
    
    // Sistema de carga progresiva
    function setupCargarMas() {
        cargarMasBtn.addEventListener('click', function() {
            cargarMasProductos();
        });
    }
    
    function cargarMasProductos() {
        // Simular carga con spinner
        cargarMasBtn.classList.add('loading');
        
        setTimeout(() => {
            productosVisibles += productosPorCarga;
            mostrarProductos();
            cargarMasBtn.classList.remove('loading');
            
            // Animar nuevos productos
            animarNuevosProductos();
        }, 1500);
    }
    
    function mostrarProductosIniciales() {
        productosCards.forEach((card, index) => {
            if (index < productosVisibles) {
                card.style.display = 'block';
                card.style.animationDelay = `${index * 0.1}s`;
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function mostrarProductos() {
        productosCards.forEach((card, index) => {
            const cardCategoria = card.dataset.categoria;
            const shouldShow = categoriaActiva === 'todos' || cardCategoria === categoriaActiva;
            
            if (shouldShow && index < productosVisibles) {
                card.style.display = 'block';
            }
        });
        
        actualizarContadorProductos();
    }
    
    function animarNuevosProductos() {
        const productosVisiblesArray = Array.from(productosCards).filter((card, index) => {
            return index >= productosVisibles - productosPorCarga && index < productosVisibles;
        });
        
        productosVisiblesArray.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    function actualizarContadorProductos() {
        const productosVisiblesActuales = Array.from(productosCards).filter(card => {
            const cardCategoria = card.dataset.categoria;
            const shouldShow = categoriaActiva === 'todos' || cardCategoria === categoriaActiva;
            return shouldShow && card.style.display !== 'none';
        }).length;
        
        const totalProductos = Array.from(productosCards).filter(card => {
            const cardCategoria = card.dataset.categoria;
            return categoriaActiva === 'todos' || cardCategoria === categoriaActiva;
        }).length;
        
        if (productosVisiblesActuales >= totalProductos) {
            cargarMasBtn.style.display = 'none';
        } else {
            cargarMasBtn.style.display = 'block';
        }
    }
    
    // Scroll suave
    function setupScrollSuave() {
        if (btnExplorar) {
            btnExplorar.addEventListener('click', scrollToProducts);
        }
    }
    
    function scrollToProducts() {
        const productosSection = document.getElementById('productos-section');
        if (productosSection) {
            productosSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Animaciones al hacer scroll
    function setupAnimacionesScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observar elementos animables
        const elementsToAnimate = document.querySelectorAll('.producto-card, .filtros-container, .cargar-mas-section');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
    
    // Efectos de hover mejorados para productos
    function setupHoverEffects() {
        productosCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Manejo de botones de productos
    function setupProductButtons() {
        const botonesVerDetalle = document.querySelectorAll('.btn-ver-detalle');
        const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');
        
        botonesVerDetalle.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                mostrarDetalleProducto(this);
            });
        });
        
        botonesAgregarCarrito.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                agregarAlCarrito(this);
            });
        });
    }
    
    function mostrarDetalleProducto(btn) {
        const card = btn.closest('.producto-card');
        const nombreProducto = card.querySelector('h3').textContent;
        
        // Efecto de click
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Simular mostrar detalle
        mostrarNotificacion(`Viendo detalles de: ${nombreProducto}`, 'info');
    }
    
    function agregarAlCarrito(btn) {
        const card = btn.closest('.producto-card');
        const nombreProducto = card.querySelector('h3').textContent;
        const precio = card.querySelector('.producto-precio').textContent;
        
        // Animación de éxito
        btn.style.background = '#4CAF50';
        btn.textContent = '¡Agregado!';
        
        setTimeout(() => {
            btn.style.background = '#a0eb4b';
            btn.textContent = 'Agregar al Carrito';
        }, 2000);
        
        mostrarNotificacion(`${nombreProducto} agregado al carrito por ${precio}`, 'success');
    }
    
    // Sistema de notificaciones
    function mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.textContent = mensaje;
        
        // Estilos CSS dinámicos
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        
        // Colores según tipo
        switch(tipo) {
            case 'success':
                notificacion.style.background = '#4CAF50';
                break;
            case 'error':
                notificacion.style.background = '#f44336';
                break;
            case 'info':
            default:
                notificacion.style.background = '#2196F3';
                break;
        }
        
        document.body.appendChild(notificacion);
        
        // Animación de entrada
        setTimeout(() => {
            notificacion.style.transform = 'translateX(0)';
        }, 100);
        
        // Animación de salida
        setTimeout(() => {
            notificacion.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }
    
    // Manejo del formulario de suscripción
    function setupFormularioSuscripcion() {
        const form = document.querySelector('.form-suscripcion-qm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                if (email) {
                    mostrarNotificacion('¡Suscripción exitosa! Recibirás nuestras ofertas exclusivas.', 'success');
                    this.querySelector('input[type="email"]').value = '';
                }
            });
        }
    }
    
    // Efectos de paralaje ligero
    function setupParallax() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const bannerImage = document.querySelector('.banner-image');
            
            if (bannerImage) {
                const speed = scrolled * 0.5;
                bannerImage.style.transform = `translateY(${speed}px)`;
            }
        });
    }
    
    // Lazy loading para imágenes
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Función para hacer scroll a productos (global)
    window.scrollToProducts = scrollToProducts;
    
    // Inicializar funcionalidades adicionales
    setupHoverEffects();
    setupProductButtons();
    setupFormularioSuscripcion();
    setupParallax();
    setupLazyLoading();
    
    // Manejo de errores de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwTDEyNSA3NUwxMDAgMTAwTDEyNSAxMjVMMTUwIDEwMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
            this.alt = 'Imagen no disponible';
        });
    });
    
    console.log('🛍️ Sistema de productos inicializado correctamente');
});