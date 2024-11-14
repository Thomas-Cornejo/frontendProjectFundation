document.addEventListener("DOMContentLoaded", fetchAnimales);

async function fetchAnimales() {
    try {
        const response = await fetch('https://backendprojectfundation-production.up.railway.app/animals');
        const animales = await response.json();
        console.log(animales);
        const container = document.getElementById("animal-container");
        container.innerHTML = "";

        animales.forEach((animal) => {
            const animalCardHTML = `
        <div class="card">
            <div class="isotope-container row">
                <img src="${animal.image}" alt="Imagen de Mascota">
            </div>
            <div class="card-content">
                <h2>${animal.name}</h2>
                <div class="info">
                    <p><strong>Team:</strong> Fluff</p>
                    <p><strong>Breed:</strong> ${animal.breed_id}</p>
                    <p><strong>Age:</strong> ${animal.age} semanas</p>
                    <p><strong>Sex:</strong> ${animal.sex === "Male" ? "Male" : "Female"}</p>
                </div>
                <div class="button-adopted">
                    <a href="#" class="adopted">Adoptar</a>
                </div>
            </div>
        </div>`;
// Luego, puedes insertar esta tarjeta en el DOM, por ejemplo:
document.getElementById('animal-container').innerHTML += animalCardHTML;

        });

        // Registrar eventos click después de insertar los elementos en el DOM
        registerPopupEvents();
    } catch (error) {
        console.error("Error fetching animales:", error);
    }
}
function registerPopupEvents() {
    document.querySelectorAll(".popup-trigger").forEach(trigger => {
        console.log("Registrando evento click para: ", trigger);
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            const content = trigger.getAttribute("data-popup-text");
            console.log("Popup contenido: ", content);
            showPopup("Detalles del animalito", content);
        });
    });
}
function showPopup(title, content) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(popup);

    const closeButton = popup.querySelector(".popup-close");
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popup);
    });
}

// Estilos para el popup
const style = document.createElement("style");
style.innerHTML = `
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .popup-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        max-width: 400px;
        width: 80%;
        position: relative;
    }
    .popup-close {
        position: absolute;
        color: #ff8a8a;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
    }
    .popup-content h2 {
        margin-top: 0;
    }
`;
document.head.appendChild(style);
