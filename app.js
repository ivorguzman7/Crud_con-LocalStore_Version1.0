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

    // Invacaión de las siguientes Funciones (Metodos)
    salvarDatosEnLocalStorage();
    pintarTabla();
    form.reset();
  } else {
    alert("Todos los datos son obligatorios")
  }
})



function salvarDatosEnLocalStorage() {
  localStorage.setItem("DatoFormulario", JSON.stringify(datos));
}



function pintarTabla() {
  tableBody.innerHTML = "";
  
  //^  Creando  la estructura y las claces (HTML) (CSS)  de la tabla de datos dinámicament  en el DOM
  // ? datos.forEach(function (elementoIndice, indice) { Funcion Clasica
  datos.forEach((elementoIndice, indice) => { // ?  Funcion flecha ()=>{}
    const fila = document.createElement("tr");
    fila.classList.add("hover");
    const celdaName = document.createElement("td");
    const celdaEmail = document.createElement("td");
    const celdaAction = document.createElement("td");
    celdaAction.classList.add("table_body--tdActionCentrado");
    const botonEditar = document.createElement("button");
    const iconoEditar = document.createElement("i");
    iconoEditar.className = "fas fa-edit";
    const botonEliminar = document.createElement("button");
    const iconoEliminar = document.createElement("i");
    iconoEliminar.className = "fa-solid fa-trash-can";

    // cear (poblando en forma dinamica) el  contenido  a las celadas
    celdaName.textContent = elementoIndice.name;
    celdaEmail.textContent = elementoIndice.email;


    
    // ^ _________ boton Actualizar __________
    botonEditar.textContent = "Actualizar";
    botonEditar.classList.add("button", "button--Actualizar");
    botonEditar.innerHTML = '<i class="fas fa-edit"></i> Actualiza';
   
    //^ Agregar evento click al botón de editar para llamar a la función editarDatos 
    botonEditar.addEventListener("click", function () {
      editarDatos(indice);
    })


    // ^ _________ boton Eliminar__________
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("button", "button--eliminar");
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i> Elimina';


    //^ Agregar evento click al botón  eliminar para llamar a la funcion eliminarDatos  
    botonEliminar.addEventListener("click", function () {
      eliminarDatos(indice);
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

function editarDatos(indice) {
  const editarElementoIndice = datos[indice];
  nameInput.value = editarElementoIndice.name;
  emailInput.value = editarElementoIndice.email;
  datos.splice(indice, 1)
  salvarDatosEnLocalStorage();
  pintarTabla();
}

function eliminarDatos(indice) {
  datos.splice(indice, 1)
  salvarDatosEnLocalStorage();
  pintarTabla();
}
pintarTabla();



















