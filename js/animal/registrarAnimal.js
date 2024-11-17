const inputNombre = document.querySelector("#name");
const inputRaza = document.querySelector("#breed_id");
const inputBirthDate = document.querySelector("#stimated_date_birth");
const inputSex = document.querySelector("#sex");
const inputSize = document.querySelector("#size");
const inputColor = document.querySelector("#color");
const inputImage = document.querySelector("#image");
const inputHistory = document.querySelector("#history")
const form = document.querySelector("#formRegistro");
const alertMessage = document.querySelector("#alert");
const url = "http://localhost:3000";

form.addEventListener("submit", validarFormulario);

async function validarFormulario(evt) {
    evt.preventDefault();

    const name = inputNombre.value;
    const breed_id = inputRaza.value;
    const date = inputBirthDate.value;
    const sex = inputSex.value;
    const size = inputSize.value;
    const color = inputColor.value;
    const image = inputImage.files[0];
    const history = inputHistory.value;

    const nuevoAnimal = await crearAnimal({ name, breed_id, date, sex, size, color, image, history });
    console.log(nuevoAnimal);
    if (!nuevoAnimal.error) {
        showAlert("success", `Registro del animal exitoso. Animal ${name} ingresado.`);
        form.reset();
    }
}

async function crearAnimal({ name, breed_id, date, sex, size, color, image, history }) {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("breed_id", breed_id);
        formData.append("stimated_date_birth", date);
        formData.append("sex", sex);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("image", image);
        formData.append("history", history);

        const response = await fetch(`${url}/animals/crear`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Error al crear el animal.");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        showAlert("error", "Se produjo un error al crear el animal. Por favor, inténtelo de nuevo más tarde.");
        return { error: error.message };
    }
}

function showAlert(type, msg) {
    alertMessage.classList.remove("alert-danger", "alert-success");
    alertMessage.style.display = "block";
    if (type === "error") {
        alertMessage.classList.add("alert-danger");
        alertMessage.textContent = msg;
    } else if (type === "success") {
        alertMessage.classList.add("alert-success");
        alertMessage.textContent = msg;
    }
    setTimeout(() => {
        alertMessage.style.display = "none";
    }, 5000); // Ocultar la alerta después de 5 segundos
}
