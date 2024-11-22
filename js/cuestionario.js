document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const animalId = params.get("id_animal");
    const animalIdInput = document.getElementById("animal-id");
    animalIdInput.value = animalId;

    document.getElementById("questionnaire-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("ID_USER"); // Obtener el ID del usuario
        if (!userId) {
            alert("Debes iniciar sesión antes de responder el cuestionario.");
            window.location.href = "/login";
            return;
        }

        const animalId = document.getElementById("animal-id").value;
        const reason = document.getElementById("reason").value;
        const experience = document.getElementById("experience").value;
        const time = document.getElementById("time").value;
        const cost = document.getElementById("cost").value;
        const notification = document.getElementById("notification").value;
        const events = document.getElementById("events").value;
        const availability = document.getElementById("availability").value;
        const question = document.getElementById("question").value;

        if (!animalId || !reason || !experience || !time || !cost || !notification || !events || !availability) {
            alert("Por favor, completa todos los campos del formulario.");
            return;
        }

        const data = {
            animalId,
            userId,
            questions: {
                reason,
                experience,
                time,
                cost,
                notification,
                events,
                availability,
                question
            },
            state_id: 1,
        };
        console.log(data);
        try {
            const response = await fetch(`backendprojectfundation-production.up.railway.app/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Solicitud enviada correctamente. El administrador revisará tus respuestas.");
                location.replace("../../apadrinarPlus.html"); 
            } else {
                const errorData = await response.json();
                alert(`Error al enviar la solicitud: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Hubo un error al procesar tu solicitud.");
        }
    });
});
