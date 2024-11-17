const inputEmail = document.querySelector("#email");
const inputContraseña = document.querySelector("#password");
const form = document.querySelector("#formLogin");
const url = "http://localhost:3000";
const alertMessage = document.querySelector("#alert");

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
  evt.preventDefault();
  if (inputEmail.value === "" || inputContraseña.value === "") {
    showAlert("error", "Por favor, complete todos los campos.");
    return;
  } 
  const entrar = await login(inputEmail.value, inputContraseña.value);
  sessionStorage.setItem("token", entrar.token);
  if (entrar.error) {
    location.reload();
    return;
  }
  if (entrar.rol == 1) {
    location.replace("../sesionAdmin/redirectorAdmin.html");
  } else {
    location.replace("../sesion/redirectorUser.html");
  }
}
async function login(email, password) {
  const body = { email, password };
  const res = await fetch(`${url}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.error) {
    showAlert("error", json.msg);
    return;
  }
  return json;
}

function showAlert(type, msg) {
  alertMessage.classList.remove("alert", "alert-danger", "alert-success");
  if (type === "error") {
    alertMessage.classList.add("alert", "alert-danger");
    alertMessage.textContent = msg;
  }
}