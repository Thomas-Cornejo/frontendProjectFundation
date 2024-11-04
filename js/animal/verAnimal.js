async function mostrarInformacion() {
    // const id = localStorage.getItem("ID_ANIMAL");
    // console.log(id);
    try {
    const response = await fetch(`https://backendprojectfundation-production.up.railway.app/animals/5`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el animal");
    }

    const animal = await response.json();
    console.log(animal);

    document.getElementById("name").textContent = animal.name;
    document.getElementById("age").textContent = animal.age;
    document.getElementById("race").textContent = animal.race;
    document.getElementById("gender").textContent = animal.gender;
    document.getElementById("weight").textContent = animal.weight;
    document.getElementById("imagen").src = animal.imagen;    
        
    } catch (error) {
    console.log("error");
    }
}
mostrarInformacion();