// Referencias a los elementos del DOM
const inputTemp = document.getElementById('input-temperatura');
const selectOrigen = document.getElementById('select-origen');
const selectDestino = document.getElementById('select-destino');
const btnConvertir = document.getElementById('btn-convertir');
const divResultado = document.getElementById('resultado');
const formulario = document.getElementById('formulario-conversion');

// Función para validar si los 3 campos están llenos
function validarCampos() {
    const valor = inputTemp.value.trim();
    const origen = selectOrigen.value;
    const destino = selectDestino.value;

    // Si el valor no está vacío Y origen seleccionado Y destino seleccionado
    if (valor !== '' && origen !== '' && destino !== '') {
        btnConvertir.disabled = false; // Habilitar botón
    } else {
        btnConvertir.disabled = true; // Deshabilitar botón
    }
}

// Escuchar eventos en los inputs y selects para validar en tiempo real
inputTemp.addEventListener('input', validarCampos);
selectOrigen.addEventListener('change', validarCampos);
selectDestino.addEventListener('change', validarCampos);

// Función principal de conversión
function convertirTemperatura(evento) {
    evento.preventDefault(); // Evitar recarga de página

    // Obtener valores
    const valor = parseFloat(inputTemp.value);
    const origen = selectOrigen.value;
    const destino = selectDestino.value;

    // Si las unidades son iguales, no hay conversión necesaria
    if (origen === destino) {
        divResultado.textContent = `${valor} ${origen} es ${valor} ${destino}`;
        return;
    }

    let resultadoFinal = 0;

    // Lógica de Conversión
    // 1. Convertir todo a Celsius primero (unidad base)
    let celsius = 0;
    
    switch(origen) {
        case 'Celsius':
            celsius = valor;
            break;
        case 'Fahrenheit':
            celsius = (valor - 32) * 5 / 9;
            break;
        case 'Kelvin':
            celsius = valor - 273.15;
            break;
    }

    // 2. Convertir de Celsius a la unidad destino
    switch(destino) {
        case 'Celsius':
            resultadoFinal = celsius;
            break;
        case 'Fahrenheit':
            resultadoFinal = (celsius * 9 / 5) + 32;
            break;
        case 'Kelvin':
            resultadoFinal = celsius + 273.15;
            break;
    }

    // Redondear a 2 decimales para mejor presentación
    resultadoFinal = Math.round(resultadoFinal * 100) / 100;

    // Mostrar el resultado en el DOM con el formato solicitado
    divResultado.textContent = `${valor} ${origen} es ${resultadoFinal} ${destino}`;
}

// Escuchar el evento submit del formulario
formulario.addEventListener('submit', convertirTemperatura);