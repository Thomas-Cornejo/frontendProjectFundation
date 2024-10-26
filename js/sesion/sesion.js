async function mostrarInformacion() {
    const id = localStorage.getItem("ID_USER");
    console.log("ID_USER:", id);
    try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    console.log(usuario);

    document.getElementById("name").textContent = usuario.name;
    document.getElementById("lastname").textContent = usuario.lastname;
    document.getElementById("email").textContent = usuario.email;
    document.getElementById("phone").textContent = usuario.phone;
    document.getElementById("address").textContent = usuario.address;
    } catch (error) {
    console.log("error");
    }
}
mostrarInformacion();