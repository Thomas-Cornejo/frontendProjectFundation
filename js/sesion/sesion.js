async function mostrarInformacion() {
    const id = localStorage.getItem("ID_USER");
    console.log(id);
    try {
    const response = await fetch(`https://backendprojectfundation.onrender.com/usuarios/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    console.log(usuario);

    document.getElementById("name").textContent = usuario.name;
    document.getElementById("lastname").textContent = usuario.lastname;
    document.getElementById("email").textContent = usuario.email;
    document.getElementById("phone").textContent = usuario.telefono;
    document.getElementById("address").textContent = usuario.address;
    } catch (error) {
    console.log("error");
    }
}
mostrarInformacion();