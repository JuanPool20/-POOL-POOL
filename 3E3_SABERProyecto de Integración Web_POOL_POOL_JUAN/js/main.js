document.addEventListener('DOMContentLoaded', function(){
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  const showHintBtn = document.getElementById('showHint');

  // Tema: persistir elección en localStorage
  const currentTheme = localStorage.getItem('animelab-theme');
  if (currentTheme === 'light') body.classList.add('light');

  themeBtn.addEventListener('click', function(){
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
  });

// Navegación responsive mejorada
navToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
  navToggle.classList.toggle("active"); // << ESTA LÍNEA es la que faltaba

  const isOpen = navList.classList.contains("active");
  navToggle.setAttribute("aria-expanded", isOpen);
});




  // Lightbox funciones
  window.openLightbox = function(src){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.style.display = 'flex';
  };
  window.closeLightbox = function(e){
    if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg') {
      document.getElementById('lightbox').style.display = 'none';
      document.getElementById('lightboxImg').src = '';
    }
  };

  // PERFIL PERSONAJE CON MODAL Dragon Ball Super
  window.showProfile = function(name) {
    const modal = document.getElementById('profileModal');
    const modalName = document.getElementById('modalName');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtra = document.getElementById('modalExtra');
    const modalAvatar = document.getElementById('modalAvatar');

    const profiles = {
      'Goku': {
        description: 'Guerrero Saiyajin con habilidades de combate excepcionales.',
        extra: 'Curiosidad: Siempre busca superar sus límites y alcanzar nuevas transformaciones.',
        img: '<img src="assets/goku.jpg" alt="Goku">'
      },
      'Vegeta': {
        description: 'Príncipe Saiyajin, rival y compañero de Goku.',
        extra: 'Curiosidad: Tiene un orgullo inquebrantable y le encanta entrenar duro.',
        img: '<img src="assets/vegeta.jpg" alt="Vegeta">'
      },
      'Beerus': {
        description: 'Dios de la Destrucción, mantiene el equilibrio del universo.',
        extra: 'Curiosidad: Adora dormir y el pastel de pescado.',
        img: '<img src="assets/beerus.jpg" alt="Beerus">'
      },
      'Bulma': {
        description: 'Científica brillante y amiga de los Saiyajin.',
        extra: 'Curiosidad: Inventó la cápsula Hoi-Poi y ayuda en muchas aventuras.',
        img: '<img src="assets/bulma.jpeg" alt="Bulma">'
      }
    };

    modalName.innerText = name;
    modalDescription.innerText = profiles[name]?.description || 'Sin descripción';
    modalExtra.innerText = profiles[name]?.extra || '';
    modalAvatar.innerHTML = profiles[name]?.img || '';

    modal.style.display = 'block';
    modal.querySelector('.modal-content').classList.add('fade-in');
  };

  // Cerrar modal
  window.closeProfile = function() {
    const modal = document.getElementById('profileModal');
    modal.style.display = 'none';
  };

  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll("input, textarea");
  const formSuccess = document.getElementById("formSuccess");



  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    let isValid = true;
    formSuccess.textContent = "";

    inputs.forEach(input => {
      const label = input.parentElement;
      const errorMsg = label.querySelector(".error-msg");
      const errorIcon = label.querySelector(".input-icon.error");
      const successIcon = label.querySelector(".input-icon.success");

      // resetear estilos
      input.classList.remove("input-error", "input-success");
      if(errorIcon) errorIcon.style.opacity = 0;
      if(successIcon) successIcon.style.opacity = 0;
      if(errorMsg) errorMsg.textContent = "";

      if(input.value.trim() === ""){
        input.classList.add("input-error");
        if(errorIcon) errorIcon.style.opacity = 1;
        if(errorMsg) errorMsg.textContent = "Este campo es obligatorio";
        isValid = false;
      } else if(input.name === "email" && !validateEmail(input.value)){
        input.classList.add("input-error");
        if(errorIcon) errorIcon.style.opacity = 1;
        if(errorMsg) errorMsg.textContent = "Correo inválido";
        isValid = false;
      } else {
        input.classList.add("input-success");
        if(successIcon) successIcon.style.opacity = 1;
      }
    });

    if(isValid){
      formSuccess.textContent = "¡Mensaje enviado con éxito!";
      form.reset();
      inputs.forEach(input => input.classList.remove("input-success"));
      inputs.forEach(input => {
        const label = input.parentElement;
        const successIcon = label.querySelector(".input-icon.success");
        if(successIcon) successIcon.style.opacity = 0;
      });
    }
  });

  // Botón pista
  showHintBtn.addEventListener('click', function(){
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Pista: Revisa css/style.css para variables y layout. Revisa js/main.js para ver eventos.';
    document.querySelector('.hero').appendChild(hint);
    setTimeout(()=> hint.remove(), 6000);
  });
});

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙";
  }
});

// ================== MODAL NOTICIAS ==================

const modalNews = document.getElementById("newsModal");
const modalNewsTitle = document.getElementById("newsTitle");
const modalNewsImage = document.getElementById("newsImg");
const modalNewsText = document.getElementById("newsText");

const noticiasContenido = [
  {
    titulo: "Nueva Transformación Confirmada",
    imagen: "assets/goku.jpg",
    texto: "Goku ha alcanzado una nueva transformación que supera al Ultra Instinto..."
  },
  {
    titulo: "Dragon Ball Super 2025",
    imagen: "assets/vegeta.jpg",
    texto: "Se confirma una nueva temporada con animación mejorada y nueva historia original..."
  },
  {
    titulo: "Lanzamiento Global",
    imagen: "assets/beerus.jpg",
    texto: "La nueva película será lanzada mundialmente en cines este mismo año..."
  }
];

function abrirNoticia(id, e) {
  if(e) e.stopPropagation(); // 🚨 evita que el click cuente como fuera del modal
  modalNews.style.display = "flex";
  modalNewsTitle.textContent = noticiasContenido[id].titulo;
  modalNewsImage.src = noticiasContenido[id].imagen;
  modalNewsText.textContent = noticiasContenido[id].texto;
}


// cerrar con la X
document.querySelector(".close-news").addEventListener("click", () => {
  modalNews.style.display = "none";
});

// cerrar clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modalNews && !modalNews.querySelector(".modal-content").contains(e.target)) {
    modalNews.style.display = "none";
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

//musica
const musicBtn = document.getElementById('musicBtn');
const animeMusic = document.getElementById('animeMusic');
let isPlaying = false;

// Función para reproducir o pausar
musicBtn.addEventListener('click', () => {
  if (!isPlaying) {
    animeMusic.play();
    isPlaying = true;
    musicBtn.textContent = "⏸";
  } else {
    animeMusic.pause();
    isPlaying = false;
    musicBtn.textContent = "▶︎";
  }
});

// Opcional: control de volumen inicial
animeMusic.volume = 0.5; // 0 a 1

//acerca de...
const aboutBtn = document.getElementById('aboutBtn');
const aboutSection = document.getElementById('aboutSection');
const closeAbout = document.getElementById('closeAbout');

aboutBtn.addEventListener('click', () => {
  aboutSection.classList.add('active');
});

closeAbout.addEventListener('click', () => {
  aboutSection.classList.remove('active');
});
