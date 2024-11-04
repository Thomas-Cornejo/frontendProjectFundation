const inputRol = document.querySelector("#rol");

async function filtroRol() {
  document.querySelector("#root").innerHTML = "";
  const rol = inputRol.options[inputRol.selectedIndex].value;
  console.log(rol);
  const response = await fetch(`backendprojectfundation-production.up.railway.app/filtro/${rol}`);
  const usuario = await response.json();

  console.log(usuario);
  for (let i = 0; i < usuario.length; i++) {
    var array =
      "<tr><td><div>" +
      usuario[i].name +
      "</div></td><td><div>" +
      usuario[i].lastname +
      "</div></td><td><div>" +
      usuario[i].phone +
      "</div></td><td><div>" +
      usuario[i].address +
      "</div></td><td><div>" +
      usuario[i].password +
      "</div></td><td><div>" +
      usuario[i].rol_id +
      "</div></td><td><div>" +
      '<a href="editarURegistrados.html?id=' +
      usuario[i].id +
      '" class="btn btn-quinto">Editar</a>' +
      '<button onclick="deshabilitarUsuario(' +
      usuario[i].id +
      ')" class="btn btn-danger" style="margin-left: 5px;">Deshabilitar</button>' +
      "</div></td></tr>";
    document.querySelector("#root").insertAdjacentHTML("afterbegin", array);
  }
  
  
}

async function mostrarInformacion() {
  const response = await fetch(`backendprojectfundation-production.up.railway.app/usuarios`);

  const usuario = await response.json();
  for (let i = 0; i < usuario.length; i++) {
    const usuarioActual = usuario[i];
    const filaHTML = `
      <tr id="usuario-${usuarioActual.id}">
        <td><div>${usuarioActual.name}</div></td>
        <td><div>${usuarioActual.lastname}</div></td>
        <td><div>${usuarioActual.phone}</div></td>
        <td><div>${usuarioActual.address}</div></td>
        <td><div>${usuarioActual.password}</div></td>
        <td><div>${usuarioActual.rol_id}</div></td>
        <td>
          <div>
            <a href="editarURegistrados.html?id=${usuarioActual.id}" class="btn btn-quinto">Editar</a>
            <button onclick="deshabilitarUsuario(${usuarioActual.id})" class="btn btn-danger" style="margin-left: 5px;">Deshabilitar</button>
          </div>
        </td>
      </tr>`;
    document.querySelector("#root").insertAdjacentHTML("afterbegin", filaHTML);
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

