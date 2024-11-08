async function mostrarInformacion() {
    const id = localStorage.getItem("ID_USER");
    console.log("ID_USER:", id);
    try {
    const response = await fetch(`https://backendprojectfundation-production.up.railway.app/usuarios/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    console.log(usuario);

    document.getElementById("name").value = usuario.name;
    document.getElementById("lastname").value = usuario.lastname;
    document.getElementById("email").value = usuario.email;
    document.getElementById("phone").value = usuario.phone;
    document.getElementById("address").value = usuario.address;
    } catch (error) {
    console.log("error", error);
    }
}
mostrarInformacion();