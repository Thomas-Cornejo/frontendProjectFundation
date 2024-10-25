const inputNombre = document.querySelector("#name");
const inputApellido = document.querySelector("#lastname");
const inputTelefono = document.querySelector("#phone");
const inputEmail = document.querySelector("#email");
const inputDireccion = document.querySelector("#address");  
const inputContraseña = document.querySelector("#password");
const inputRol = document.querySelector("#rol_id");
const form = document.querySelector("#formRegistro");
const url = "https://backendprojectfundation.onrender.com";
const alertMessage = document.querySelector("#alert");

document.addEventListener("DOMContentLoaded", mostrarInformacion);

async function mostrarInformacion() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    console.log("No hay ID de usuario en la URL");
    return;
  }

  try {
    const response = await fetch(`${url}/usuarios/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    console.log(usuario);

    if (usuario) {
      document.getElementById("name").value = usuario.name;
      document.getElementById("lastname").value = usuario.lastname;
      document.getElementById("phone").value = usuario.phone;
      document.getElementById("email").value = usuario.email;
      document.getElementById("address").value = usuario.adress;
      document.getElementById("password").value = usuario.password;
      document.getElementById("rol_id").value = usuario.rol_id;
    } else {
      console.log("Estructura de datos inesperada:", usuario);
    }
  } catch (error) {
    console.log("Error al obtener el usuario:", error);
  }
}

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();

  if (inputNombre.value === "" || inputApellido.value === "") {
    return;
  }

  const usuarioNuevo = await actualizar(
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputDireccion.value,
    inputRol.value,
    inputContraseña.value
  );
  console.log(usuarioNuevo);

  if (!usuarioNuevo.error) {
    console.log("Usuario actualizado correctamente");
    location.replace("usuarios.html");
  } else {
    console.log("Error al actualizar el usuario:", usuarioNuevo.error);
  }
}

async function actualizar(
  name,
  lastname,
  phone,
  email,
  address,
  password,
  rol_id
) {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log("ID del usuario:", id);

    const body = {
      name,
      lastname,
      phone,
      email,
      address,
      password,
      rol_id,
    };
    console.log("Datos a enviar:", body);

    const res = await fetch(`${url}/usuarios/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return { error: error.message };
  }
}
