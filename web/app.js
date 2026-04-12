document.addEventListener('DOMContentLoaded', () => {
    const CFG = window.MUMINITA_PUBLIC_CONFIG || {
        SUPABASE_URL: 'https://toryoblzisspbemtehcl.supabase.co',
        SUPABASE_ANON_KEY: 'sb_publishable_0UVvh06wWLiIHg1e0msf7g_Qh9I4smr',
        PRODUCTOS_TABLE: 'productos',
        WHATSAPP_NUMBER: '573162545794'
    };

    function escapeHtml(text) {
        if (text == null) return '';
        const d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }

    // ==========================================
    // 1. UI Interactions (Menu, Navbar, Modals)
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const toast = document.getElementById('toast');
    function showToast(message, iconClass = 'fa-solid fa-check-circle') {
        toast.innerHTML = `<i class="${escapeHtml(iconClass)}"></i> ${escapeHtml(message)}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement && !this.classList.contains('mobile-link')) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });



    // ==========================================
    // Informational Modals (Shipping, Returns, Sizes, FAQ, Policy)
    // ==========================================
    const modalConfig = [
        { id: 'policyModal', open: 'openPolicyBtn', close: 'closePolicyModal' },
        { id: 'shippingModal', open: 'openShippingBtn', close: 'closeShippingModal' },
        { id: 'returnsModal', open: 'openReturnsBtn', close: 'closeReturnsModal' },
        { id: 'sizeGuideModal', open: 'openSizeGuideBtn', close: 'closeSizeGuideModal' },
        { id: 'faqModal', open: 'openFaqBtn', close: 'closeFaqModal' }
    ];

    modalConfig.forEach(cfg => {
        const modal = document.getElementById(cfg.id);
        const openBtn = document.getElementById(cfg.open);
        const closeBtn = document.getElementById(cfg.close);

        if (modal && openBtn) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            closeBtn?.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // ==========================================
    // Custom Design Order Modal
    // ==========================================
    const customDesignBtn = document.getElementById('customDesignBtn');
    const customDesignModal = document.getElementById('customDesignModal');
    const closeCustomDesignModal = document.getElementById('closeCustomDesignModal');
    const customDesignForm = document.getElementById('customDesignForm');

    // Abrir modal de pedido personalizado
    customDesignBtn?.addEventListener('click', () => {
        customDesignModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Botón de diseño personalizado en hero (estático)
    const customDesignHeroBtn = document.getElementById('customDesignHeroBtn');
    customDesignHeroBtn?.addEventListener('click', () => {
        customDesignModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal de pedido personalizado
    closeCustomDesignModal?.addEventListener('click', () => {
        customDesignModal.classList.remove('active');
        document.body.style.overflow = '';
    });



    window.addEventListener('click', (e) => {
        if (e.target === customDesignModal) {
            customDesignModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Manejar envío del formulario de pedido personalizado
    customDesignForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = customDesignForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparando mensaje...';
        submitBtn.disabled = true;

        try {
            // Obtener los valores del formulario
            const talla = document.getElementById('customDesignSize').value;
            const color = document.getElementById('customDesignColor').value;
            const observaciones = document.getElementById('customDesignObservations').value;


            // Construir mensaje para WhatsApp
            let mensaje = `*🛍️ PEDIDO DE DISEÑO PERSONALIZADO*\n\n`;
            mensaje += `*Talla:* ${talla}\n`;
            mensaje += `*Color preferido:* ${color}\n`;
            if (observaciones) {
                mensaje += `*Observaciones:* ${observaciones}\n`;
            }

            mensaje += `\nPor favor confírmame disponibilidad y medio de pago.`;

            const url = `https://wa.me/${CFG.WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');

            // Cerrar el modal
            customDesignModal.classList.remove('active');
            document.body.style.overflow = '';

            if (tieneImagen) {
                showToast("¡Mensaje preparado! Por favor adjunta la imagen de referencia manualmente en WhatsApp.", "fa-solid fa-check-circle");
            } else {
                showToast("¡Mensaje preparado en WhatsApp! Por favor envíalo para procesar tu pedido.", "fa-solid fa-check-circle");
            }

            // Limpiar el formulario
            customDesignForm.reset();
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('imagePreview').innerHTML = '';
        } catch (error) {
            console.error('Error:', error);
            showToast("Error al abrir WhatsApp. Intenta de nuevo.", "fa-solid fa-exclamation-circle");
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // ==========================================
    // Floating WhatsApp Contact Modal
    // ==========================================
    const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
    const whatsappContactModal = document.getElementById('whatsappContactModal');
    const closeWhatsappContactModal = document.getElementById('closeWhatsappContactModal');
    const contactNameInp = document.getElementById('contactName');
    const contactTipoIdInp = document.getElementById('contactTipoId');
    const contactNumeroIdInp = document.getElementById('contactNumeroId');
    const contactEmailInp = document.getElementById('contactEmail');
    const contactAuthCheck = document.getElementById('contactAuthCheck');
    const contactPolicyCheck = document.getElementById('contactPolicyCheck');
    const confirmWhatsappContactBtn = document.getElementById('confirmWhatsappContactBtn');
    const contactFormError = document.getElementById('contactFormError');

    // Abrir modal de contacto WhatsApp
    whatsappFloatBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        whatsappContactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal
    closeWhatsappContactModal?.addEventListener('click', () => {
        whatsappContactModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Validar estado del botón
    function updateContactButtonState() {
        if (confirmWhatsappContactBtn) {
            const hasName = contactNameInp?.value.trim() !== '';
            const hasTipoId = contactTipoIdInp?.value.trim() !== '';
            const hasNumId = contactNumeroIdInp?.value.trim() !== '';

            confirmWhatsappContactBtn.disabled = !(
                hasName &&
                hasTipoId &&
                hasNumId &&
                contactAuthCheck?.checked &&
                contactPolicyCheck?.checked
            );
        }
    }

    contactNameInp?.addEventListener('input', updateContactButtonState);
    contactTipoIdInp?.addEventListener('change', updateContactButtonState);
    contactNumeroIdInp?.addEventListener('input', updateContactButtonState);
    contactAuthCheck?.addEventListener('change', updateContactButtonState);
    contactPolicyCheck?.addEventListener('change', updateContactButtonState);

    // Confirmar y enviar a WhatsApp
    confirmWhatsappContactBtn?.addEventListener('click', async () => {
        const nombre = contactNameInp.value.trim();
        const tipoId = contactTipoIdInp.value;
        const numeroId = contactNumeroIdInp.value.trim();
        const email = contactEmailInp.value.trim();

        if (!nombre || !tipoId || !numeroId || !contactAuthCheck.checked || !contactPolicyCheck.checked) {
            contactFormError.style.display = 'block';
            contactFormError.textContent = 'Por favor completa los campos obligatorios y acepta las autorizaciones.';
            return;
        }

        contactFormError.style.display = 'none';
        confirmWhatsappContactBtn.disabled = true;
        confirmWhatsappContactBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registrando...';

        const consentData = {
            nombre: nombre,
            numeroId: numeroId,
            tipoId: tipoId,
            email: email || 'N/A',
            fechaAutorizacion: new Date().toISOString()
        };

        try {
            await saveLegalConsent(consentData);
        } catch (err) {
            console.error("Error legal consent:", err);
        }

        // Abrir WhatsApp
        const mensaje = `Hola MumiNita 🤗, mi nombre es ${nombre}. Me gustaría realizar una consulta sobre sus productos. He autorizado el tratamiento de mis datos personales tambien he leido y aceptado la política de tratamiento de datos.`;
        const url = `https://wa.me/${CFG.WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');

        // Cerrar y resetear
        whatsappContactModal.classList.remove('active');
        document.body.style.overflow = '';
        contactNameInp.value = '';
        contactAuthCheck.checked = false;
        contactPolicyCheck.checked = false;
        confirmWhatsappContactBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Iniciar Chat';
        confirmWhatsappContactBtn.disabled = true;
    });

    // ==========================================
    // 2. Data Sourcing (Products & Categories)
    // ==========================================
    let productos = [];
    let cart = [];
    let catalogRefreshTimer = null;

    // ==========================================
    // CONFIGURACIÓN DE SUPABASE (Reemplaza Google Sheets)
    // ==========================================
    const SUPABASE_URL = CFG.SUPABASE_URL;
    const SUPABASE_ANON_KEY = CFG.SUPABASE_ANON_KEY;
    const PRODUCTOS_TABLE = CFG.PRODUCTOS_TABLE;

    // Cliente Supabase (se inicializa lazily)
    let supabaseClient = null;

    // Función para obtener el cliente de Supabase
    function getSupabaseClient() {
        if (!supabaseClient && typeof window !== 'undefined') {
            // Cargar el SDK de Supabase dinámicamente
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
        return supabaseClient;
    }

    // ==========================================
    // SISTEMA DE CACHÉ - localStorage
    // ==========================================
    const CACHE_CONFIG = {
        KEY_INVENTORY: 'muminita_inventory_cache',
        KEY_TIMESTAMP: 'muminita_inventory_timestamp',
        CACHE_DURATION: 1 * 60 * 1000 // Reducido a 1 minuto para sincronización más rápida
    };

    // Función para forzar limpia del caché (para desarrollo/debug)
    function clearInventoryCache() {
        try {
            localStorage.removeItem(CACHE_CONFIG.KEY_INVENTORY);
            localStorage.removeItem(CACHE_CONFIG.KEY_TIMESTAMP);
            console.log('🗑️ Caché de inventario limpiado');
        } catch (e) {
            console.warn('⚠️ Error limpiando caché:', e);
        }
    }

    // Función para guardar inventario en localStorage
    function saveInventoryCache(products) {
        try {
            localStorage.setItem(CACHE_CONFIG.KEY_INVENTORY, JSON.stringify(products));
            localStorage.setItem(CACHE_CONFIG.KEY_TIMESTAMP, Date.now().toString());
            console.log('✅ Caché de inventario guardado:', products.length, 'productos');
        } catch (e) {
            console.warn('⚠️ Error guardando caché:', e);
        }
    }

    // Función para obtener inventario del localStorage
    function getInventoryCache() {
        try {
            const cached = localStorage.getItem(CACHE_CONFIG.KEY_INVENTORY);
            const timestamp = localStorage.getItem(CACHE_CONFIG.KEY_TIMESTAMP);
            if (cached && timestamp) {
                const age = Date.now() - parseInt(timestamp);
                const isFresh = age < CACHE_CONFIG.CACHE_DURATION;
                console.log(`📦 Caché encontrado. Edad: ${Math.round(age / 1000)}s. ¿Fresco?: ${isFresh}`);
                return {
                    products: JSON.parse(cached),
                    isFresh: isFresh,
                    age: age
                };
            }
        } catch (e) {
            console.warn('⚠️ Error leyendo caché:', e);
        }
        return null;
    }

    // Función para transformar datos de Supabase al formato esperado
    function transformSupabaseData(data) {
        return data.map(p => ({
            // ID y referencia (ambos formatos para compatibilidad)
            id: p.id,
            Referencia: p.referencia || p.Referencia || p.ID_Referencia || `REF-${p.id}`,
            referencia: p.referencia || p.Referencia || `REF-${p.id}`,
            ID_Referencia: p.referencia || p.Referencia || `REF-${p.id}`,
            Nombre: p.nombre || '',
            Categoria: p.categoria || '',
            Descripcion: p.descripcion || '',
            Precio: parseFloat(p.precio) || 0,
            Stock: p.stock || 0,
            Imagen: p.imagen || p.imagenes || '',
            Etiqueta: p.etiqueta || '',
            Tallas: p.tallas || '',
            Colores: p.colores || '',
            // Stock por talla
            stock_0: p.stock_0 || 0,
            stock_1: p.stock_1 || 0,
            stock_2: p.stock_2 || 0,
            stock_4: p.stock_4 || 0,
            stock_6: p.stock_6 || 0,
            stock_8: p.stock_8 || 0,
            stock_10: p.stock_10 || 0,
            stock_12: p.stock_12 || 0,
            Stock_0: p.stock_0 || 0,
            Stock_1: p.stock_1 || 0,
            Stock_2: p.stock_2 || 0,
            Stock_4: p.stock_4 || 0,
            Stock_6: p.stock_6 || 0,
            Stock_8: p.stock_8 || 0,
            Stock_10: p.stock_10 || 0,
            Stock_12: p.stock_12 || 0,
            // Precio por talla (mantener minúsculas para consistencia)
            precio_0: p.precio_0 || 0,
            precio_1: p.precio_1 || 0,
            precio_2: p.precio_2 || 0,
            precio_4: p.precio_4 || 0,
            precio_6: p.precio_6 || 0,
            precio_8: p.precio_8 || 0,
            precio_10: p.precio_10 || 0,
            precio_12: p.precio_12 || 0,
            // Versiones con mayúscula para compatibilidad
            Precio_0: p.precio_0 || 0,
            Precio_1: p.precio_1 || 0,
            Precio_2: p.precio_2 || 0,
            Precio_4: p.precio_4 || 0,
            Precio_6: p.precio_6 || 0,
            Precio_8: p.precio_8 || 0,
            Precio_10: p.precio_10 || 0,
            Precio_12: p.precio_12 || 0
        }));
    }

    /** Stock disponible para una talla concreta o stock general (solo lectura / avisos). */
    function getStockByTalla(prod, talla) {
        if (!talla) {
            const s = parseInt(prod.Stock, 10);
            return Number.isFinite(s) ? s : 0;
        }
        const sanitized = String(talla).replace(/[^a-zA-Z0-9]/g, '_');
        const candidates = [
            `stock_${sanitized}`,
            `Stock_${sanitized}`,
            `stock_${sanitized.toLowerCase()}`
        ];
        const nums = String(talla).match(/\d+/g);
        if (nums) {
            const n = nums[nums.length - 1];
            const num = parseInt(n, 10);
            candidates.push(`stock_${n}`, `Stock_${n}`, `stock_${num}`, `Stock_${num}`);
        }
        for (const k of candidates) {
            if (prod[k] !== undefined && prod[k] !== null && prod[k] !== '') {
                const v = parseInt(prod[k], 10);
                if (!Number.isNaN(v)) return v;
            }
        }
        const fallback = parseInt(prod.Stock, 10);
        return Number.isFinite(fallback) ? fallback : 0;
    }

    // Función para actualizar caché en background - VERSIÓN SUPABASE
    async function updateCacheInBackground() {
        try {
            const supabase = getSupabaseClient();
            if (!supabase) {
                console.warn('Cliente de Supabase no disponible para actualización en background');
                return null;
            }

            const { data, error } = await supabase
                .from(PRODUCTOS_TABLE)
                .select('*');

            if (error) {
                console.warn('Error de Supabase en background:', error);
                return null;
            }

            if (data && data.length > 0) {
                const products = transformSupabaseData(data);
                saveInventoryCache(products);
                console.log('🔄 Caché actualizado en background (Supabase):', products.length, 'productos');
                return products;
            }
        } catch (e) {
            console.warn('⚠️ Error actualizando caché en background:', e);
        }
        return null;
    }

    // Función para forzar obtener datos frescos (para checkout) - VERSIÓN SUPABASE
    async function fetchFreshInventory() {
        try {
            const supabase = getSupabaseClient();
            if (!supabase) {
                console.warn('Cliente de Supabase no disponible');
                return null;
            }

            const { data, error } = await supabase
                .from(PRODUCTOS_TABLE)
                .select('*');

            if (error) {
                console.warn('Error de Supabase:', error);
                return null;
            }

            if (data && data.length > 0) {
                // Transformar datos al formato esperado usando la función helper
                const products = transformSupabaseData(data);

                saveInventoryCache(products);
                console.log('🔄 Caché actualizado desde Supabase:', products.length, 'productos');
                return products;
            }
        } catch (e) {
            console.warn('⚠️ Error obteniendo inventario fresco:', e);
        }
        return null;
    }


    // Datos de ejemplo predeterminados (Solo se usan si el Excel falla)
    const productosPlaceholder = [
        { Nombre: "Cargando MumiNita...", Categoria: "Bebes", Precio: "0", Imagen: "https://placehold.co/600x600/f3f3f3/a1a1a1?text=Conectando...", Etiqueta: "" },
    ];

    // Elementos del DOM del carrito
    const cartBtn = document.getElementById('cartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const productsGrid = document.getElementById('productsGrid');

    // Elementos del formulario de datos del cliente
    const customerFormContainer = document.getElementById('customerFormContainer');
    const customerForm = document.getElementById('customerForm');
    const cartFooter = document.getElementById('cartFooter');
    const backToCartBtn = document.getElementById('backToCartBtn');
    const confirmCheckoutBtn = document.getElementById('confirmCheckoutBtn');
    const formError = document.getElementById('formError');
    const authDataCheck = document.getElementById('authDataCheck');
    const acceptPolicyCheck = document.getElementById('acceptPolicyCheck');
    const clearCartBtn = document.getElementById('clearCartBtn');

    // Objeto para almacenar datos del cliente
    let customerData = {
        nombre: '',
        tipoId: '',
        numeroId: '',
        email: ''
    };

    function scheduleCatalogRefresh() {
        if (catalogRefreshTimer !== null) {
            clearInterval(catalogRefreshTimer);
        }
        catalogRefreshTimer = setInterval(() => {
            updateCacheInBackground();
        }, CACHE_CONFIG.CACHE_DURATION);
    }

    // Inicializar Catálogo (con sistema de caché)
    async function initCatalog() {
        const grid = document.getElementById('productsGrid');
        const cachedData = getInventoryCache();

        if (cachedData && cachedData.products && cachedData.products.length > 0) {
            productos = cachedData.products;
            console.log('🚀 Cargando desde caché local:', productos.length, 'productos');

            if (grid) grid.innerHTML = '';
            renderFeatured();
            initCategoryFilters();
            loadCartFromStorage();
            scheduleCatalogRefresh();

            if (!cachedData.isFresh) {
                console.log('⏳ Caché expirado. Actualizando en background...');
                updateCacheInBackground()
                    .then((freshProducts) => {
                        if (freshProducts && freshProducts.length > 0) {
                            // Solo actualizar si hay cambios reales para evitar parpadeos
                            productos = freshProducts;

                            // Forzar refresco de las vistas actuales
                            renderFeatured();

                            // Si el filtro de categorías está visible, actualizarlo también
                            const filterSection = document.getElementById('categoryFilterSection');
                            if (filterSection && filterSection.style.display === 'block') {
                                const filterTitle = document.getElementById('currentCategoryTitle');
                                if (filterTitle) {
                                    // Extraer la categoría actual del título (ej: "Colección: Niñas")
                                    const currentCat = filterTitle.textContent.replace('Colección: ', '').trim();
                                    const filtrados = productos.filter(p => normalizeText(p.Categoria) === normalizeText(currentCat));
                                    const filterGrid = document.getElementById('categoryProductsGrid');
                                    if (filterGrid) {
                                        filterGrid.innerHTML = '';
                                        filtrados.forEach(p => filterGrid.appendChild(createProductCard(p)));
                                        rebindAddToCart();
                                    }
                                }
                            }

                            initCategoryFilters();
                            console.log('✅ Inventario actualizado en background');
                        }
                    })
                    .catch((e) => console.warn('⚠️ Error actualizando caché:', e));
            }

            return;
        }

        if (grid) {
            grid.innerHTML =
                '<div style="grid-column:1/-1; text-align:center; padding:3rem;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p style="margin-top:1rem;">Cargando inventario desde Supabase...</p></div>';
        }

        try {
            console.log('🔄 Cargando inventario desde Supabase...');
            const data = await fetchFreshInventory();
            console.log('📦 Datos recibidos de Supabase:', data);

            if (data && data.length > 0) {
                productos = data;
                saveInventoryCache(productos);
                console.log('¡Éxito! Productos cargados desde Supabase:', productos.length);
                scheduleCatalogRefresh();
            } else {
                throw new Error('No se encontraron productos en Supabase.');
            }
        } catch (err) {
            console.error('Error cargando catálogo:', err);
            if (grid) {
                grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; background:#fff5f5; border:1px solid #ffcfcf; border-radius:12px;">
                    <i class="fa-solid fa-cloud-slash" style="font-size:2rem; color:#e74c3c;"></i>
                    <p style="margin-top:1rem;"><b>No se detectó el inventario online.</b></p>
                    <p style="font-size:0.85rem; color:#666;">Asegúrate de estar conectado a internet o de que la base de datos de Supabase esté configurada correctamente.</p>
                    <button onclick="location.reload()" class="btn btn-small" style="margin-top:1rem;">Reintentar Carga</button>
                </div>`;
            }
            productos = productosPlaceholder;
        }

        renderFeatured();
        initCategoryFilters();
        loadCartFromStorage();
    }

    // Helper: Limpiar el formato de precio (quita signos $ y puntos)
    function cleanPrice(price) {
        if (!price) return 0;
        return Number(String(price).replace(/[^0-9]/g, ""));
    }

    // Helper: Calcular el precio final teniendo en cuenta el descuento
    function getFinalPrice(product) {
        const basePrice = cleanPrice(product.Precio);
        const tag = (product.Etiqueta || "").trim();
        const match = tag.match(/(\d+)/); // Busca el primer número en la etiqueta (ej: 15 de -15%)

        if (match && (tag.includes('%') || tag.toLowerCase().includes('desc'))) {
            const discountPct = parseInt(match[1]);
            return Math.floor(basePrice * (1 - discountPct / 100));
        }
        return basePrice;
    }

    // Helper: Normalizar texto (quitar tildes, eñes y espacios para comparaciones)
    function normalizeText(text) {
        if (!text) return "";
        return text.toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ñ/g, "n")
            .trim();
    }

    const SUPABASE_STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/productos`;

    // Helper: Convertir Links de Google Drive o usar imágenes de Supabase Storage
    function formatDriveImage(url) {
        if (!url || typeof url !== 'string') return 'https://placehold.co/600x600/f3f3f3/a1a1a1?text=Sin+Imagen';

        const cleanUrl = url.trim();

        // Si el usuario puso un link completo (http...)
        if (cleanUrl.startsWith('http')) {
            // Si es de Google Drive, convertir a Link Directo
            const driveRegex = /(?:id=|d\/)([a-zA-Z0-9_-]{25,})/;
            const match = cleanUrl.match(driveRegex);
            if (match && match[1]) {
                return `https://drive.google.com/uc?export=view&id=${match[1]}`;
            }
            return cleanUrl; // Es un link normal (ImgBB, Cloudinary, etc.)
        }

        // Si NO es un link, asumimos que es una imagen guardada en Supabase Storage (bucket 'productos')
        // Ejemplo: Si en la base de datos dice "vestido.jpg", devolverá la URL de Supabase Storage
        return `${SUPABASE_STORAGE_URL}/${cleanUrl}`;
    }

    // Generar la tarjeta de producto (HTML)
    function createProductCard(prod) {
        const idRef = prod.Referencia || prod.ID_Referencia || Math.random().toString(36).substr(2, 5);
        const nombre = prod.Nombre || 'Sin nombre';
        const categoria = prod.Categoria || 'Ropa';
        const precio = prod.Precio || "0";
        const etiqueta = prod.Etiqueta || "";
        const imgRaw = prod.Imagen || prod.Imagen_URL || prod.Image;
        const stock = parseInt(prod.Stock) || 99; // Default alto si no hay stock definido
        const estaAgotado = stock === 0;
        const ultimasUnidades = stock > 0 && stock <= 3;

        // Obtener tallas del producto
        const tallasRaw = prod.Tallas || prod.Talla || '';
        const tallas = tallasRaw.split(',').map(t => t.trim()).filter(t => t !== '');
        const tieneTallas = tallas.length > 0;

        const imgUrl = formatDriveImage(imgRaw);
        const precioOriginal = cleanPrice(precio);
        const precioBase = getFinalPrice(prod); // Aplica descuento si existe

        const precioFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precioBase);
        const precioOriginalFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precioOriginal);
        const tieneDescuento = precioBase < precioOriginal;

        // Obtener precios por talla
        const preciosTalla = {};
        tallas.forEach(talla => {
            const columnaPrecio = `Precio_${talla.replace(/[^a-zA-Z0-9]/g, '_')}`;
            if (prod[columnaPrecio]) {
                // Si hay precio por talla y hay descuento, aplicar el descuento al precio de talla
                const precioTallaSinDescuento = cleanPrice(prod[columnaPrecio]);
                preciosTalla[talla] = getFinalPrice({ ...prod, Precio: prod[columnaPrecio] });
            }
        });
        const tienePreciosTalla = Object.keys(preciosTalla).length > 0;

        // Lógica de Etiquetas
        let badgeHTML = '';
        const tag = (prod.Etiqueta || "").trim();
        const esNuevo = tag.toLowerCase() === 'nuevo';
        const esDescuento = /[0-9]/.test(tag);

        if (tag !== "" && (esNuevo || esDescuento)) {
            const badgeClass = esDescuento ? 'sale' : '';
            badgeHTML = `<span class="product-badge ${badgeClass}">${tag}</span>`;
        }

        // Badge de Stock
        let stockBadgeHTML = '';
        if (estaAgotado) {
            stockBadgeHTML = `<span class="stock-badge out-of-stock"><i class="fa-solid fa-xmark"></i> Agotado</span>`;
        } else if (ultimasUnidades) {
            stockBadgeHTML = `<span class="stock-badge low-stock"><i class="fa-solid fa-triangle-exclamation"></i> Últimas ${stock} unidades</span>`;
        }

        // Selector de tallas
        let sizeSelectorHTML = '';
        if (tieneTallas) {
            const opcionesTalla = tallas.map(talla => {
                // Obtener precio y stock por talla
                const columnaPrecio = `Precio_${talla.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const columnaStock = `Stock_${talla.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const precioTalla = preciosTalla[talla];
                const stockTalla = prod[columnaStock] !== undefined ? parseInt(prod[columnaStock]) : null;
                const estaAgotadoTalla = stockTalla === 0;
                const precioLabel = precioTalla ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precioTalla) : '';
                const suffix = precioLabel ? ` - ${precioLabel}` : '';
                const disabled = estaAgotadoTalla ? 'disabled' : '';
                const label = estaAgotadoTalla ? `${talla} (Agotado)` : `${talla}${suffix}`;
                return `<option value="${talla}" data-price="${precioTalla || precioBase}" data-stock="${stockTalla !== null ? stockTalla : stock}" ${disabled}>${label}</option>`;
            }).join('');

            sizeSelectorHTML = `
                <select class="size-selector" data-id="${idRef}" required>
                    <option value="" data-price="${precioBase}" data-stock="${stock}">Selecciona talla</option>
                    ${opcionesTalla}
                </select>
            `;
        }

        const card = document.createElement('div');
        card.className = 'product-card' + (estaAgotado ? ' sold-out' : '');
        
        // Extraer descripción si existe
        const descripcionText = prod.Descripcion || prod.Descripción || '';

        card.innerHTML = `
            <div class="product-img-wrapper" style="background: #fdfdfd;">
                <img src="${imgUrl}" 
                     alt="${nombre}" 
                     onerror="this.src='https://placehold.co/600x600/f3f3f3/a1a1a1?text=Imagen+no+disponible'"
                     onclick="openLightbox(this.src)" style="cursor: pointer;">
                ${badgeHTML}
                ${stockBadgeHTML}
            </div>
            <div class="product-info">
                <p class="product-category">${categoria} | Ref: ${idRef}</p>
                <h3 class="product-title" style="margin-bottom: 5px;">${nombre}</h3>
                ${descripcionText ? `<p class="product-description" style="font-size: 0.85rem; color: #666; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;" title="${descripcionText}">${descripcionText}</p>` : ''}
                ${tieneTallas ? sizeSelectorHTML : ''}
                <div class="product-price-row">
                    <div class="price-container">
                        ${tieneDescuento ? `<span class="price-old">${precioOriginalFormat}</span>` : ''}
                        <span class="price" data-base-price="${precioBase}">${precioFormat}</span>
                    </div>
                    <button class="add-to-cart-btn btn-small ${estaAgotado ? 'disabled' : ''}" 
                            data-id="${idRef}" 
                            data-price="${precioBase}"
                            ${estaAgotado ? 'disabled' : ''}>
                        <i class="fa-solid fa-plus"></i> ${estaAgotado ? 'Agotado' : 'Añadir'}
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    // RENDER 1: Solo productos que tengan la categoría "destacados"
    function renderFeatured() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        // Filtramos por la columna ETIQUETA o CATEGORÍA que diga "destacados"
        let destacados = productos.filter(p => {
            const tag = normalizeText(p.Etiqueta || p.etiqueta || '');
            const cat = normalizeText(p.Categoria || p.categoria || '');
            return tag === 'destacados' || cat === 'destacados';
        });

        // Si no hay ninguno como 'destacados', mostramos los primeros 4 del inventario para que no se vea vacío
        if (destacados.length === 0 && productos.length > 0) {
            console.log('⚠️ No hay productos destacados, mostrando productos del inventario');
            destacados = productos.slice(0, 4);
        }

        if (destacados.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No hay productos disponibles por ahora.</p>`;
            return;
        }

        destacados.forEach(prod => {
            grid.appendChild(createProductCard(prod));
        });

        rebindAddToCart();
    }

    // RENDER 2: Por Categoría (Al dar clic en tarjetas de Colección)
    function initCategoryFilters() {
        const categoryCards = document.querySelectorAll('.category-card');
        const filterSection = document.getElementById('categoryFilterSection');
        const filterGrid = document.getElementById('categoryProductsGrid');
        const filterTitle = document.getElementById('currentCategoryTitle');
        const hideBtn = document.getElementById('showAllCategories');

        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.getAttribute('data-category');

                // Filtrar usando la función de normalización (evita líos con tildes y eñes)
                const filtrados = productos.filter(p => normalizeText(p.Categoria) === normalizeText(cat));

                filterTitle.textContent = `Colección: ${cat}`;
                filterGrid.innerHTML = '';

                if (filtrados.length === 0) {
                    filterGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Próximamente tendremos más productos en esta categoría.</p>`;
                }
                else {
                    filtrados.forEach(p => filterGrid.appendChild(createProductCard(p)));
                }

                filterSection.style.display = 'block';
                rebindAddToCart();

                // Scroll suave a los resultados
                window.scrollTo({
                    top: filterSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });

        hideBtn?.addEventListener('click', () => {
            filterSection.style.display = 'none';
        });
    }

    function rebindAddToCart() {
        // Event listener para cambio de talla - actualizar precio y stock
        document.querySelectorAll('.size-selector').forEach(selector => {
            selector.onchange = (e) => {
                const card = e.target.closest('.product-card');
                const priceElement = card?.querySelector('.price');
                const addBtn = card?.querySelector('.add-to-cart-btn');
                const selectedOption = e.target.options[e.target.selectedIndex];
                const price = selectedOption?.dataset?.price || priceElement?.dataset?.basePrice;
                const stockTalla = selectedOption?.dataset?.stock;

                if (priceElement && price) {
                    const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
                    priceElement.textContent = formattedPrice;
                    if (addBtn) {
                        addBtn.dataset.price = price;
                        addBtn.dataset.stock = stockTalla;
                    }
                }
            };
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const product = productos.find(p => (p.Referencia || p.ID_Referencia) == id);
                if (product) {
                    // Verificar si el producto tiene tallas
                    const tallasRaw = product.Tallas || product.Talla || '';
                    const tallas = tallasRaw.split(',').map(t => t.trim()).filter(t => t !== '');

                    if (tallas.length > 0) {
                        // Buscar el selector de tallas en la misma tarjeta
                        const card = e.currentTarget.closest('.product-card');
                        const sizeSelector = card?.querySelector('.size-selector');
                        const selectedSize = sizeSelector?.value;

                        if (!selectedSize) {
                            showToast('Por favor selecciona una talla', 'fa-solid fa-ruler-combined');
                            return;
                        }

                        // Obtener el precio y stock de la talla seleccionada
                        const selectedOption = sizeSelector?.options[sizeSelector?.selectedIndex];
                        const price = parseFloat(selectedOption?.dataset?.price) || cleanPrice(product.Precio);
                        const stockTalla = parseInt(selectedOption?.dataset?.stock);
                        const stock = stockTalla !== undefined && !isNaN(stockTalla) ? stockTalla : parseInt(product.Stock) || 99;

                        // Verificar si hay stock disponible para esta talla
                        if (stock === 0) {
                            showToast('Esta talla está agotada', 'fa-solid fa-circle-xmark');
                            return;
                        }

                        addToCart(product, selectedSize, price, stock);
                    } else {
                        const price = parseFloat(e.currentTarget.dataset.price) || cleanPrice(product.Precio);
                        const stock = parseInt(product.Stock) || 99;
                        addToCart(product, null, price, stock);
                    }
                }
            };
        });
    }

    // Funciones del Carrito
    function addToCart(product, size = null, precioUnitario = null, stockTalla = null) {
        const idRef = product.Referencia || product.ID_Referencia;
        const stock = stockTalla !== null ? stockTalla : (parseInt(product.Stock) || 99);

        // Usar el precio proporcionado o calcularlo
        const precioBase = precioUnitario !== null ? precioUnitario : (getFinalPrice(product) || cleanPrice(product.Precio));

        // Buscar si ya existe el producto con la misma talla
        const exist = cart.find(item => (item.Referencia || item.ID_Referencia) == idRef && item.talla === size);

        // Validar stock disponible
        if (stock === 0) {
            showToast('Producto agotado', 'fa-solid fa-circle-xmark');
            return;
        }

        if (exist) {
            if (exist.cantidad >= stock) {
                showToast('No hay más unidades disponibles de esta talla', 'fa-solid fa-circle-xmark');
                return;
            }
            exist.cantidad++;
        } else {
            cart.push({ ...product, cantidad: 1, talla: size, precioUnitario: precioBase, Stock: stock });
        }
        saveCartToStorage();
        updateCartUI();
        showToast(`¡Añadido al carrito!`);

        // Animación en la burbuja del carrito
        cartCountElement.style.transform = 'scale(1.5)';
        setTimeout(() => cartCountElement.style.transform = 'scale(1)', 300);
    }

    function updateCartUI() {
        if (!cartItemsContainer) return;
        cartItemsContainer.replaceChildren();
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'empty-cart-msg';
            empty.textContent = 'Tu carrito está vacío. ¡Anímate a elegir algo hermoso!';
            cartItemsContainer.appendChild(empty);
        } else {
            cart.forEach((item) => {
                const idRef = item.Referencia || item.ID_Referencia;
                const imgRaw = item.Imagen || item.Imagen_URL || item.Image;
                const imgUrl = formatDriveImage(imgRaw);
                const precioUnidad = item.precioUnitario || getFinalPrice(item);

                totalItems += item.cantidad;
                totalPrice += precioUnidad * item.cantidad;

                const formattedPrice = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0
                }).format(precioUnidad);

                const row = document.createElement('div');
                row.className = 'cart-item';

                const img = document.createElement('img');
                img.className = 'cart-item-img';
                img.src = imgUrl;
                img.alt = item.Nombre || '';
                img.onerror = function () {
                    this.src = 'https://placehold.co/100x100/f3f3f3/a1a1a1?text=N/A';
                };

                const details = document.createElement('div');
                details.className = 'cart-item-details';

                const title = document.createElement('h4');
                title.className = 'cart-item-title';
                title.textContent = item.Nombre || '';
                details.appendChild(title);

                if (item.talla) {
                    const sizeRow = document.createElement('div');
                    sizeRow.className = 'cart-item-size';
                    const ic = document.createElement('i');
                    ic.className = 'fa-solid fa-ruler-combined';
                    sizeRow.appendChild(ic);
                    sizeRow.appendChild(document.createTextNode(` Talla: ${item.talla}`));
                    details.appendChild(sizeRow);
                }

                const priceEl = document.createElement('div');
                priceEl.className = 'cart-item-price';
                priceEl.textContent = formattedPrice;
                details.appendChild(priceEl);

                const controls = document.createElement('div');
                controls.className = 'cart-item-controls';

                const minusBtn = document.createElement('button');
                minusBtn.type = 'button';
                minusBtn.className = 'qty-btn';
                minusBtn.textContent = '-';
                minusBtn.addEventListener('click', () =>
                    window.updateQty(idRef, -1, item.talla != null ? item.talla : null)
                );

                const qtySpan = document.createElement('span');
                qtySpan.className = 'item-qty';
                qtySpan.textContent = String(item.cantidad);

                const stockMax = getStockByTalla(productos.find(p => (p.Referencia || p.ID_Referencia) == idRef), item.talla);

                const plusBtn = document.createElement('button');
                plusBtn.type = 'button';
                plusBtn.className = 'qty-btn';
                plusBtn.textContent = '+';
                if (item.cantidad >= stockMax) {
                    plusBtn.disabled = true;
                    plusBtn.style.opacity = '0.5';
                    plusBtn.style.cursor = 'not-allowed';
                }
                plusBtn.addEventListener('click', () =>
                    window.updateQty(idRef, 1, item.talla != null ? item.talla : null)
                );

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'remove-item';
                removeBtn.title = 'Eliminar';
                removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
                removeBtn.addEventListener('click', () =>
                    window.removeFromCart(idRef, item.talla != null ? item.talla : null)
                );

                controls.append(minusBtn, qtySpan, plusBtn, removeBtn);
                details.appendChild(controls);

                row.appendChild(img);
                row.appendChild(details);
                cartItemsContainer.appendChild(row);
            });
        }

        if (cartCountElement) cartCountElement.textContent = String(totalItems);
        if (cartTotalElement) {
            cartTotalElement.textContent = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
            }).format(totalPrice);
        }
    }

    window.updateQty = (id, change, size = null) => {
        const item = cart.find(i => (i.Referencia || i.ID_Referencia) == id && i.talla === size);
        if (item) {
            const productMaster = productos.find(p => (p.Referencia || p.ID_Referencia) == id);
            const stockMax = getStockByTalla(productMaster, size);

            if (change > 0 && item.cantidad >= stockMax) {
                showToast(`Lo sentimos, solo hay ${stockMax} unidades disponibles.`, 'fa-solid fa-circle-xmark');
                return;
            }
            item.cantidad += change;
            if (item.cantidad <= 0) {
                cart = cart.filter(i => !((i.Referencia || i.ID_Referencia) == id && i.talla === size));
            }
            saveCartToStorage();
            updateCartUI();
        }
    };

    window.clearCart = () => {
        if (cart.length === 0) return;
        if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
            cart = [];
            saveCartToStorage();
            updateCartUI();
            showToast('Carrito vaciado', 'fa-solid fa-trash-can');
        }
    };

    clearCartBtn?.addEventListener('click', window.clearCart);

    window.removeFromCart = (id, size = null) => {
        cart = cart.filter(i => !((i.Referencia || i.ID_Referencia) == id && i.talla === size));
        saveCartToStorage();
        updateCartUI();
    };

    // Lightbox functions for viewing images
    window.openLightbox = (src) => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    function saveCartToStorage() {
        localStorage.setItem('muminita_cart', JSON.stringify(cart));
    }

    function loadCartFromStorage() {
        const saved = localStorage.getItem('muminita_cart');
        if (saved) {
            cart = JSON.parse(saved);
            updateCartUI();
        }
    }

    // Toggle Sidebar Carrito
    cartBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeSidebar = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeCartBtn?.addEventListener('click', closeSidebar);
    cartOverlay?.addEventListener('click', closeSidebar);

    // Finalizar Compra - Mostrar formulario de datos del cliente
    checkoutBtn?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Agrega productos al carrito primero.');
            return;
        }

        // Mostrar formulario de datos del cliente
        cartItemsContainer.style.display = 'none';
        cartFooter.style.display = 'none';
        customerFormContainer.style.display = 'block';

        // Enfocar el primer campo
        setTimeout(() => {
            document.getElementById('customerName')?.focus();
        }, 100);
    });

    // Botón para volver al carrito desde el formulario
    backToCartBtn?.addEventListener('click', () => {
        customerFormContainer.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        cartFooter.style.display = 'block';
    });

    // Validar y enviar formulario de datos del cliente
    customerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('customerName').value.trim();
        const tipoId = document.getElementById('idType').value;
        const numeroId = document.getElementById('idNumber').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const telefono = ''; // Removido del formulario
        const metodoPago = ''; // Removido del formulario

        // Validar campos requeridos
        if (!nombre || !tipoId || !numeroId) {
            formError.textContent = 'Por favor completa todos los campos requeridos.';
            formError.style.display = 'block';
            return;
        }

        // Guardar datos del cliente
        customerData = {
            nombre: nombre,
            tipoId: tipoId,
            numeroId: numeroId,
            email: email,
            autorizado: true,
            fechaAutorizacion: new Date().toISOString()
        };

        // Ocultar mensaje de error
        formError.style.display = 'none';

        // Guardar registro legal en Supabase (Recomendación Ley 1581)
        try {
            await saveLegalConsent(customerData);
        } catch (error) {
            console.error("Error guardando consentimiento:", error);
            // Continuamos de todos modos pero registramos el error
        }

        await processCheckoutWithCustomer();
    });

    // Checkout: solo pedido por WhatsApp. Facturación e inventario → admin.
    async function processCheckoutWithCustomer() {
        const originalText = confirmCheckoutBtn.innerHTML;
        confirmCheckoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparando pedido...';
        confirmCheckoutBtn.disabled = true;

        try {
            let freshInventory = null;
            try {
                freshInventory = await fetchFreshInventory();
            } catch (err) {
                console.warn('No se pudo verificar inventario en línea (se continúa con el pedido):', err);
            }

            const productosNoDisponibles = [];
            if (freshInventory && freshInventory.length > 0) {
                cart.forEach((item) => {
                    const idRef = item.Referencia || item.ID_Referencia;
                    const productoFresco = freshInventory.find(
                        (p) => (p.Referencia || p.ID_Referencia) == idRef
                    );
                    if (!productoFresco) return;
                    const avail = getStockByTalla(productoFresco, item.talla);
                    if (avail === 0) {
                        productosNoDisponibles.push(
                            `${item.Nombre}${item.talla ? ` — Talla ${item.talla}` : ''} (agotado)`
                        );
                    } else if (item.cantidad > avail) {
                        productosNoDisponibles.push(
                            `${item.Nombre}: pediste ${item.cantidad}, hay ${avail} disponible(s)`
                        );
                    }
                });
            }

            if (productosNoDisponibles.length > 0) {
                const continuar = confirm(
                    `⚠️ Revisa el inventario:\n\n${productosNoDisponibles.join('\n')}\n\n¿Continuar y enviar el pedido por WhatsApp?`
                );
                if (!continuar) return;
            }

            let total = 0;
            let mensaje = 'Hola MumiNita 🤗, quiero pedir:\n\n';

            cart.forEach((item) => {
                const precioUnidad = item.precioUnitario || getFinalPrice(item);
                const sum = precioUnidad * item.cantidad;
                total += sum;
                const idRef = item.Referencia || item.ID_Referencia;
                const sizeInfo = item.talla ? ` - Talla: ${item.talla}` : '';
                mensaje += `👉 ${item.cantidad}x ${item.Nombre} (Ref: ${idRef}${sizeInfo}) - ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precioUnidad)})\n`;
            });

            const totalFormat = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
            }).format(total);

            mensaje += `\n*Total estimado: ${totalFormat}*\n\n`;
            mensaje += `*📋 DATOS DEL CLIENTE:*\n`;
            mensaje += `• Nombre: ${customerData.nombre}\n`;
            mensaje += `• Identificación: ${customerData.tipoId} ${customerData.numeroId}\n`;
            if (customerData.email) mensaje += `• Email: ${customerData.email}\n`;
            mensaje += `\n✅ *Autorizo y Aceptó:* Autorizo el tratamiento de de mis datos personales, He leido y acepto la Política de Tratamiento de Datos.\n`;
            mensaje += `\nPor favor confírmame disponibilidad.`;

            const url = `https://wa.me/${CFG.WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');

            closeSidebar();
            customerForm.reset();
            customerFormContainer.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            cartFooter.style.display = 'block';

            cart = [];
            saveCartToStorage();
            updateCartUI();
            showToast('Pedido listo en WhatsApp. Te responderemos pronto.', 'fa-brands fa-whatsapp');
        } catch (error) {
            console.error('Checkout:', error);
            alert('No se pudo completar el pedido. Intenta de nuevo.');
        } finally {
            confirmCheckoutBtn.innerHTML = originalText;
            confirmCheckoutBtn.disabled = false;
        }
    }

    // Helper: Convertir CSV a Objetos Javascript
    function csvToObjects(csvText) {
        if (!csvText) return [];

        // Limpieza profunda de caracteres ocultos y normalización de saltos de línea
        const cleanContent = csvText.replace(/^\uFEFF/, "").trim();
        const lines = cleanContent.split(/\r?\n/).filter(l => l.trim() !== "");

        if (lines.length < 2) return [];

        const rawHeaders = parseCSVLine(lines[0]);
        const keys = rawHeaders.map(h => normalizeText(h));
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            const item = {};

            for (let j = 0; j < keys.length; j++) {
                const k = keys[j];
                const val = (values[j] || "").trim();

                item[rawHeaders[j]] = val; // Guardar original

                // Mapeo por alias para el código
                if (k === "nombre") item.Nombre = val;
                if (k === "categoria") item.Categoria = val;
                if (k === "precio") item.Precio = val;
                if (k.includes("imagen")) item.Imagen = val;
                if (k.includes("referencia")) item.Referencia = val;
                if (k === "etiqueta") item.Etiqueta = val;
            }

            if (item.Nombre) result.push(item);
        }
        return result;
    }

    // Helper: Manejar caracteres especiales, comas y comillas en el CSV
    function parseCSVLine(text) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else current += char;
        }
        result.push(current.trim());
        return result;
    }

    // Función para habilitar/deshabilitar botón de confirmación
    function updateConfirmButtonState() {
        if (confirmCheckoutBtn) {
            confirmCheckoutBtn.disabled = !(authDataCheck?.checked && acceptPolicyCheck?.checked);
        }
    }

    authDataCheck?.addEventListener('change', updateConfirmButtonState);
    acceptPolicyCheck?.addEventListener('change', updateConfirmButtonState);

    // Función para guardar el consentimiento legal en Supabase
    async function saveLegalConsent(data) {
        try {
            const response = await fetch(
                `${CFG.SUPABASE_URL}/rest/v1/auditoria_legal_datos`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': CFG.SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${CFG.SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({
                        nombre: data.nombre,
                        identificacion: data.numeroId || 'N/A',
                        tipo_id: data.tipoId || 'N/A',
                        email: data.email || null,
                        fecha_autorizacion: data.fechaAutorizacion || new Date().toISOString(),
                        politica_version: '1.0'
                    })
                }
            );

            if (!response.ok) {
                const errText = await response.text();
                console.warn('Error guardando consentimiento legal:', errText);
            } else {
                console.log('✅ Consentimiento legal guardado correctamente.');
            }
        } catch (err) {
            console.warn('Error de red al guardar consentimiento:', err.message);
        }
    }

    // Iniciar todo
    initCatalog();
});
