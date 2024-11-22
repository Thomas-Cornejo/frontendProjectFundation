async function cerrarSesion() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authChecked");
    location.replace("../login/login.html");
}

document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("authChecked")) {
        verificarRol([2]);
    }
});

async function verificarRol(rolesPermitidos) {
    try {
        console.log("Verificando rol...");
        const token = sessionStorage.getItem("token");
        console.log(token);

        const response = await fetch("http://localhost:3000/api/auth/me", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error("No autorizado");

        const data = await response.json();
        var userRole = data.rol;

        if (!rolesPermitidos.includes(userRole)) {
            window.location.replace("../login/login.html");
        } else {
            sessionStorage.setItem("authChecked", "true"); // Marcar como autenticado
        }
    } catch (error) {
        console.error("Error de autenticación:", error);
        window.location.replace("../login/login.html");
    }
}
