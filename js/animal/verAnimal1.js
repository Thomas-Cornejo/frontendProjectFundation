document.addEventListener("DOMContentLoaded", initialize);

let breedMap = {}; 
async function initialize() {
    await fetchBreeds(); 
    fetchAnimales(); 
}
async function fetchBreeds() {
    try {
        const response = await fetch('backendprojectfundation-production.up.railway.app/animals/breeds');
        const breeds = await response.json();
        breeds.forEach(breed => {
            breedMap[breed.id_breed] = breed.name;
        });
    } catch (error) {
        console.error("Error fetching breeds:", error);
    }
}

async function fetchAnimales() {
    try {
        const response = await fetch('backendprojectfundation-production.up.railway.app/animals');
        const animales = await response.json();
        const container = document.getElementById("animal-container");
        container.innerHTML = "";
        const emptyCardHTML = `
            <div class="card empty-card">
                <a href= "adminAnimal/agregarAnimal.html" class="add-btn">
                    +
                </a>
            </div>`;
        container.innerHTML += emptyCardHTML;

        animales.forEach((animal) => {
            const breedName = breedMap[animal.breed_id] || "Desconocido"; 
            const animalCardHTML = `
            <div class="card">
                <div class="isotope-container row">
                    <img src="${animal.image}" alt="Imagen de Mascota">
                </div>
                <div class="card-content">
                    <h2>${animal.name}</h2>
                    <div class="info">
                        <p><strong>Breed:</strong> ${breedName}</p>
                        <p><strong>Age:</strong> ${animal.age}</p>
                        <p><strong>Sex:</strong> ${animal.sex === "1" ? "Macho" : "Hembra"}</p>
                    </div>
                    <div class="button-adopted">
                        <a href="../sesionAdmin/adminAnimal/AnimalPlus/formApadrinar.html?id_animal=${animal.id_animal}" class="adopted">Apadrinar</a>
                    </div>
                </div>
            </div>`;
            container.innerHTML += animalCardHTML;
        });

    } catch (error) {
        console.error("Error fetching animales:", error);
    }
}

