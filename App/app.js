/*
 * ==============================================================================
 * 📘 ESTUDIO DETALLADO LÍNEA POR LÍNEA: CRUD CON PERSISTENCIA EN ALMACENAMIENTO LOCAL
 * ==============================================================================
 * Autor del Código Original: Ivor Guzmán Zambrano
 * Comentarios de Explicación: Antigravity (Google DeepMind)
 * 
 * Versión: Simplificada y Básica (Nivel Primer Trimestre de Programación)
 * 
 * 🛠️ ARQUITECTURA GENERAL DEL PROGRAMA:
 * Este programa interactúa directamente con el DOM (Document Object Model)
 * para crear un CRUD (Crear, Leer, Actualizar, Eliminar) básico utilizando persistencia local.
 * Utiliza estructuras elementales:
 *   - Variables y constantes básicas.
 *   - Estructuras condicionales simples (if / else).
 *   - Bucles tradicionales (bucle for).
 *   - Funciones nominales declarativas estándar.
 */

// ==============================================================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM (DOCUMENT OBJECT MODEL)
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 SELECCIÓN DEL FORMULARIO DE REGISTRO
// LÍNEA: const formulario = document.getElementById("formularioRegistro");
// ------------------------------------------------------------------------------
// - ¿Qué es?: Una declaración de una constante ('const') llamada 'formulario'.
// - ¿Qué hace?: Almacena la referencia en memoria del formulario HTML con ID "formularioRegistro".
// - ¿Cómo lo hace?: Busca en el HTML un elemento cuyo atributo id sea "formularioRegistro" usando 'document.getElementById'.
// - ¿Por qué lo hace?: Para poder capturar el evento cuando el usuario presiona el botón de enviar (submit).
const formulario = document.getElementById("formularioRegistro");

// ------------------------------------------------------------------------------
// 📌 SELECCIÓN DEL CAMPO DE ENTRADA PARA EL NOMBRE
// LÍNEA: const entradaNombre = document.getElementById("entradaNombre");
// ------------------------------------------------------------------------------
// - ¿Qué es?: Una constante llamada 'entradaNombre'.
// - ¿Qué hace?: Almacena el campo de texto donde el usuario escribe su nombre en la página.
// - ¿Cómo lo hace?: Busca en el DOM el elemento con ID "entradaNombre".
// - ¿Por qué lo hace?: Para poder leer el texto que el usuario escribe (.value).
const entradaNombre = document.getElementById("entradaNombre");

// ------------------------------------------------------------------------------
// 📌 SELECCIÓN DEL CAMPO DE ENTRADA PARA EL CORREO
// LÍNEA: const entradaCorreo = document.getElementById("entradaCorreo");
// ------------------------------------------------------------------------------
// - ¿Qué es?: Una constante llamada 'entradaCorreo'.
// - ¿Qué hace?: Almacena el campo de entrada del correo electrónico del usuario.
// - ¿Cómo lo hace?: Busca en el DOM el elemento con ID "entradaCorreo".
// - ¿Por qué lo hace?: Permite extraer la dirección de correo ingresada por el usuario.
const entradaCorreo = document.getElementById("entradaCorreo");

// ------------------------------------------------------------------------------
// 📌 SELECCIÓN DEL CONTENEDOR DEL CUERPO DE LA TABLA
// LÍNEA: const cuerpoTabla = document.getElementById("cuerpoTabla");
// ------------------------------------------------------------------------------
// - ¿Qué es?: Una constante llamada 'cuerpoTabla'.
// - ¿Qué hace?: Almacena la referencia al cuerpo de la tabla HTML (<tbody>).
// - ¿Cómo lo hace?: Busca en el DOM el elemento con ID "cuerpoTabla".
// - ¿Por qué lo hace?: Es el lugar físico donde se insertarán las filas de datos dinámicamente.
const cuerpoTabla = document.getElementById("cuerpoTabla");

// ------------------------------------------------------------------------------
// 📌 SELECCIÓN DEL CAMPO DE ENTRADA DE BÚSQUEDA
// LÍNEA: const entradaBusqueda = document.getElementById("entradaBusqueda");
// ------------------------------------------------------------------------------
// - ¿Qué es?: Una constante llamada 'entradaBusqueda'.
// - ¿Qué hace?: Almacena la referencia del cuadro de texto de búsqueda en la página.
// - ¿Cómo lo hace?: Busca en el DOM el elemento con ID "entradaBusqueda".
// - ¿Por qué lo hace?: Para poder detectar cuando el usuario escribe texto de filtrado en el buscador.
const entradaBusqueda = document.getElementById("entradaBusqueda");


// ==============================================================================
// 2. INICIALIZACIÓN DEL ESTADO DE LA BASE DE DATOS (MODELO)
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 CARGAR DATOS DESDE EL ALMACENAMIENTO LOCAL DE MANERA DETALLADA Y BÁSICA
// LÍNEA: let datosJSON = localStorage.getItem("DatosFormulario"); ...
// ------------------------------------------------------------------------------
// - ¿Qué es?: Una serie de pasos condicionales para leer datos y guardarlos en una variable de arreglo 'datos'.
// - ¿Qué hace?: Obtiene la lista guardada de usuarios del navegador o crea una lista vacía si es la primera vez que se usa la app.
// - ¿Cómo lo hace?: 
//     1. 'localStorage.getItem("DatosFormulario")': Obtiene los datos del disco como una cadena de texto (JSON) y los guarda en 'datosJSON'.
//     2. 'if (datosJSON === null)': Compara si la variable es nula (es decir, no hay datos guardados aún).
//     3. 'datos = []': Si es nula, inicializa 'datos' como un arreglo vacío.
//     4. 'JSON.parse(datosJSON)': Si no es nula, convierte el texto JSON a un arreglo real de objetos en Javascript.
// - ¿Por qué lo hace?: De esta forma evitamos el operador avanzado '||' y hacemos el flujo 100% explícito con una condicional 'if/else' básica.
let datosJSON = localStorage.getItem("DatosFormulario");
let datos;
if (datosJSON === null) {
  datos = [];
} else {
  datos = JSON.parse(datosJSON);
}


// ==============================================================================
// 3. ESCUCHADOR DE EVENTOS: CONTROLADOR DEL FORMULARIO DE REGISTRO
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 ESCUCHAR CUANDO SE ENVÍA EL FORMULARIO (SUBMIT)
// LÍNEA: formulario.addEventListener("submit", function (eventoBotonEnviar) { ... });
// ------------------------------------------------------------------------------
// - ¿Qué es?: Un escuchador de eventos básico que asocia una función estándar cuando ocurre un "submit".
// - ¿Qué hace?: Ejecuta la función interna cuando se intenta enviar el formulario (haciendo click en Crear).
// - ¿Cómo lo hace?: Usa '.addEventListener("submit", ...)' con una estructura de función clásica e identifica el evento.
// - ¿Por qué lo hace?: Para interceptar los datos del usuario antes de que el navegador realice cualquier otra acción.
formulario.addEventListener("submit", function (eventoBotonEnviar) {

  // ----------------------------------------------------------------------------            
  // 📌 EVITAR QUE LA PÁGINA SE RECARGUE POR DEFECTO
  // LÍNEA: eventoBotonEnviar.preventDefault();
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Una llamada al método 'preventDefault()'.
  // - ¿Qué hace?: Detiene el comportamiento automático del navegador que recarga la página al enviar un formulario.
  // - ¿Cómo lo hace?: Detiene la propagación y acción predeterminada del evento 'submit' en el navegador.
  // - ¿Por qué lo hace?: Si la página se recargara, perderíamos la lista de datos temporal que tenemos cargada en memoria.
  eventoBotonEnviar.preventDefault();

  // ----------------------------------------------------------------------------
  // 📌 OBTENER EL NOMBRE ESCRITO POR EL USUARIO
  // LÍNEA: const nombre = entradaNombre.value;
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Una constante de texto que guarda el valor actual del campo de nombre.
  // - ¿Qué hace?: Guarda lo que el usuario escribió en el campo de nombre.
  // - ¿Cómo lo hace?: Accede a la propiedad '.value' del campo de entrada.
  // - ¿Por qué lo hace?: Permite almacenar temporalmente el texto ingresado para guardarlo en el objeto del usuario.
  const nombre = entradaNombre.value;

  // ----------------------------------------------------------------------------
  // 📌 OBTENER EL CORREO ESCRITO POR EL USUARIO
  // LÍNEA: const correo = entradaCorreo.value;
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Una constante de texto que guarda el valor actual del campo de correo.
  // - ¿Qué hace?: Guarda lo que el usuario escribió en el campo de correo electrónico.
  // - ¿Cómo lo hace?: Accede a la propiedad '.value' de 'entradaCorreo'.
  // - ¿Por qué lo hace?: Permite guardar temporalmente el correo antes de procesar el registro.
  const correo = entradaCorreo.value;

  // ----------------------------------------------------------------------------
  // 📌 VALIDAR SI LOS CAMPOS TIENEN TEXTO (CONDICIONAL IF/ELSE)
  // LÍNEA: if (nombre !== "" && correo !== "") { ... } else { ... }
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Una estructura condicional básica de comparación.
  // - ¿Qué hace?: Comprueba de forma explícita que ninguna de las dos variables de texto esté vacía ("").
  // - ¿Cómo lo hace?: Evalúa que el nombre no sea igual a la cadena vacía Y ('&&') que el correo tampoco sea igual a la cadena vacía.
  // - ¿Por qué lo hace?: Evita introducir registros en blanco o vacíos en nuestro listado de usuarios.
  if (nombre !== "" && correo !== "") {

    // --------------------------------------------------------------------------
    // 📌 EMPAQUETAR DATOS EN UN OBJETO LITERAL CLÁSICO
    // LÍNEA: const nuevoRegistro = { nombre: nombre, correo: correo };
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Una constante llamada 'nuevoRegistro' que almacena un objeto con clave y valor definidos explícitamente.
    // - ¿Qué hace?: Agrupa los datos del usuario en una estructura organizada.
    // - ¿Cómo lo hace?: Asigna el valor de la variable 'nombre' a la clave 'nombre', y el valor de la variable 'correo' a la clave 'correo'.
    // - ¿Por qué lo hace?: En lugar de usar la sintaxis moderna abreviada, declaramos de forma clásica la clave y el valor
    //                      para que sea mucho más comprensible ver de dónde proviene cada dato del objeto.
    const nuevoRegistro = { 
      nombre: nombre, 
      correo: correo 
    };

    // --------------------------------------------------------------------------
    // 📌 AÑADIR EL REGISTRO AL FINAL DEL ARREGLO
    // LÍNEA: datos.push(nuevoRegistro);
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Invocación de la función '.push()' de arreglos.
    // - ¿Qué hace?: Añade el nuevo objeto del usuario al final del arreglo 'datos'.
    // - ¿Cómo lo hace?: Inserta el objeto mutando el arreglo original en memoria.
    // - ¿Por qué lo hace?: Para registrar formalmente al nuevo usuario en la lista global activa del CRUD.
    datos.push(nuevoRegistro);

    // --------------------------------------------------------------------------
    // 📌 EJECUTAR PERSISTENCIA EN DISCO NAVEGADOR
    // LÍNEA: guardarDatosEnAlmacenamiento();
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Una invocación de función personalizada.
    // - ¿Qué hace?: Guarda la lista actualizada de datos en el almacenamiento interno del navegador.
    // - ¿Cómo lo hace?: Llama a la función definida más abajo.
    // - ¿Por qué lo hace?: Para asegurar que el nuevo usuario permanezca guardado si el usuario recarga la pestaña.
    guardarDatosEnAlmacenamiento();

    // --------------------------------------------------------------------------
    // 📌 REDIBUJAR LA TABLA EN EL DOM VISIBLE
    // LÍNEA: dibujarTabla();
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Una invocación a la función 'dibujarTabla'.
    // - ¿Qué hace?: Vuelve a dibujar el contenido de la tabla HTML para reflejar el nuevo usuario en pantalla.
    // - ¿Cómo lo hace?: Llama al bloque de renderizado de la tabla.
    // - ¿Por qué lo hace?: Muestra los cambios visualmente al usuario de inmediato.
    dibujarTabla();

    // --------------------------------------------------------------------------
    // 📌 LIMPIAR TODOS LOS CAMPOS DEL FORMULARIO
    // LÍNEA: formulario.reset();
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Invocación del método '.reset()' nativo del formulario HTML.
    // - ¿Qué hace?: Borra y deja en blanco los campos de texto del formulario automáticamente.
    // - ¿Cómo lo hace?: Restablece todos los campos asociados al formulario a sus valores de inicio.
    // - ¿Por qué lo hace?: Brinda comodidad al usuario, evitando que tenga que borrar manualmente el texto para escribir un nuevo registro.
    formulario.reset();

  } else {

    // --------------------------------------------------------------------------
    // 📌 MOSTRAR DIÁLOGO DE ADVERTENCIA AL USUARIO
    // LÍNEA: alert("Todos los datos son obligatorios");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Llamada a la función global 'alert()'.
    // - ¿Qué hace?: Muestra una ventana modal flotante en la pantalla con el texto indicado.
    // - ¿Cómo lo hace?: Llama a un componente nativo de alerta del navegador web.
    // - ¿Por qué lo hace?: Advierte de manera clara al usuario que el registro falló porque dejó algún campo vacío.
    alert("Todos los datos son obligatorios");
  }
});

// ==============================================================================
// 3.5. ESCUCHADOR DE EVENTOS: CONTROLADOR DE BÚSQUEDA EN TIEMPO REAL
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 ESCUCHAR ENTRADAS DE TEXTO EN EL CAMPO DE BÚSQUEDA
// LÍNEA: entradaBusqueda.addEventListener("input", function () { ... });
// ------------------------------------------------------------------------------
// - ¿Qué es?: Un escuchador de eventos que reacciona a cambios de entrada de texto.
// - ¿Qué hace?: Redibuja la tabla cada vez que el usuario escribe o borra una letra en el cuadro de búsqueda.
// - ¿Cómo lo hace?: Llama a la función 'dibujarTabla()' cada vez que se detecta el evento de entrada "input".
// - ¿Por qué lo hace?: Permite que la búsqueda sea interactiva y se filtre la tabla en tiempo real mientras el usuario escribe.
entradaBusqueda.addEventListener("input", function () {
  dibujarTabla();
});


// ==============================================================================
// 4. PERSISTENCIA DE DATOS (MODELO - ESCRITURA)
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 DECLARACIÓN: FUNCIÓN PARA GUARDAR DATOS EN EL ALMACENAMIENTO LOCAL
// LÍNEA: function guardarDatosEnAlmacenamiento() { ... }
// ------------------------------------------------------------------------------
// - ¿Qué es?: Declaración de una función nominal llamada 'guardarDatosEnAlmacenamiento'.
// - ¿Qué hace?: Encapsula la lógica de guardado y escritura en el almacenamiento local del navegador.
// - ¿Cómo lo hace?: Convierte el arreglo en un string de tipo texto JSON y lo guarda.
// - ¿Por qué lo hace?: Permite reutilizar la lógica de persistencia en una sola función organizada.
function guardarDatosEnAlmacenamiento() {

  // ----------------------------------------------------------------------------
  // 📌 SERIALIZAR A JSON Y GUARDAR EN EL NAVEGADOR
  // LÍNEA: localStorage.setItem("DatosFormulario", JSON.stringify(datos));
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación de la API de localStorage combinada con la conversión JSON.
  // - ¿Qué hace?: Convierte el arreglo 'datos' en texto plano y lo almacena con la clave "DatosFormulario".
  // - ¿Cómo lo hace?:
  //     1. 'JSON.stringify(datos)': Serializa el arreglo de JavaScript a formato de texto JSON.
  //     2. 'localStorage.setItem(clave, valor)': Guarda ese texto en el almacenamiento físico del navegador web.
  // - ¿Por qué lo hace?: LocalStorage solo acepta almacenar texto simple (Strings). Es obligatorio convertir el arreglo
  // a texto antes de guardarlo, de lo contrario no se almacenaría de forma correcta.
  localStorage.setItem("DatosFormulario", JSON.stringify(datos));
}


// ==============================================================================
// 5. RENDERIZACIÓN DINÁMICA DE LA INTERFAZ DE USUARIO (VISTA)
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 DECLARACIÓN: FUNCIÓN PARA RENDERIZAR E INSERTAR FILAS EN LA TABLA
// LÍNEA: function dibujarTabla() { ... }
// ------------------------------------------------------------------------------
// - ¿Qué es?: Declaración de la función nominal principal de renderizado 'dibujarTabla'.
// - ¿Qué hace?: Limpia el contenido de la tabla HTML y lo vuelve a construir usando los registros activos.
// - ¿Cómo lo hace?: Vacía el HTML interno y recorre el arreglo 'datos' para crear nuevas filas y celdas HTML dinámicamente.
// - ¿Por qué lo hace?: Mantiene sincronizada y actualizada la tabla visual con los datos lógicos del arreglo.
function dibujarTabla() {

  // ----------------------------------------------------------------------------            
  // 📌 VACIAR CONTENIDOS DEL CUERPO DE LA TABLA HTML
  // LÍNEA: cuerpoTabla.innerHTML = "";
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Asignación de cadena vacía a la propiedad 'innerHTML' del cuerpo de la tabla.
  // - ¿Qué hace?: Remueve por completo cualquier fila vieja que se encuentre dentro de la etiqueta <tbody>.
  // - ¿Cómo lo hace?: Modifica el HTML interno del elemento a una cadena en blanco, destruyendo los nodos hijos del DOM.
  // - ¿Por qué lo hace?: Evita que al redibujar la tabla las filas antiguas se dupliquen y se acumulen una y otra vez.
  cuerpoTabla.innerHTML = "";
  
  // ----------------------------------------------------------------------------
  // 📌 ITERAR SOBRE CADA UNO DE LOS REGISTROS DEL ARREGLO USANDO BUCLE FOR TRADICIONAL
  // LÍNEA: for (let i = 0; i < datos.length; i++) { ... }
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Un bucle 'for' clásico de control numérico.
  // - ¿Qué hace?: Recorre cada posición de la lista de datos desde el índice 0 hasta la longitud final del arreglo.
  // - ¿Cómo lo hace?: 
  //     1. 'let i = 0': Inicializa la variable de control 'i' en 0.
  //     2. 'i < datos.length': Condición que mantiene el bucle activo mientras 'i' sea menor que la longitud del arreglo.
  //     3. 'i++': Incrementa en 1 la variable de control 'i' en cada iteración del bucle.
  // - ¿Por qué lo hace?: Para simplificar el código. En lugar de usar métodos funcionales complejos como '.forEach()',
  //                      utilizamos el bucle 'for' clásico enseñado en el primer trimestre, facilitando el seguimiento manual
  //                      y la lógica del bucle.
  for (let i = 0; i < datos.length; i++) {

    // --------------------------------------------------------------------------
    // 📌 OBTENER EL ELEMENTO Y EL ÍNDICE CORRESPONDIENTE
    // LÍNEAS: const elementoIndice = datos[i]; const indice = i;
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Declaración de constantes locales de ayuda.
    // - ¿Qué hace?: Obtiene el objeto de datos en la posición actual 'i' y guarda el índice correspondiente.
    // - ¿Cómo lo hace?: Accede por corchetes e indexación numérica simple al arreglo 'datos'.
    // - ¿Por qué lo hace?: Permite que el resto de variables y funciones de abajo utilicen los mismos nombres descriptivos
    //                      que usábamos en el código original sin alterar la lógica de inserción.
    const elementoIndice = datos[i];
    const indice = i;

    // --------------------------------------------------------------------------
    // 📌 FILTRADO DE BÚSQUEDA EN TIEMPO REAL (NIVEL BÁSICO CONDICIONAL)
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Bloque condicional para comparar cadenas en minúsculas.
    // - ¿Qué hace?: Compara si hay un texto de búsqueda escrito y si ni el nombre ni el correo coinciden con él,
    //              salta al siguiente ciclo del bucle sin dibujar la fila.
    // - ¿Cómo lo hace?: 
    //     1. 'entradaBusqueda.value.toLowerCase()': Pasa a minúsculas el texto del buscador.
    //     2. 'elementoIndice.nombre.toLowerCase()': Pasa a minúsculas el nombre del registro.
    //     3. '.includes(...)': Compara si la subcadena de búsqueda está dentro del nombre o correo.
    //     4. 'continue;': Es una instrucción especial de los bucles 'for' tradicionales. Detiene de inmediato la iteración
    //        actual y salta a la siguiente iteración del bucle, ignorando todo el código de dibujo de fila que está debajo.
    // - ¿Por qué lo hace?: Esta es la forma más estructurada y básica de implementar un filtro en programación sin romper
    //                      los índices del arreglo original, evitando el uso de funciones flecha y métodos de filtrado avanzados.
    const terminoBusqueda = entradaBusqueda.value.toLowerCase();
    const nombreEnMinusculas = elementoIndice.nombre.toLowerCase();
    const correoEnMinusculas = elementoIndice.correo.toLowerCase();

    if (terminoBusqueda !== "") {
      // Si el término de búsqueda NO coincide con el nombre Y tampoco coincide con el correo...
      if (nombreEnMinusculas.includes(terminoBusqueda) === false && correoEnMinusculas.includes(terminoBusqueda) === false) {
        continue; // Saltamos este registro y pasamos al siguiente ciclo del bucle 'for'
      }
    }

    // --------------------------------------------------------------------------
    // 📌 CREAR ELEMENTO DE FILA HTML (TR) EN MEMORIA
    // LÍNEA: const fila = document.createElement("tr");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Creación de un elemento de fila de tabla en memoria.
    // - ¿Qué hace?: Inicializa un objeto <tr> en la memoria interna del navegador web.
    // - ¿Cómo lo hace?: Llama a 'document.createElement("tr")'.
    // - ¿Por qué lo hace?: Actúa como el bloque contenedor de las celdas de la fila de este registro en particular.
    const fila = document.createElement("tr");

    // --------------------------------------------------------------------------
    // 📌 ASOCIAR LA CLASE DE ESTILO CSS PARA EFECTO HOVER (RESALTADO)
    // LÍNEA: fila.classList.add("resaltado");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Adición de clase al elemento de fila.
    // - ¿Qué hace?: Añade la clase visual "resaltado" a la fila.
    // - ¿Cómo lo hace?: Inserta la clase en la propiedad 'classList' de la fila.
    // - ¿Por qué lo hace?: Para enlazar los efectos visuales CSS al pasar el cursor sobre la fila en pantalla.
    fila.classList.add("resaltado");

    // --------------------------------------------------------------------------
    // 📌 CREAR CELDA HTML PARA EL NOMBRE
    // LÍNEA: const celdaNombre = document.createElement("td");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Creación de elemento de celda de tabla en memoria.
    // - ¿Qué hace?: Inicializa un objeto de tipo celda (<td>) para el nombre.
    // - ¿Cómo lo hace?: Llama a 'document.createElement("td")'.
    // - ¿Por qué lo hace?: Contenedor donde se insertará el texto del nombre.
    const celdaNombre = document.createElement("td");

    // --------------------------------------------------------------------------
    // 📌 CREAR CELDA HTML PARA EL CORREO
    // LÍNEA: const celdaCorreo = document.createElement("td");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Creación de elemento de celda de tabla.
    // - ¿Qué hace?: Inicializa un objeto de tipo celda (<td>) para el correo electrónico.
    // - ¿Cómo lo hace?: Llama a 'document.createElement("td")'.
    // - ¿Por qué lo hace?: Contenedor para mostrar el correo del usuario en la tabla.
    const celdaCorreo = document.createElement("td");

    // --------------------------------------------------------------------------
    // 📌 CREAR CELDA HTML PARA LAS ACCIONES (BOTONES)
    // LÍNEA: const celdaAccion = document.createElement("td");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Creación de celda de tabla para acciones.
    // - ¿Qué hace?: Crea la celda de columna (<td>) destinada a contener los botones de control.
    // - ¿Cómo lo hace?: Llama a 'document.createElement("td")'.
    // - ¿Por qué lo hace?: Para agrupar los botones de Actualizar y Eliminar en una columna.
    const celdaAccion = document.createElement("td");

    // --------------------------------------------------------------------------
    // 📌 ESTILIZAR Y CENTRAR LA CELDA DE BOTONES
    // LÍNEA: celdaAccion.classList.add("tabla_cuerpo--celda_accion_centrada");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Adición de clase CSS a la celda de acciones.
    // - ¿Qué hace?: Vincula la clase de estilos "tabla_cuerpo--celda_accion_centrada".
    // - ¿Cómo lo hace?: Modifica el listado de clases del elemento DOM.
    // - ¿Por qué lo hace?: Aplica estilos para centrar y estructurar los botones en la celda.
    celdaAccion.classList.add("tabla_cuerpo--celda_accion_centrada");

    // --------------------------------------------------------------------------
    // 📌 CREAR BOTÓN DE ACTUALIZACIÓN (EDITAR)
    // LÍNEA: const botonEditar = document.createElement("button");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Creación de un botón interactivo.
    // - ¿Qué hace?: Inicializa el objeto <button> para modificar los datos del usuario.
    // - ¿Cómo lo hace?: Llama a 'document.createElement("button")'.
    // - ¿Por qué lo hace?: Ofrece un activador físico para la edición del registro.
    const botonEditar = document.createElement("button");

    // --------------------------------------------------------------------------
    // 📌 ASOCIAR CLASES CSS AL BOTÓN EDITAR
    // LÍNEA: botonEditar.classList.add("boton", "boton--actualizar_correo");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Adición de estilos CSS al botón de actualización.
    // - ¿Qué hace?: Agrega las clases "boton" y "boton--actualizar_correo" a este botón.
    // - ¿Cómo lo hace?: Modifica las clases asociadas al botón en memoria.
    // - ¿Por qué lo hace?: Permite aplicar los estilos tipográficos y de color amarillo definidos en CSS.
    botonEditar.classList.add("boton", "boton--actualizar_correo");

    // --------------------------------------------------------------------------
    // 📌 INYECTAR HTML Y ICONOS AL BOTÓN EDITAR
    // LÍNEA: botonEditar.innerHTML = '<i class="fas fa-edit"></i> Actualiza &raquo';
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Inyección de contenido HTML interno.
    // - ¿Qué hace?: Pone un icono de lápiz y el texto "Actualiza »" dentro del botón.
    // - ¿Cómo lo hace?: Sobreescribe la propiedad 'innerHTML' con una cadena de texto en HTML.
    // - ¿Por qué lo hace?: Para estructurar de manera rápida y elegante el icono y el texto en una sola instrucción.
    botonEditar.innerHTML = '<i class="fas fa-edit"></i> Actualiza &raquo';
   
    // --------------------------------------------------------------------------
    // 📌 ASOCIAR ACCIÓN DE EDICIÓN AL PRESIONAR EL BOTÓN ACTUALIZAR
    // LÍNEA: botonEditar.addEventListener("click", function () { ... });
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Escuchador de eventos click de función clásica.
    // - ¿Qué hace?: Ejecuta la función de edición al hacer click, enviándole el índice de la fila actual.
    // - ¿Cómo lo hace?: Llama a 'editarDatos(indice)' cuando ocurre el evento "click" sobre este botón.
    // - ¿Por qué lo hace?: Para enlazar la fila física de la pantalla con su posición en la base de datos lógica en memoria.
    botonEditar.addEventListener("click", function () {
      editarDatos(indice);
    });

    // --------------------------------------------------------------------------
    // 📌 CREAR BOTÓN DE ELIMINACIÓN
    // LÍNEA: const botonEliminar = document.createElement("button");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Creación de un botón interactivo.
    // - ¿Qué hace?: Inicializa el objeto <button> para borrar los datos del usuario.
    // - ¿Cómo lo hace?: Llama a 'document.createElement("button")'.
    // - ¿Por qué lo hace?: Ofrece un activador físico para eliminar el registro.
    const botonEliminar = document.createElement("button");

    // --------------------------------------------------------------------------
    // 📌 ASOCIAR CLASES CSS AL BOTÓN DE ELIMINAR
    // LÍNEA: botonEliminar.classList.add("boton", "boton--eliminar");
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Adición de clases CSS al botón de eliminar.
    // - ¿Qué hace?: Agrega las clases "boton" y "boton--eliminar" a este botón.
    // - ¿Cómo lo hace?: Modifica las clases asociadas al botón en memoria.
    // - ¿Por qué lo hace?: Aplica los estilos tipográficos y el color rojo definidos en el archivo de estilos.
    botonEliminar.classList.add("boton", "boton--eliminar");

    // --------------------------------------------------------------------------
    // 📌 INYECTAR ESTRUCTURA DE ICONO HTML AL BOTÓN ELIMINAR
    // LÍNEA: botonEliminar.innerHTML = '<i class="fas fa-trash"></i> Elimina &raquo';
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Inyección de contenido HTML interno.
    // - ¿Qué hace?: Pone un icono de papelera y el texto "Elimina »" dentro del botón.
    // - ¿Cómo lo hace?: Sobreescribe la propiedad 'innerHTML' del botón en memoria.
    // - ¿Por qué lo hace?: Diseña el aspecto visual del botón agregando el icono de Font Awesome de manera sencilla.
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i> Elimina &raquo';

    // --------------------------------------------------------------------------
    // 📌 ASOCIAR ACCIÓN DE ELIMINAR AL PRESIONAR EL BOTÓN
    // LÍNEA: botonEliminar.addEventListener("click", function () { ... });
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Escuchador de eventos click de función clásica.
    // - ¿Qué hace?: Ejecuta la función de borrado de datos pasándole el índice numérico correspondiente.
    // - ¿Cómo lo hace?: Ejecuta 'eliminarDatos(indice)' cuando el usuario hace click en el botón.
    // - ¿Por qué lo hace?: Vincula de forma directa el botón de borrar de la fila con su registro en el arreglo global.
    botonEliminar.addEventListener("click", function () {
      eliminarDatos(indice);
    });

    // --------------------------------------------------------------------------
    // 📌 INYECTAR EL NOMBRE DEL USUARIO EN LA CELDA DE MANERA SEGURA
    // LÍNEA: celdaNombre.textContent = elementoIndice.nombre;
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Asignación directa a la propiedad 'textContent'.
    // - ¿Qué hace?: Escribe el valor del nombre del registro actual dentro del elemento de la celda.
    // - ¿Cómo lo hace?: Reemplaza el texto interno de la celda escapando de forma automática cualquier marcado HTML especial.
    // - ¿Por qué lo hace?: Por seguridad. Usar 'textContent' es mucho más seguro para mostrar textos que usar 'innerHTML',
    //                      evitando que usuarios malintencionados inyecten scripts dañinos en la aplicación.
    celdaNombre.textContent = elementoIndice.nombre;

    // --------------------------------------------------------------------------
    // 📌 INYECTAR EL CORREO DEL USUARIO EN LA CELDA DE MANERA SEGURA
    // LÍNEA: celdaCorreo.textContent = elementoIndice.correo;
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Asignación a la propiedad 'textContent' de la celda.
    // - ¿Qué hace?: Escribe el valor del correo del registro actual en la celda de correo electrónico.
    // - ¿Cómo lo hace?: Asigna el valor string '.correo' al contenido textual de la celda.
    // - ¿Por qué lo hace?: Muestra el correo de forma limpia y segura en su columna respectiva.
    celdaCorreo.textContent = elementoIndice.correo;

    // --------------------------------------------------------------------------
    // 📌 ANEXAR LOS BOTONES DE CONTROL DENTRO DE LA CELDA DE ACCIÓN
    // LÍNEAS: celdaAccion.appendChild(botonEditar); celdaAccion.appendChild(botonEliminar);
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Inserción de nodos del DOM mediante 'appendChild()'.
    // - ¿Qué hace?: Coloca los botones de edición y eliminación dentro de la celda de acciones correspondientes a la fila.
    // - ¿Cómo lo hace?: Agrega físicamente los nodos de los botones como elementos hijos del contenedor de la celda.
    // - ¿Por qué lo hace?: Los elementos creados mediante 'createElement' solo viven en memoria hasta que los anexamos
    //                      a un nodo contenedor visible.
    celdaAccion.appendChild(botonEditar);
    celdaAccion.appendChild(botonEliminar);

    // --------------------------------------------------------------------------
    // 📌 ANEXAR CELDAS DE COLUMNAS DENTRO DE LA FILA CONTENEDORA (TR)
    // LÍNEAS: fila.appendChild(celdaNombre); ...
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Inserción de nodos hijos en la fila de la tabla.
    // - ¿Qué hace?: Ensambla las tres celdas de columna (nombre, correo y acciones) dentro del nodo de fila <tr>.
    // - ¿Cómo lo hace?: Anexa secuencialmente cada celda de izquierda a derecha.
    // - ¿Por qué lo hace?: Construye ordenadamente la estructura de columnas de la fila de la tabla.
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCorreo);
    fila.appendChild(celdaAccion);

    // --------------------------------------------------------------------------
    // 📌 INSERTAR LA FILA COMPLETA DENTRO DEL CONTENEDOR VISIBLE DE LA TABLA
    // LÍNEA: cuerpoTabla.appendChild(fila);
    // --------------------------------------------------------------------------
    // - ¿Qué es?: Inserción de la fila armada en el cuerpo de la tabla.
    // - ¿Qué hace?: Coloca la fila con todos sus datos y botones dentro de la sección <tbody> visible en pantalla.
    // - ¿Cómo lo hace?: Inserta el elemento <tr> como un hijo del contenedor 'cuerpoTabla' en el DOM del navegador.
    // - ¿Por qué lo hace?: Es el paso final que dibuja físicamente la fila en la pantalla del usuario.
    cuerpoTabla.appendChild(fila);
  }
}


// ==============================================================================
// 6. OPERACIONES CRUD: ACTUALIZACIÓN (UPDATE) Y ELIMINACIÓN (DELETE)
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 DECLARACIÓN: FUNCIÓN PARA CARGAR REGISTRO Y PREPARAR EDICIÓN
// LÍNEA: function editarDatos(indice) { ... }
// ------------------------------------------------------------------------------
// - ¿Qué es?: Declaración de una función nominal llamada 'editarDatos' que recibe un índice numérico como parámetro.
// - ¿Qué hace?: Pone la información de un registro seleccionado en el formulario superior para que el usuario pueda modificarla,
//              y borra temporalmente ese registro de la base de datos local.
// - ¿Cómo lo hace?: Obtiene el objeto usando el índice, copia sus textos a los campos y remueve el objeto del arreglo usando '.splice()'.
// - ¿Por qué lo hace?: Es el comportamiento clásico de edición de este CRUD. Al presionar "Crear" tras modificar los datos,
//                      estos se guardarán como una nueva fila en el sistema.
function editarDatos(indice) {

  // ----------------------------------------------------------------------------
  // 📌 OBTENER EL REGISTRO SELECCIONADO DESDE EL ARREGLO DE DATOS
  // LÍNEA: const editarElementoIndice = datos[indice];
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Declaración de una constante local.
  // - ¿Qué hace?: Obtiene y referencia el objeto de usuario seleccionado de la lista utilizando su posición en el arreglo.
  // - ¿Cómo lo hace?: Accede al elemento del arreglo mediante indexación por corchetes ('datos[indice]').
  // - ¿Por qué lo hace?: Necesitamos acceder a sus atributos (.nombre y .correo) para poder cargarlos en los campos de texto.
  const editarElementoIndice = datos[indice];

  // ----------------------------------------------------------------------------
  // 📌 CARGAR NOMBRE DEL REGISTRO EN EL FORMULARIO VISIBLE
  // LÍNEA: entradaNombre.value = editarElementoIndice.nombre;
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Asignación del nombre al campo de texto del formulario.
  // - ¿Qué hace?: Coloca el nombre original en el campo de entrada de texto superior.
  // - ¿Cómo lo hace?: Copia el valor de la propiedad '.nombre' al valor visual del campo.
  // - ¿Por qué lo hace?: Permite al usuario ver la información que va a modificar.
  entradaNombre.value = editarElementoIndice.nombre;

  // ----------------------------------------------------------------------------
  // 📌 CARGAR CORREO DEL REGISTRO EN EL FORMULARIO VISIBLE
  // LÍNEA: entradaCorreo.value = editarElementoIndice.correo;
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Asignación del correo al campo de correo del formulario.
  // - ¿Qué hace?: Coloca el correo original en el campo de entrada de correo superior.
  // - ¿Cómo lo hace?: Copia el valor de la propiedad '.correo' al valor del campo de correo.
  // - ¿Por qué lo hace?: Permite ver el correo original listo para ser corregido o modificado.
  entradaCorreo.value = editarElementoIndice.correo;

  // ----------------------------------------------------------------------------
  // 📌 REMOVER EL REGISTRO VIEJO DEL ARREGLO TEMPORALMENTE
  // LÍNEA: datos.splice(indice, 1);
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación de la función '.splice()' sobre el arreglo.
  // - ¿Qué hace?: Elimina 1 registro de la lista de datos a partir de la posición numérica dada por 'indice'.
  // - ¿Cómo lo hace?: Remueve el objeto mutando el arreglo original en memoria de forma directa.
  // - ¿Por qué lo hace?: Para que al re-enviar el formulario editado no se duplique la información, sino que se cree
  //                      el registro actualizado como uno nuevo.
  datos.splice(indice, 1);

  // ----------------------------------------------------------------------------
  // 📌 GUARDAR LA LISTA EN EL ALMACENAMIENTO DEL NAVEGADOR
  // LÍNEA: guardarDatosEnAlmacenamiento();
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación a la función de guardado local.
  // - ¿Qué hace?: Guarda en el almacenamiento local el estado del arreglo tras haber removido el registro a editar.
  // - ¿Cómo lo hace?: Llama a la función del mismo nombre definida anteriormente.
  // - ¿Por qué lo hace?: Sincroniza la lista de datos de la base de datos local con la que tenemos en memoria.
  guardarDatosEnAlmacenamiento();

  // ----------------------------------------------------------------------------
  // 📌 REDIBUJAR LA TABLA ACTUALIZADA
  // LÍNEA: dibujarTabla();
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación a la función de dibujo de tabla.
  // - ¿Qué hace?: Redibuja la tabla en pantalla sin la fila que acabamos de poner en modo de edición.
  // - ¿Cómo lo hace?: Llama a la función 'dibujarTabla()'.
  // - ¿Por qué lo hace?: Ofrece confirmación visual al usuario de que el elemento ha sido removido de la tabla para editarse.
  dibujarTabla();
}

// ------------------------------------------------------------------------------
// 📌 DECLARACIÓN: FUNCIÓN PARA REMOVER UN REGISTRO PERMANENTEMENTE
// LÍNEA: function eliminarDatos(indice) { ... }
// ------------------------------------------------------------------------------
// - ¿Qué es?: Declaración de una función nominal llamada 'eliminarDatos' que recibe la posición del elemento.
// - ¿Qué hace?: Borra de manera permanente un registro de la aplicación.
// - ¿Cómo lo hace?: Elimina el objeto del arreglo con '.splice()', guarda la lista y actualiza la vista.
// - ¿Por qué lo hace?: Implementa la acción Eliminar (Delete) básica del CRUD.
function eliminarDatos(indice) {

  // ----------------------------------------------------------------------------
  // 📌 BORRAR REGISTRO DE MEMORIA MEDIANTE ÍNDICE
  // LÍNEA: datos.splice(indice, 1);
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación del método '.splice()' en el arreglo 'datos'.
  // - ¿Qué hace?: Borra permanentemente el objeto en la posición 'indice'.
  // - ¿Cómo lo hace?: Modifica el arreglo in-place reduciendo su longitud en 1.
  // - ¿Por qué lo hace?: Remueve la información de la persona seleccionada de la base de datos de memoria.
  datos.splice(indice, 1);

  // ----------------------------------------------------------------------------
  // 📌 GUARDAR LA LISTA EN EL ALMACENAMIENTO DEL NAVEGADOR
  // LÍNEA: guardarDatosEnAlmacenamiento();
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación a la función de guardado local.
  // - ¿Qué hace?: Escribe de nuevo el arreglo modificado en el almacenamiento físico del navegador.
  // - ¿Cómo lo hace?: Sobreescribe los datos en formato JSON en el localStorage.
  // - ¿Por qué lo hace?: Garantiza que la eliminación se conserve de forma permanente al recargar la página.
  guardarDatosEnAlmacenamiento();

  // ----------------------------------------------------------------------------
  // 📌 REDIBUJAR LA TABLA ACTUALIZADA
  // LÍNEA: dibujarTabla();
  // ----------------------------------------------------------------------------
  // - ¿Qué es?: Invocación a la función de dibujo de tabla.
  // - ¿Qué hace?: Limpia la tabla y la vuelve a dibujar sin la fila del usuario eliminado.
  // - ¿Cómo lo hace?: Llama a la función 'dibujarTabla()'.
  // - ¿Por qué lo hace?: Actualiza la interfaz visual al instante para que el usuario verifique la eliminación.
  dibujarTabla();
}


// ==============================================================================
// 7. INICIALIZACIÓN DE LA APLICACIÓN AL CARGAR LA PÁGINA
// ==============================================================================

// ------------------------------------------------------------------------------
// 📌 EJECUTAR DIBUJO DE TABLA EN LA CARGA DE PÁGINA
// LÍNEA: dibujarTabla();
// ------------------------------------------------------------------------------
// - ¿Qué es?: Ejecución síncrona de la función 'dibujarTabla()' al terminar de procesar el archivo.
// - ¿Qué hace?: Dibuja todas las filas de usuarios que ya se encontraran guardadas en el AlmacenamientoLocal al abrir la web.
// - ¿Cómo lo hace?: Llama a 'dibujarTabla()' inmediatamente en el hilo principal del script.
// - ¿Por qué lo hace?: Permite que, si hay datos de sesiones o visitas previas guardados en el navegador, se carguen e inyecten
//                      en la tabla desde el primer instante en que se abre la página web.
dibujarTabla();
