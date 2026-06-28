// Obtener lo elementos del DOM donde se ingresan los datos del usuario para alamacenarlos en Contantes
const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const tableBody = document.getElementById("tableBody");

//Variable con la clave de almacenamiento ("formData")que funge como base de datos para almacenar lo que
// se va  persistir en LocalStorage
let datos = JSON.parse(localStorage.getItem("DatoFormulario")) || [];


form.addEventListener("submit", function (eventoBotonEnviar) {
  // Desabilitar evento por defecto de recargar (reload )
  eventoBotonEnviar.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;

  if (name && email) {
    const nuevoRegistro = { name, email };
    datos.push(nuevoRegistro);
    salvarDatosEnLocalStorage();
    pintarTabla();
    form.reset();
  }
})



function salvarDatosEnLocalStorage() {
  localStorage.setItem("DatoFormulario", JSON.stringify(datos));
}



function pintarTabla() {
  tableBody.innerHTML = "";

  // Creando la tabla de datos dinámicament  en el DOM
  datos.forEach(function (item, index) {
    const fila = document.createElement("tr");
    fila.classList.add("hover");
    const celdaName = document.createElement("td");
    const celdaEmail = document.createElement("td");
    const celdaAction = document.createElement("td");
    const botonEditar = document.createElement("button");
    const botonEliminar = document.createElement("button");
    const iconoEditar = document.createElement("i");
    iconoEditar.className = "fas fa-edit";
    const iconoEliminar = document.createElement("i");
    iconoEliminar.className = "fa-solid fa-trash-can";

    // cear el  contenido a las celadas
    celdaName.textContent = item.name;
    celdaEmail.textContent = item.email;


    botonEditar.textContent = "Editar";
    botonEditar.classList.add("button", "button--editar");
    botonEditar.innerHTML = '<i class="fas fa-edit"></i> Editar';
    // Agregar evento click al botón de editar para llamar a la función editarDatos 
    botonEditar.addEventListener("click", function () {
      editarDatos(index);
    })


    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("button", "button--eliminar");
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i> Borrar';
    // Agregar evento click al botón  eliminar para llamar a la funcion eliminarDatos  
    botonEliminar.addEventListener("click", function () {
      eliminarDatos(index);
    })



    // Agregar botones a la celda de acciones
    celdaAction.appendChild(botonEditar);
    celdaAction.appendChild(botonEliminar);

    // Agregar celdas a la fila
    fila.appendChild(celdaName);
    fila.appendChild(celdaEmail);
    fila.appendChild(celdaAction);

    // Agregar fila a la tabla
    tableBody.appendChild(fila);
  })

}
pintarTabla();
