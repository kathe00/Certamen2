import jquery=require('jquery');
const $:JQueryStatic=jquery;

/* ----------------------------------------------------------- EDITAR INFORMACIÓN ------------------------------------------------------------------- */

const formulario = document.querySelectorAll('.needs-validation');
const nom = document.getElementById('formNombre');
const rut = document.getElementById('formRut');
const tel = document.getElementById('formTelefono');
const email = document.getElementById('formEmail');
const edad = document.getElementById('formEdad');

//se recorre el formulario como un array
Array.prototype.slice.call(formulario).forEach(function (form) {
    //se crea un event listener del boton "actualizar" para validar
    form.addEventListener('submit', function (event:any){
  
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
      if($("#checkAs5").is(':checked')){
        validarInputSimple("asignatura");
      }else{
        $("#asignatura").addClass('is-valid');
      }
  
      //validar que los comentarios no sean más de 500 caracteres
      validarInputSimple("coments");
      
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
  
      //Si todo ha sido validado
      var estado1 = (nom?.matches('.is-valid')&&rut?.matches('.is-valid')&&email?.matches('.is-valid')&&tel?.matches('.is-valid')&&edad?.matches('.is-valid'));
  
      if(estado1){
        //guardar los datos
      }
  
    })
  
  })
  
  /* ---------------------- FUNCIONES -------------------- */
  
  function validarCampoNoVacio(campo:any){
    if(campo.val().length == 0){
      campo.addClass('is-invalid');
      campo.removeClass('is-valid');
      return true; //está vacío
    }else{
      campo.addClass('is-valid');
      campo.removeClass('is-invalid');
      return false; //no está vacío
    }
  }
  
  
  /* -------------- Valida nombre, email, edad----------------------*/
  
  function validarInputSimple(campo:string){
    //primera validación al enviar
    validarCampoNoVacio($("#" + campo));
  
    //se continúa validando luego de presionar el botón "enviar"
    document.getElementById(campo)?.addEventListener('input', function() {validarCampoNoVacio($("#" + campo));})
  }
  
  /* ------------------------- Validar rut ------------------ */
  
  //rut
  function formatoValidoRut(rut:any){
    var pattern = /^\d{7,8}-[k|K|\d]{1}$/;
    return pattern.test(rut);
  }
  
  function validarRut(){
    //comprobar que no esté vacío
    validarCampoNoVacio($("#rut"));
  
    //continuar validando
    document.getElementById('rut')?.addEventListener('input', function() {
      if(validarCampoNoVacio($("#rut"))){
        $("#oblRut").prop("hidden", false);
        $("#invRut").prop("hidden", true);
      }else{
        //si no está vacío, hay que asegurarse de que tenga el formato válido
        if(!formatoValidoRut($("#rut").val())){
          $("#rut").removeClass('is-valid');
          $("#rut").addClass('is-invalid');
          $("#oblRut").prop("hidden", true);
          $("#invRut").prop("hidden", false);
        }else{
          $("#rut").removeClass('is-invalid');
          $("#rut").addClass('is-valid');
          $("#oblRut").prop("hidden", true);
          $("#invRut").prop("hidden", true);
        }
      }
    })
  }
  
  /* ------------------------ Validar nro de teléfono ----------------------- */
  
  function formatoValidoTelefono(numero:any){
    if(numero > 99999999 && numero < 1000000000){
      return true;
    }else{
      return false;
    }
  }
  
  function validarTelefono(){
    //comprobar que no esté vacío
    validarCampoNoVacio($("#telefono"));
  
    //continuar validando
    document.getElementById('telefono')?.addEventListener('input', function() {
      if(validarCampoNoVacio($("#telefono"))){
        $("#oblTelefono").prop("hidden", false);
        $("#invTelefono").prop("hidden", true);
      }else{
        //si no está vacío, hay que asegurarse de que tenga el formato válido
        if(!formatoValidoTelefono($("#telefono").val())){
          $("#telefono").removeClass('is-valid');
          $("#telefono").addClass('is-invalid');
          $("#oblTelefono").prop("hidden", true);
          $("#invTelefono").prop("hidden", false);
        }else{
          $("#telefono").removeClass('is-invalid');
          $("#telefono").addClass('is-valid');
          $("#oblTelefono").prop("hidden", true);
          $("#invTelefono").prop("hidden", true);
        }
      }
    })
  }
  

/* -------------- activar comunas segun región ----------------- */
const region = document.getElementById("formRegion");

region?.addEventListener("change",function(e:any){
    let valor = $("#formRegion").val();
    console.log("a");
    console.log(valor);
    switch(valor){
        case 1: let comunasArica = ["Arica","Camarones","Putre","General Lagos"];
                desplegarComunas(comunasArica);
                break;
        case 2: let comunasTarap = ["Iquique","Alto Hospicio","Pozo Almonte","Camiña","Colchane","Huara","Pica"];
                desplegarComunas(comunasTarap);
                break;
        case 3: let comunasAntof = ["Antofagasta","Mejillones","Sierra Gorda","Taltal","Calama","Ollague","San Pedro de Atacama","Tocopilla","María Elena"];
                desplegarComunas(comunasAntof);
                break;
        case 4: let comunasAtac = ["Chañaral","Diego de Almagro","Copiapó","Caldera","Tierra Amarilla","Vallenar","Alto del Carmen"];
                desplegarComunas(comunasAtac);
                break;
    }
})

function desplegarComunas(comunas:string[]){
    let i:number;
    for(i=0; i < comunas.length ; i++){
        //crear el elemento
        let opcion = document.createElement("option");
        //dar características
        opcion.setAttribute("value",i+"");
        let nombre = document.createTextNode(comunas[i] + "");
        opcion.appendChild(nombre);
        //agregarlo 
        let select = document.getElementById("formComuna");
        select?.appendChild(opcion);
    }
}


/* -------------------------------------------- AGREGAR ANTECEDENTES CLÍNICOS ------------------------------------------------------------ */
/* *Mostrar datos iniciales* */

//lista de antecedentes y lista de fechas, los indices son respectivos
let antecedentes = ["Hospitalizado por bronquitis","Hospitalizado por intoxicación","Hospitalizado por XXXXX"];
let fechas = [new Date('Oct 20 2020'),new Date('Jan 20 2009'),new Date('Jan 20 2009')]

//mostrar
let i:number;
let ul = document.getElementById('infoAntecedentes');
mostrar();

/* *Agregar nuevos datos* */
$("#crear").on("click",function(){
    let nuevoAnt = $("#inputAntecedente").val();
    console.log(nuevoAnt);
    ocultar();
    antecedentes.unshift(nuevoAnt + "");
    //valor por defecto
    fechas.unshift(new Date('Jan 10 2021'));
    mostrar();
})


//Funcion que muestra los antecedentes clínicos
function mostrar(){
    for(i=0 ; i < (antecedentes.length) ; i++){
        
        //elementos principales
        let li = document.createElement("li");
        let div = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        //se toman los valores de los arreglos
        let antecedente = document.createTextNode(antecedentes[i] + "");
        let nuevaFecha;
        //para respetar el formato, se agrega un 0 antes del mes si es necesario
        if(fechas[i].getMonth() < 9){
            nuevaFecha = (fechas[i].getDate() + "-0" + (fechas[i].getMonth()+1) + "-" + fechas[i].getFullYear());
        }else{
            nuevaFecha = (fechas[i].getDate() + "-" + (fechas[i].getMonth()+1) + "-" + fechas[i].getFullYear());
        }
        let fecha = document.createTextNode(nuevaFecha);
        //barra separadora e icono de eliminar
        let hr = document.createElement("hr");
        let span = document.createElement("span");
        let p3 = document.createElement("p");
        //le damos las clases definidas a p3 y span
        span.setAttribute("class","material-icons");
        span.setAttribute("id","elim"+i);
        span.appendChild(document.createTextNode("delete"));
        p3.setAttribute("class","eliminar");
        
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
        li.setAttribute("id","li"+i);
        ul?.appendChild(li);
        //crear los event listener de los botones de eliminar
        let elim = document.getElementById("elim"+1);
        elim?.addEventListener("click",function(){
            console.log("eliminars");
            eliminar(i);
        })
    }
}

//función que oculta los datos, o elimina los elementos creados
function ocultar(){
    let i:number;
    for(i=0 ; i < antecedentes.length ; i++){
        $("#li"+i).remove();
    }
}


/* ELIMINAR UN ANTECEDENTE */
function eliminar(indice:number){
    ocultar();
    antecedentes.splice(indice,1);
    fechas.splice(indice,1);
    mostrar();
}