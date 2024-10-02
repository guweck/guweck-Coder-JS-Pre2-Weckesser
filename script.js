// Declaración de clase para tareas
class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completada = false;
    }
}

// Array de tareas
const tareas = [];

// Referencias a elementos del DOM
const entradaTarea = document.getElementById('entradaTarea');
const botonAgregarTarea = document.getElementById('botonAgregarTarea');
const listaTareas = document.getElementById('listaTareas');
const botonMostrarCompletadas = document.getElementById('botonMostrarCompletadas');
const botonMostrarPendientes = document.getElementById('botonMostrarPendientes');
const botonMostrarTodas = document.getElementById('botonMostrarTodas');
const entradaBuscarTarea = document.getElementById('entradaBuscarTarea');
const botonBuscarTarea = document.getElementById('botonBuscarTarea');

// Evento para agregar tarea
botonAgregarTarea.addEventListener('click', () => agregarTarea());

// Evento para mostrar tareas completadas
botonMostrarCompletadas.addEventListener('click', () => mostrarTareasCompletadas());

// Evento para mostrar tareas pendientes
botonMostrarPendientes.addEventListener('click', () => mostrarTareasPendientes());

// Evento para mostrar todas las tareas
botonMostrarTodas.addEventListener('click', () => renderizarTareas());

// Evento para buscar una tarea específica
botonBuscarTarea.addEventListener('click', () => buscarTareaEspecifica());

// Función para agregar tarea
function agregarTarea() {
    const nombreTarea = entradaTarea.value.trim();
    if (nombreTarea) {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        renderizarTareas();
        entradaTarea.value = '';
    } else {
        alert('Por favor, ingresa una tarea.');
    }
}

// Función para renderizar las tareas en el DOM
function renderizarTareas() {
    renderizarListaTareas(tareas);
}

// Función para renderizar una lista de tareas proporcionada en el DOM
function renderizarListaTareas(listaDeTareas) {
    listaTareas.innerHTML = '';
    listaDeTareas.forEach((tarea, indice) => {
        const elementoTarea = document.createElement('li');
        elementoTarea.classList.add('item-tarea');

        const datosTarea = {
            nombre: tarea.nombre,
            completada: tarea.completada,
        };

        elementoTarea.innerHTML = `
            <span style="text-decoration: ${datosTarea.completada ? 'line-through' : 'none'}">
                ${datosTarea.nombre}
            </span>
            <button onclick="alternarTarea(${indice})">
                ${datosTarea.completada ? 'Desmarcar' : 'Completar'}
            </button>
            <button onclick="eliminarTarea(${indice})">Eliminar</button>
        `;

        listaTareas.appendChild(elementoTarea);
    });
}

// Función para alternar el estado de la tarea (completada o no)
function alternarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    renderizarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    renderizarTareas();
}

// Función para mostrar tareas completadas y renderizarlas en el DOM
function mostrarTareasCompletadas() {
    const tareasCompletadas = tareas.filter(tarea => tarea.completada);
    renderizarListaTareas(tareasCompletadas);
}

// Función para mostrar tareas pendientes y renderizarlas en el DOM
function mostrarTareasPendientes() {
    const tareasPendientes = tareas.filter(tarea => !tarea.completada);
    renderizarListaTareas(tareasPendientes);
}

// Función para buscar una tarea específica y mostrarla en el DOM
function buscarTareaEspecifica() {
    const nombreBuscado = entradaBuscarTarea.value.trim();
    if (nombreBuscado) {
        const tareaEncontrada = tareas.find(tarea => tarea.nombre === nombreBuscado);
        if (tareaEncontrada) {
            renderizarListaTareas([tareaEncontrada]);
        } else {
            alert('Tarea no encontrada.');
        }
    } else {
        alert('Por favor, ingresa el nombre de la tarea a buscar.');
    }
}
