document.addEventListener("DOMContentLoaded", initialize);

let breedMap = {}; 
async function initialize() {
    await fetchBreeds(); 
    fetchAnimales(); 
}
async function fetchBreeds() {
    try {
        const response = await fetch('https://backendprojectfundation-production.up.railway.app/breeds');
        const breeds = await response.json();
        breeds.forEach(breed => {
            breedMap[breed.id] = breed.name;
        });
    } catch (error) {
        console.error("Error fetching breeds:", error);
    }
}

async function fetchAnimales() {
    try {
        const response = await fetch('https://backendprojectfundation-production.up.railway.app/animals');
        const animales = await response.json();
        const container = document.getElementById("animal-container");
        container.innerHTML = "";

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
                        <p><strong>Team:</strong> Fluff</p>
                        <p><strong>Breed:</strong> ${breedName}</p>
                        <p><strong>Age:</strong> ${animal.age} semanas</p>
                        <p><strong>Sex:</strong> ${animal.sex === "1" ? "Macho" : "Hembra"}</p>
                    </div>
                    <div class="button-adopted">
                        <a href="#" class="adopted">Adoptar</a>
                    </div>
                </div>
            </div>`;
            container.innerHTML += animalCardHTML;
        });

    } catch (error) {
        console.error("Error fetching animales:", error);
    }
}
