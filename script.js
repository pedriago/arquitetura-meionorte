//retorno para o começo da página

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo"); // Seleciona a logo

    if (logo) {
        logo.addEventListener("click", function (e) {
            e.preventDefault(); // Evita comportamento padrão
            smoothScrollTo(0, 1200); // Agora a rolagem será mais suave (1200ms)
        });
    }

    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, startPosition + distance * progress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
});

//carrosel

document.addEventListener("DOMContentLoaded", function () {
    const imageFolder = "images/carousel/"; // Caminho da pasta das imagens
    const carouselSlide = document.getElementById("carousel-slide");
    const indicatorsContainer = document.getElementById("carousel-indicators");

    // Lista de imagens
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
        let slideIndex = 0; // Índice da imagem atual
        const slides = [];

        // Criar as imagens dinamicamente
        imageList.forEach((image, index) => {
            let imgElement = document.createElement("img");
            imgElement.src = imageFolder + image;
            imgElement.alt = "Projeto Arquitetônico";
            imgElement.classList.add("carousel-image");
            if (index === 0) imgElement.classList.add("active"); // Apenas a primeira visível
            carouselSlide.appendChild(imgElement);
            slides.push(imgElement);
        });

        function updateIndicators() {
            document.querySelectorAll(".indicator").forEach((indicator, index) => {
                indicator.classList.toggle("active", index === slideIndex);
            });
        }

        function moveSlide(direction) {
            slides[slideIndex].classList.remove("active"); // Remove a classe ativa da imagem atual

            slideIndex += direction;
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            } else if (slideIndex >= slides.length) {
                slideIndex = 0;
            }

            slides[slideIndex].classList.add("active"); // Adiciona a classe ativa na nova imagem

            updateIndicators(); // Atualiza os indicadores
        }

        // Criar os indicadores dinamicamente
        imageList.forEach((_, index) => {
            let indicator = document.createElement("div");
            indicator.classList.add("indicator");
            if (index === 0) indicator.classList.add("active"); // Primeiro começa ativo
            indicator.addEventListener("click", () => {
                slides[slideIndex].classList.remove("active");
                slideIndex = index;
                slides[slideIndex].classList.add("active");
                updateIndicators();
            });
            indicatorsContainer.appendChild(indicator);
        });

        // Auto-slide (opcional)
        setInterval(() => moveSlide(1), 4000);
    } else {
        console.error("Elemento #carousel-slide não encontrado!");
    }
    
});