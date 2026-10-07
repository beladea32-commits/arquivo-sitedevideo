const nome = "Maiane";
const autor = "Bruno";
const senhaCorreta = "Maiane";

const mensagem = `
Maiane,

Eu fiquei pensando bastante em como
poderia te dizer isso...

E percebi que talvez não exista uma
forma perfeita de colocar em palavras.

Você se tornou alguém especial para mim.

Gosto das nossas conversas, dos momentos
que a gente compartilha e da forma como
você consegue fazer um momento simples
ficar diferente.

Então eu fiz isso aqui.

Não para encontrar palavras perfeitas,
mas simplesmente para te mostrar que
você é importante para mim.

Espero que você tenha gostado dessa
pequena surpresa. ❤️
`;


const accessScreen = document.getElementById("accessScreen");
const loadingScreen = document.getElementById("loadingScreen");
const letterScreen = document.getElementById("letterScreen");
const archiveScreen = document.getElementById("archiveScreen");
const finalScreen = document.getElementById("finalScreen");

const password = document.getElementById("password");
const accessButton = document.getElementById("accessButton");
const errorMessage = document.getElementById("errorMessage");

const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");

const message = document.getElementById("message");
const signature = document.getElementById("signature");

const archiveButton = document.getElementById("archiveButton");
const unlockFinalButton = document.getElementById("unlockFinalButton");

const secretMessage = document.getElementById("secretMessage");
const lockIcon = document.getElementById("lockIcon");

const finishButton = document.getElementById("finishButton");
const restartButton = document.getElementById("restartButton");


/* TROCA DE TELAS */

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");

}


/* SENHA */

accessButton.addEventListener("click", checkPassword);

password.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkPassword();
    }

});


function checkPassword() {

    if (password.value === senhaCorreta) {

        errorMessage.textContent = "";

        showScreen(loadingScreen);

        startLoading();

    } else {

        errorMessage.textContent = "ACESSO NEGADO.";

        password.value = "";

        password.classList.add("shake");

        setTimeout(() => {
            password.classList.remove("shake");
        }, 400);

    }

}


/* CARREGAMENTO */

function startLoading() {

    let progress = 0;

    const loadingMessages = [
        "Verificando acesso...",
        "Senha confirmada...",
        "Localizando arquivo...",
        "Descriptografando...",
        "Preparando conteúdo...",
        "Arquivo desbloqueado."
    ];

    const interval = setInterval(() => {

        progress += 2;

        progressBar.style.width = progress + "%";

        const index = Math.min(
            Math.floor(progress / 17),
            loadingMessages.length - 1
        );

        loadingText.textContent = loadingMessages[index];

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                showScreen(letterScreen);

                startTypewriter();

            }, 700);

        }

    }, 50);

}


/* EFEITO DE DIGITAÇÃO */

function startTypewriter() {

    message.textContent = "";

    let index = 0;

    function type() {

        if (index < mensagem.length) {

            message.textContent += mensagem.charAt(index);

            index++;

            setTimeout(type, 25);

        } else {

            signature.textContent = "— " + autor;

        }

    }

    type();

}


/* ARQUIVO 02 */

archiveButton.addEventListener("click", function() {

    showScreen(archiveScreen);

});


/* DESBLOQUEAR ÚLTIMA MENSAGEM */

unlockFinalButton.addEventListener("click", function() {

    lockIcon.textContent = "🔓";

    lockIcon.style.borderColor = "#ff0000";
    lockIcon.style.boxShadow = "0 0 30px rgba(255,0,0,.5)";

    unlockFinalButton.style.display = "none";

    document.querySelector(".archive-warning").textContent =
        "ACESSO CONCEDIDO";

    secretMessage.classList.add("show");

});


/* FINAL */

finishButton.addEventListener("click", function() {

    showScreen(finalScreen);

    createExplosion();

});


/* RECOMEÇAR */

restartButton.addEventListener("click", function() {

    location.reload();

});


/* PARTÍCULAS */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


for (let i = 0; i < 60; i++) {

    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
    });

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.y -= p.speed;

        if (p.y < 0) {
            p.y = canvas.height;
        }

        ctx.fillStyle = "rgba(255,0,0,.45)";

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();


/* EXPLOSÃO FINAL */

function createExplosion() {

    for (let i = 0; i < 50; i++) {

        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.width = "4px";
        particle.style.height = "4px";
        particle.style.background = "#ff0000";
        particle.style.borderRadius = "50%";
        particle.style.left = "50%";
        particle.style.top = "50%";
        particle.style.zIndex = "20";
        particle.style.pointerEvents = "none";

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 250 + 50;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.animate(
            [
                {
                    transform: "translate(-50%, -50%)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${x}px, ${y}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 1000,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            particle.remove();
        }, 1000);

    }

}