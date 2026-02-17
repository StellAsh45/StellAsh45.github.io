let tipoActual = ''; /* Esto es para guardar el tipo de elemento que se va a agregar */

function abrirModal(tipo) {
    const modal = document.getElementById('modal-agregar');
    const titulo = document.getElementById('modal-titulo');
    const container = document.getElementById('campos-dinamicos');

    tipoActual = tipo;
    modal.style.display = 'block';

    let camposHTML = '';

    if (tipo === 'formacion') {
        titulo.innerText = 'Agregar Formación';
        camposHTML = `
            <div class="campo-formulario">
                <label>Año</label>
                <input type="text" id="anio" required placeholder="Ej: 2023">
            </div>
            <div class="campo-formulario">
                <label>Título</label>
                <input type="text" id="titulo" required placeholder="Ej: Curso de... ">
            </div>
            <div class="campo-formulario">
                <label>Institución</label>
                <input type="text" id="institucion" required placeholder="Ej: USC">
            </div>
        `;
    } else if (tipo === 'experiencia') {
        titulo.innerText = 'Agregar Experiencia';
        camposHTML = `
            <div class="campo-formulario">
                <label>Año</label>
                <input type="text" id="anio" required placeholder="Ej: 2023">
            </div>
            <div class="campo-formulario">
                <label>Cargo</label>
                <input type="text" id="cargo" required placeholder="Ej: Desarrollador Jr">
            </div>
            <div class="campo-formulario">
                <label>Empresa</label>
                <input type="text" id="empresa" required placeholder="Ej: Empresa XYZ">
            </div>
            <div class="campo-formulario">
                <label>Descripción</label>
                <textarea id="descripcion" class="campo-descripcion" rows="3" placeholder="Descripción de tareas..."></textarea>
            </div>
        `;
    } else if (tipo === 'idioma') {
        titulo.innerText = 'Agregar Idioma';
        camposHTML = `
            <div class="campo-formulario">
                <label>Idioma</label>
                <input type="text" id="idioma" required placeholder="Ej: Alemán">
            </div>
            <div class="campo-formulario">
                <label>Nivel</label>
                <select id="nivel">
                    <option value="Principiante (A1)">Principiante (A1)</option>
                    <option value="Básico (A2)">Básico (A2)</option>
                    <option value="Intermedio (B1)">Intermedio (B1)</option>
                    <option value="Intermedio Alto (B2)">Intermedio Alto (B2)</option>
                    <option value="Avanzado (C1)">Avanzado (C1)</option>
                    <option value="Nativo (C2)">Nativo (C2)</option>
                </select>
            </div>
        `;
    } else if (tipo === 'habilidad') {
        titulo.innerText = 'Agregar Habilidad';
        camposHTML = `
            <div class="campo-formulario">
            <label>Tecnología</label>
                <input type="text" id="nombre" required placeholder="Ej: Docker">
            </div>
            <div class="campo-formulario">
                <label>Tipo</label>
                <select id="categoria">
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                </select>
            </div>
        `;
    }

    container.innerHTML = camposHTML;
}

/* Función para cerrar el modal */ 
function cerrarModal() {
    document.getElementById('modal-agregar').style.display = 'none';
}

/* Función para guardar el nuevo elemento */
window.onclick = function (event) {
    if (event.target == document.getElementById('modal-agregar')) {
        cerrarModal();
    }
}

 /* Submit del formulario para agregar un nuevo elemento */
document.getElementById('form-agregar').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now().toString(); /* Genera un ID único basado en la fecha actual */
    let data = { id, tipo: tipoActual }; /* Objeto base con el ID y el tipo del elemento */

    if (tipoActual === 'formacion') {
        data.anio = document.getElementById('anio').value;
        data.titulo = document.getElementById('titulo').value;
        data.institucion = document.getElementById('institucion').value;
    } else if (tipoActual === 'experiencia') {
        data.anio = document.getElementById('anio').value;
        data.cargo = document.getElementById('cargo').value;
        data.empresa = document.getElementById('empresa').value;
        data.descripcion = document.getElementById('descripcion') ? document.getElementById('descripcion').value : '';
    } else if (tipoActual === 'idioma') {
        data.idioma = document.getElementById('idioma').value;
        data.nivelTexto = document.getElementById('nivel').value;
        const map = {
            'Principiante (A1)': 1,
            'Básico (A2)': 2,
            'Intermedio (B1)': 3,
            'Intermedio Alto (B2)': 4,
            'Avanzado (C1)': 5,
            'Nativo (C2)': 6
        };
        data.nivel = map[data.nivelTexto] || 1;
    } else if (tipoActual === 'habilidad') {
        data.nombre = document.getElementById('nombre').value;
        data.categoria = document.getElementById('categoria').value;
    }

    renderizarItem(data); /* Renderiza el nuevo elemento en la página */
    cerrarModal();
    e.target.reset(); /* Limpia el formulario después de agregar el elemento */
});

/* Función para renderizar un nuevo elemento en la página */
function renderizarItem(data) {
    let container;
    let camposHTML = '';

    if (data.tipo === 'formacion') {
        container = document.getElementById('lista-formacion');
        camposHTML = `
            <div class="items-linea" id="${data.id}">
                <button class="boton-borrar" onclick="eliminarElemento('${data.id}')"><i class="fa-solid fa-trash"></i></button>
                <span class="año">${data.anio}</span>
                <h3>${data.titulo}</h3>
                <p>${data.institucion}</p>
            </div>
        `;
    } else if (data.tipo === 'experiencia') {
        container = document.getElementById('lista-experiencia');
        camposHTML = `
            <div class="items-linea" id="${data.id}">
                <button class="boton-borrar" onclick="eliminarElemento('${data.id}')"><i class="fa-solid fa-trash"></i></button>
                <span class="año">${data.anio}</span>
                <h3>${data.cargo}</h3>
                <p>${data.empresa}</p>
                <span class="descripcion-laboral">${data.descripcion}</span>
            </div>
        `;
    } else if (data.tipo === 'idioma') {
        container = document.getElementById('lista-idiomas');
        let circulos = '';
        for (let i = 0; i < 6; i++) {
            circulos += `<span class="circulo ${i < data.nivel ? 'activo' : ''}"></span>`;
        }

        camposHTML = `
            <div class="tarjeta-idiomas" id="${data.id}">
                <button class="boton-borrar" onclick="eliminarElemento('${data.id}')"><i class="fa-solid fa-trash"></i></button>
                <div class="informacion-idiomas">
                    <h3>${data.idioma}</h3>
                    <span class="nivel">${data.nivelTexto}</span>
                </div>
                <div class="nivel-circulo">
                    ${circulos}
                </div>
            </div>
        `;
    } else if (data.tipo === 'habilidad') {
        container = document.getElementById(data.categoria === 'frontend' ? 'lista-habilidades-frontend' : 'lista-habilidades-backend');
        let iconClass = 'fa-solid fa-code';

        camposHTML = `
            <div class="tarjeta-tecnologias" id="${data.id}">
                <button class="boton-borrar" onclick="eliminarElemento('${data.id}')"><i class="fa-solid fa-trash"></i></button>
                <div class="icono-tecnologias">
                    <i class="${iconClass}"></i>
                </div>
                <span class="nombre-tecnologia">${data.nombre}</span>
            </div>
        `;
    }

    if (container) {
        const temp = document.createElement('div');
        temp.innerHTML = camposHTML.trim();
        container.appendChild(temp.firstChild);
    }
}
 /* Función para eliminar un elemento de la lista con mensaje de confirmacion */
function eliminarElemento(id) {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;

    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}
