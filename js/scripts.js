/*!
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // --- LÓGICA DE GALERÍA DE PRODUCTOS (CARRUSEL) ---
    const products = [
        {
            name: "Péptidos",
            description: "Tratamiento de labios restaurador",
            image: "assets/img/peptidos.png"
        },
        {
            name: "Rubores",
            description: "Un enrojecimiento natural",
            image: "assets/img/rubores.png"
        },
        {
            name: "Lápiz de labio",
            description: "Delineado preciso y duradero",
            image: "assets/img/lápiz de labio.png"
        }
    ];

    let currentIndex = 1; // Comenzamos con "Rubores" (índice 1) en el centro

    const leftCard = document.querySelector('.gallery-card-left');
    const rightCard = document.querySelector('.gallery-card-right');
    const featuredCard = document.querySelector('.gallery-card-featured');
    
    const leftArrow = document.querySelector('.gallery-arrow-left');
    const rightArrow = document.querySelector('.gallery-arrow-right');
    
    const titleEl = document.querySelector('.gallery-card-title');
    const subtitleEl = document.querySelector('.gallery-card-subtitle');

    function updateGallery() {
        const leftIndex = (currentIndex - 1 + products.length) % products.length;
        const rightIndex = (currentIndex + 1) % products.length;

        // Actualizar tarjeta izquierda
        if (leftCard) {
            const img = leftCard.querySelector('img');
            if (img) {
                img.src = products[leftIndex].image;
                img.alt = products[leftIndex].name;
            }
        }

        // Actualizar tarjeta central destacada
        if (featuredCard) {
            const img = featuredCard.querySelector('img');
            if (img) {
                img.src = products[currentIndex].image;
                img.alt = products[currentIndex].name;
            }
        }

        // Actualizar textos informativos
        if (titleEl) {
            titleEl.textContent = products[currentIndex].name;
        }
        if (subtitleEl) {
            subtitleEl.textContent = products[currentIndex].description;
        }

        // Actualizar tarjeta derecha
        if (rightCard) {
            const img = rightCard.querySelector('img');
            if (img) {
                img.src = products[rightIndex].image;
                img.alt = products[rightIndex].name;
            }
        }
    }

    // Transición suave al pasar productos
    function updateGalleryWithTransition(nextIndex) {
        const transitionElements = [];
        if (leftCard) transitionElements.push(leftCard.querySelector('img'));
        if (featuredCard) transitionElements.push(featuredCard.querySelector('img'));
        if (rightCard) transitionElements.push(rightCard.querySelector('img'));
        if (titleEl) transitionElements.push(titleEl);
        if (subtitleEl) transitionElements.push(subtitleEl);

        // Desvanecimiento inicial
        transitionElements.forEach(el => {
            if (el) {
                el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                el.style.opacity = '0.3';
                el.style.transform = 'scale(0.95)';
            }
        });

        // Actualizar información y desvanecer hacia adentro
        setTimeout(() => {
            currentIndex = nextIndex;
            updateGallery();
            
            transitionElements.forEach(el => {
                if (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'scale(1)';
                }
            });
        }, 200);
    }

    function slidePrev() {
        const nextIndex = (currentIndex - 1 + products.length) % products.length;
        updateGalleryWithTransition(nextIndex);
    }

    function slideNext() {
        const nextIndex = (currentIndex + 1) % products.length;
        updateGalleryWithTransition(nextIndex);
    }

    // Configurar listeners para flechas
    if (leftArrow) {
        leftArrow.addEventListener('click', slidePrev);
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', slideNext);
    }

    // Configurar listeners para hacer clic directo en las tarjetas laterales
    if (leftCard) {
        leftCard.addEventListener('click', slidePrev);
    }
    if (rightCard) {
        rightCard.addEventListener('click', slideNext);
    }

    // Renderizado inicial
    updateGallery();

});
