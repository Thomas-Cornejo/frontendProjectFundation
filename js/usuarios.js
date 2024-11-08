const inputRol = document.querySelector("#rol");

async function filtroRol() {
  document.querySelector("#root").innerHTML = "";
  const rol = inputRol.options[inputRol.selectedIndex].value;
  console.log(rol);
  const response = await fetch(`https://backendprojectfundation-production.up.railway.app/filtro/${rol}`);
  const usuarios = await response.json();

  console.log(usuarios);
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    // Genera la fila con el nombre del rol directamente
    const filaHTML = `
      <tr>
        <td><div>${usuario.name}</div></td>
        <td><div>${usuario.lastname}</div></td>
        <td><div>${usuario.phone}</div></td>
        <td><div>${usuario.address}</div></td>
        <td><div>${usuario.password}</div></td>
        <td><div>${usuario.rol}</div></td> <!-- Aquí se muestra el nombre del rol -->
        <td>
          <div>
            <a href="editarURegistrados.html?id=${usuario.id}" class="btn btn-quinto">Editar</a>
            <button onclick="deshabilitarUsuario(${usuario.id})" class="btn btn-danger" style="margin-left: 5px;">Deshabilitar</button>
          </div>
        </td>
      </tr>`;
    document.querySelector("#root").insertAdjacentHTML("beforeend", filaHTML);
  }
}

async function mostrarInformacion() {
  const response = await fetch(`https://backendprojectfundation-production.up.railway.app/usuarios`);
  const usuarios = await response.json();

  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    const filaHTML = `
      <tr id="usuario-${usuario.id}">
        <td><div>${usuario.name}</div></td>
        <td><div>${usuario.lastname}</div></td>
        <td><div>${usuario.phone}</div></td>
        <td><div>${usuario.address}</div></td>
        <td><div>${usuario.password}</div></td>
        <td><div>${usuario.rol}</div></td> <!-- Aquí se muestra el nombre del rol -->
        <td>
          <div>
            <a href="editarURegistrados.html?id=${usuario.id}" class="btn btn-quinto">Editar</a>
            <button onclick="deshabilitarUsuario(${usuario.id})" class="btn btn-danger" style="margin-left: 5px;">Deshabilitar</button>
          </div>
        </td>
      </tr>`;
    document.querySelector("#root").insertAdjacentHTML("beforeend", filaHTML);
  }
}

function deshabilitarUsuario(id) {
  console.log(id);
  if (window.confirm("¿Seguro que quieres deshabilitar este Usuario?")) {
    const fila = document.getElementById(`usuario-${id}`);
    if (fila) {
      fila.remove();
    }
  }
}
