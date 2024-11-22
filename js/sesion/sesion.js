async function mostrarInformacion() {
    const id = localStorage.getItem("ID_USER");
    console.log("ID del usuario:", id);
    try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }
    const usuario = await response.json();

    document.getElementById("name").value = usuario.name;
    document.getElementById("lastname").value = usuario.lastname;
    document.getElementById("email").value = usuario.email;
    document.getElementById("phone").value = usuario.phone;
    document.getElementById("address").value = usuario.address;
    } catch (error) {
    }
}
mostrarInformacion();