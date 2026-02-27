// ================= MENU HAMBURGUESA =================
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
    toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
});

    const links = document.querySelectorAll("#menu a");
    links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        toggle.classList.remove("active");
    });
});

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
    }
});
}

// ================= NAVBAR SCROLL =================
const navbar = document.querySelector(".navegacion");

if (navbar) {
    window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
}

// ================= MODAL =================
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';

    const slides = modal.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

modal.querySelectorAll('.prev, .next').forEach(btn => {
    btn.onclick = () => {
        if (btn.classList.contains('prev')) {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
        } else {
        showSlide((currentSlide + 1) % slides.length);
        }
    };
});

    showSlide(0);

    modal.onclick = (e) => {
    if (e.target === modal) cerrarModal(modalId);
}
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// ================= FLIP CARDS =================
const flipCards = document.querySelectorAll('.foto-flip');

flipCards.forEach(card => {
    card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    });
});

window.addEventListener('load', () => {
    flipCards.forEach(card => {
    card.style.perspective = "1000px";
    });
});
// ================= BOTON CV (EVITA FLIP) =================
const cvBtn = document.querySelector('.btn-cv');

if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // evita que la card se vuelva a girar

        const card = e.target.closest('.foto-flip');
        if (card) card.classList.remove('flipped');
    });
}

// ================= CAMBIAR SLIDE =================
function cambiarSlide(direccion, modalId) {
    const modal = document.getElementById(modalId);
    const slides = modal.querySelectorAll(".slide");

    let index = 0;

    slides.forEach((slide, i) => {
    if (slide.classList.contains("active")) {
        index = i;
        slide.classList.remove("active");
    }
});

    index += direccion;

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides[index].classList.add("active");
}

// ================= FORMULARIO =================
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
const button = document.querySelector(".btn-enviar");

if (form) {
    form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = new FormData(form);

    button.textContent = "Enviando...";
    button.disabled = true;
    button.style.opacity = "0.7";

    try {
        const response = await fetch("https://formsubmit.co/ajax/yasarevalo05@gmail.com", {
        method: "POST",
        body: data
        });

        if (response.ok) {
        message.textContent = "Mensaje enviado correctamente ✨";
        message.style.color = "#00ff88";
        message.classList.add("show");
        form.reset();
        } else {
        message.textContent = "Hubo un error. Intentá nuevamente.";
        message.style.color = "red";
        message.classList.add("show");
        }

    } catch (error) {
        message.textContent = "Error de conexión.";
        message.style.color = "red";
        message.classList.add("show");
    }

    button.textContent = "Enviar mensaje 🚀";
    button.disabled = false;
    button.style.opacity = "1";
    
    setTimeout(() => {
    message.classList.remove("show");
    }, 4000);
});
}

// ================= REVEAL SCROLL =================
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
    } else {
        element.classList.remove("active");
    }
});
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);