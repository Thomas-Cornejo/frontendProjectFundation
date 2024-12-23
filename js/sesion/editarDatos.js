const inputNombre = document.querySelector("#nombres");
const inputApellido = document.querySelector("#apellidos");
const inputCedula = document.querySelector("#cedula");
const inputTelefono = document.querySelector("#telefono");
const inputEmail = document.querySelector("#email");
const inputContraseña = document.querySelector("#contraseña");
const form = document.querySelector("#formRegistro");
const url = "backendprojectfundation-production.up.railway.app";
const alertMessage = document.querySelector("#alert");

document.addEventListener("DOMContentLoaded", mostrarInformacion);

async function mostrarInformacion() {
  const id = localStorage.getItem("ID_USER");
  try {
    const response = await fetch(`${url}/usuarios/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener el usuario");
    }

    const usuario = await response.json();
    console.log(usuario);

    if (usuario) {
      document.getElementById("nombres").value = usuario.name;
      document.getElementById("apellidos").value = usuario.lastname;
      document.getElementById("cedula").value = usuario.cedula;
      document.getElementById("telefono").value = usuario.telefono;
      document.getElementById("email").value = usuario.email;
      document.getElementById("contraseña").value = usuario.contraseña;
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
    inputCedula.value,
    inputTelefono.value,
    inputEmail.value,
    inputContraseña.value
  );
  console.log(usuarioNuevo);

  if (!usuarioNuevo.error) {
    console.log("Usuario actualizado correctamente");
    location.replace("sesion.html");
  } else {
    console.log("Error al actualizar el usuario:", usuarioNuevo.error);
  }
}

async function actualizar(
  name,
  lastname,
  cedula,
  telefono,
  email,
  contraseña
) {
  try {
    const id = localStorage.getItem("ID_USER");
    console.log("ID del usuario:", id);

    const body = {
      name,
      lastname,
      cedula,
      telefono,
      email,
      contraseña,
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
