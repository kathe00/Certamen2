define(["require", "exports", "jquery"], function (require, exports, jquery) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = jquery;
    /* ----------------------------------------------------------- EDITAR INFORMACIÓN ------------------------------------------------------------------- */
    var formulario = document.querySelectorAll('.needs-validation');
    var nom = document.getElementById('formNombre');
    var rut = document.getElementById('formRut');
    var tel = document.getElementById('formTelefono');
    var email = document.getElementById('formEmail');
    var edad = document.getElementById('formEdad');
    //se recorre el formulario como un array
    Array.prototype.slice.call(formulario).forEach(function (form) {
        //se crea un event listener del boton "actualizar" para validar
        form.addEventListener('submit', function (event) {
            //validar el campo "nombre"
            validarInputSimple("formNombre");
            //validar el campo "edad"
            validarInputSimple("formEdad");
            //validar el campo "rut"
            validarRut();
            //validar el campo "email"
            validarInputSimple("formEmail");
            //validar el campo "telefono"
            validarTelefono();
            //validar el campo "asignatura"
            if ($("#checkAs5").is(':checked')) {
                validarInputSimple("asignatura");
            }
            else {
                $("#asignatura").addClass('is-valid');
            }
            //validar que los comentarios no sean más de 500 caracteres
            validarInputSimple("coments");
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            //Si todo ha sido validado
            var estado1 = ((nom === null || nom === void 0 ? void 0 : nom.matches('.is-valid')) && (rut === null || rut === void 0 ? void 0 : rut.matches('.is-valid')) && (email === null || email === void 0 ? void 0 : email.matches('.is-valid')) && (tel === null || tel === void 0 ? void 0 : tel.matches('.is-valid')) && (edad === null || edad === void 0 ? void 0 : edad.matches('.is-valid')));
            if (estado1) {
                //guardar los datos
            }
        });
    });
    /* ---------------------- FUNCIONES -------------------- */
    function validarCampoNoVacio(campo) {
        if (campo.val().length == 0) {
            campo.addClass('is-invalid');
            campo.removeClass('is-valid');
            return true; //está vacío
        }
        else {
            campo.addClass('is-valid');
            campo.removeClass('is-invalid');
            return false; //no está vacío
        }
    }
    /* -------------- Valida nombre, email, edad----------------------*/
    function validarInputSimple(campo) {
        var _a;
        //primera validación al enviar
        validarCampoNoVacio($("#" + campo));
        //se continúa validando luego de presionar el botón "enviar"
        (_a = document.getElementById(campo)) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () { validarCampoNoVacio($("#" + campo)); });
    }
    /* ------------------------- Validar rut ------------------ */
    //rut
    function formatoValidoRut(rut) {
        var pattern = /^\d{7,8}-[k|K|\d]{1}$/;
        return pattern.test(rut);
    }
    function validarRut() {
        var _a;
        //comprobar que no esté vacío
        validarCampoNoVacio($("#rut"));
        //continuar validando
        (_a = document.getElementById('rut')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () {
            if (validarCampoNoVacio($("#rut"))) {
                $("#oblRut").prop("hidden", false);
                $("#invRut").prop("hidden", true);
            }
            else {
                //si no está vacío, hay que asegurarse de que tenga el formato válido
                if (!formatoValidoRut($("#rut").val())) {
                    $("#rut").removeClass('is-valid');
                    $("#rut").addClass('is-invalid');
                    $("#oblRut").prop("hidden", true);
                    $("#invRut").prop("hidden", false);
                }
                else {
                    $("#rut").removeClass('is-invalid');
                    $("#rut").addClass('is-valid');
                    $("#oblRut").prop("hidden", true);
                    $("#invRut").prop("hidden", true);
                }
            }
        });
    }
    /* ------------------------ Validar nro de teléfono ----------------------- */
    function formatoValidoTelefono(numero) {
        if (numero > 99999999 && numero < 1000000000) {
            return true;
        }
        else {
            return false;
        }
    }
    function validarTelefono() {
        var _a;
        //comprobar que no esté vacío
        validarCampoNoVacio($("#telefono"));
        //continuar validando
        (_a = document.getElementById('telefono')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () {
            if (validarCampoNoVacio($("#telefono"))) {
                $("#oblTelefono").prop("hidden", false);
                $("#invTelefono").prop("hidden", true);
            }
            else {
                //si no está vacío, hay que asegurarse de que tenga el formato válido
                if (!formatoValidoTelefono($("#telefono").val())) {
                    $("#telefono").removeClass('is-valid');
                    $("#telefono").addClass('is-invalid');
                    $("#oblTelefono").prop("hidden", true);
                    $("#invTelefono").prop("hidden", false);
                }
                else {
                    $("#telefono").removeClass('is-invalid');
                    $("#telefono").addClass('is-valid');
                    $("#oblTelefono").prop("hidden", true);
                    $("#invTelefono").prop("hidden", true);
                }
            }
        });
    }
    /* -------------- activar comunas segun región ----------------- */
    var region = document.getElementById("formRegion");
    region === null || region === void 0 ? void 0 : region.addEventListener("change", function (e) {
        var valor = $("#formRegion").val();
        console.log("a");
        console.log(valor);
        switch (valor) {
            case 1:
                var comunasArica = ["Arica", "Camarones", "Putre", "General Lagos"];
                desplegarComunas(comunasArica);
                break;
            case 2:
                var comunasTarap = ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"];
                desplegarComunas(comunasTarap);
                break;
            case 3:
                var comunasAntof = ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollague", "San Pedro de Atacama", "Tocopilla", "María Elena"];
                desplegarComunas(comunasAntof);
                break;
            case 4:
                var comunasAtac = ["Chañaral", "Diego de Almagro", "Copiapó", "Caldera", "Tierra Amarilla", "Vallenar", "Alto del Carmen"];
                desplegarComunas(comunasAtac);
                break;
        }
    });
    function desplegarComunas(comunas) {
        var i;
        for (i = 0; i < comunas.length; i++) {
            //crear el elemento
            var opcion = document.createElement("option");
            //dar características
            opcion.setAttribute("value", i + "");
            var nombre = document.createTextNode(comunas[i] + "");
            opcion.appendChild(nombre);
            //agregarlo 
            var select = document.getElementById("formComuna");
            select === null || select === void 0 ? void 0 : select.appendChild(opcion);
        }
    }
    /* -------------------------------------------- AGREGAR ANTECEDENTES CLÍNICOS ------------------------------------------------------------ */
    /* *Mostrar datos iniciales* */
    //lista de antecedentes y lista de fechas, los indices son respectivos
    var antecedentes = ["Hospitalizado por bronquitis", "Hospitalizado por intoxicación", "Hospitalizado por XXXXX"];
    var fechas = [new Date('Oct 20 2020'), new Date('Jan 20 2009'), new Date('Jan 20 2009')];
    //mostrar
    var i;
    var ul = document.getElementById('infoAntecedentes');
    mostrar();
    /* *Agregar nuevos datos* */
    $("#crear").on("click", function () {
        var nuevoAnt = $("#inputAntecedente").val();
        console.log(nuevoAnt);
        ocultar();
        antecedentes.unshift(nuevoAnt + "");
        //valor por defecto
        fechas.unshift(new Date('Jan 10 2021'));
        mostrar();
    });
    //Funcion que muestra los antecedentes clínicos
    function mostrar() {
        for (i = 0; i < (antecedentes.length); i++) {
            //elementos principales
            var li = document.createElement("li");
            var div = document.createElement("div");
            var p1 = document.createElement("p");
            var p2 = document.createElement("p");
            //se toman los valores de los arreglos
            var antecedente = document.createTextNode(antecedentes[i] + "");
            var nuevaFecha = void 0;
            //para respetar el formato, se agrega un 0 antes del mes si es necesario
            if (fechas[i].getMonth() < 9) {
                nuevaFecha = (fechas[i].getDate() + "-0" + (fechas[i].getMonth() + 1) + "-" + fechas[i].getFullYear());
            }
            else {
                nuevaFecha = (fechas[i].getDate() + "-" + (fechas[i].getMonth() + 1) + "-" + fechas[i].getFullYear());
            }
            var fecha = document.createTextNode(nuevaFecha);
            //barra separadora e icono de eliminar
            var hr = document.createElement("hr");
            var span = document.createElement("span");
            var p3 = document.createElement("p");
            //le damos las clases definidas a p3 y span
            span.setAttribute("class", "material-icons");
            span.setAttribute("id", "elim" + i);
            span.appendChild(document.createTextNode("delete"));
            p3.setAttribute("class", "eliminar");
            //se agregan en orden los atributos
            p3.appendChild(span);
            p3.appendChild(document.createTextNode("Eliminar"));
            p2.appendChild(fecha);
            div.appendChild(p2);
            p1.appendChild(antecedente);
            div.appendChild(p1);
            li.appendChild(div);
            li.appendChild(p3);
            li.appendChild(hr);
            li.setAttribute("id", "li" + i);
            ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
            //crear los event listener de los botones de eliminar
            var elim = document.getElementById("elim" + 1);
            elim === null || elim === void 0 ? void 0 : elim.addEventListener("click", function () {
                console.log("eliminars");
                eliminar(i);
            });
        }
    }
    //función que oculta los datos, o elimina los elementos creados
    function ocultar() {
        var i;
        for (i = 0; i < antecedentes.length; i++) {
            $("#li" + i).remove();
        }
    }
    /* ELIMINAR UN ANTECEDENTE */
    function eliminar(indice) {
        ocultar();
        antecedentes.splice(indice, 1);
        fechas.splice(indice, 1);
        mostrar();
    }
});
