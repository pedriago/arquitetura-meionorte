document.addEventListener("DOMContentLoaded", function () {
    
    // MENU HAMBÚRGUER (Agora fecha ao clicar em um link)
    function toggleMenu() {
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.toggle("menu-open");
    }

    document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
    
    document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            document.getElementById("nav-menu").classList.remove("menu-open");
        });
    });

    // ROLAGEM SUAVE PARA O TOPO AO CLICAR NA LOGO
    const logo = document.getElementById("logo");
    if (logo) {
        logo.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // CARROSSEL DE IMAGENS (Corrigido para melhor adaptação)
    const imageFolder = "images/carousel/";
    const carouselSlide = document.getElementById("carousel-slide");
    const indicatorsContainer = document.getElementById("carousel-indicators");

    const imageList = [
        "aquino-soares-fachada.webp",
        "casa-m2.webp",
        "ck-jantar.webp",
        "ck-cozinha.webp",
        "ck-sala.webp",
        "ck-suíte.webp",
        "lazer-vp.webp",
        "lazer-vp-dia.webp",
        "pinhalzinho-fachada.webp",
        "pinhalzinho-fachada-01.webp",
        "pinhalzinho-varanda.webp",
        "vovo-bernardo-fachada.webp",
        "vovo-bernardo-sala.webp",
        "ck-ep-01.webp"
    ];

    if (carouselSlide) {
        let slideIndex = 0;
        const slides = [];

        // Criar imagens dinamicamente
        imageList.forEach((image, index) => {
            let imgElement = document.createElement("img");
            imgElement.src = imageFolder + image;
            imgElement.alt = "Projeto Arquitetônico";
            imgElement.classList.add("carousel-image");
            if (index === 0) imgElement.classList.add("active");
            carouselSlide.appendChild(imgElement);
            slides.push(imgElement);
        });

        function updateIndicators() {
            document.querySelectorAll(".indicator").forEach((indicator, index) => {
                indicator.classList.toggle("active", index === slideIndex);
            });
        }

        function moveSlide(direction) {
            slides[slideIndex].classList.remove("active");

            slideIndex += direction;
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            } else if (slideIndex >= slides.length) {
                slideIndex = 0;
            }

            slides[slideIndex].classList.add("active");
            updateIndicators();
        }

        // Criar indicadores dinamicamente
        imageList.forEach((_, index) => {
            let indicator = document.createElement("div");
            indicator.classList.add("indicator");
            if (index === 0) indicator.classList.add("active");
            indicator.addEventListener("click", () => {
                slides[slideIndex].classList.remove("active");
                slideIndex = index;
                slides[slideIndex].classList.add("active");
                updateIndicators();
            });
            indicatorsContainer.appendChild(indicator);
        });

        // Auto-slide
        setInterval(() => moveSlide(1), 4000);
    }
});