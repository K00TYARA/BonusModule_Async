const loadBtn = document.querySelector("button");
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
let animateTimeout;
let rotationSpeed = 5;

function animate() {
    loader.style.transform = "rotate(" + rotationSpeed + "deg)";
    rotationSpeed += 5;
    animateTimeout = setTimeout(animate, 15);
}

function showLoader() {
    clearTimeout(animateTimeout);
    loader.style.display = "flex";
    animate();
}

function hideLoader() {
    container.style.display = "flex";
    loader.style.display = "none";
}

async function loadImages() {
    container.innerHTML = "";
    for (let i = 0; i < 2; i++) {
        try {
            showLoader();
            const res = await fetch(
                "https://api.thecatapi.com/v1/images/search?limit=10"
            );

            if (!res.ok) {
                throw new Error("Что-то пошло не так!");
            }

            const data = await res.json();
            setTimeout(() => {
                data.forEach((item) => {
                    const image = document.createElement("img");
                    image.classList.add("image");
                    image.src = item.url;

                    container.appendChild(image);
                });
                hideLoader();
            }, 3000);
        } catch (err) {
            hideLoader();
            container.innerHTML = `<p class="error">ЧТО-ТО ПОШЛО НЕ ТАК!</p>`;
        }
    }
}

loadBtn.addEventListener("click", loadImages);
