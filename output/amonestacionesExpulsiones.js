"use strict";

window.onload = function () {
  cargaSeccionLogin();
}; //Objeto que uso para el login


var Profesor = {
  id: '',
  codigo: '',
  nombre: '',
  perfilProfesor: '',
  password: ''
}; //Objeto para cargar los selects de grupos para las búsquedas

var selectDeGrupos = {
  Grupo: [{
    idGrupo: '',
    denominacionGrupo: '',
    modalidadGrupo: ''
  }]
}; //Objeto para cargar los selects de alumnos segun grupo para el listado de alumnos por grupo

var selectDeAlumnos = {
  Alumno: [{
    idAlumno: '',
    codigoAlumno: '',
    nifAlumno: '',
    nombreAlumno: '',
    apellidosAlumno: ''
  }]
}; //Objeto que se usa para registrar la amonestación

var Amonestacion = {
  idAmonestacion: '',
  idProfesorAmonestacion: '',
  idAlumnoAmonestacion: '',
  idAsignaturaAmonestacion: '',
  fechaAmonestacion: '',
  idCausaAmonestacion: '',
  ControlFamiliaAmonestacion: '',
  idSancionAmonestacion: ''
}; //Objeto que se usa para registrar la expulsion

var Expulsion = {
  idExpulsion: '',
  idAlumnoExpulsion: '',
  idProfesorExpulsion: '',
  idAsignaturaExpulsion: '',
  fechaExpulsion: '',
  idCausaExpulsion: '',
  ControlJefeEstudiosExpulsion: '',
  ControlFamiliaExpulsion: '',
  idSancionExpulsion: ''
}; //objeto que se usa para registrar una sanción directa

var Sancion = {
  idDirecta: '',
  idProfesorDirecta: '',
  idAlumnoDirecta: '',
  fechaDirecta: '',
  CausaDirecta: '',
  fechaControlFamiliaDirecta: '',
  sancionDirecta: ''
}; //Objeto que contiene todo lo relacionado con el profesor

var Convivencia = {
  Profesor: {
    idProfesor: '',
    codigoProfesor: '',
    nombreProfesor: '',
    apellidosProfesor: '',
    perfilProfesor: '',
    password: ''
  },
  Grupo: [{
    idGrupo: '',
    denominacionGrupo: '',
    modalidadGrupo: ''
  }],
  Alumno: [{
    idAlumno: '',
    nifAlumno: '',
    codigoAlumno: '',
    nombreAlumno: '',
    apellidosAlumno: '',
    direccionAlumno: '',
    telefonoAlumno: '',
    emailAlumno: '',
    idGrupo: ''
  }],
  Asignatura: [{
    idAsignatura: '',
    denominacionAsignatura: ''
  }],
  ProfGrupAsig: [{
    idprofGrupAsig: '',
    idGrupo: '',
    idProfesor: '',
    idAsignatura: ''
  }],
  CausaAmonestacion: [{
    idCausaAmonestacion: '',
    denominacionCausaAmonestacion: ''
  }],
  CausaExpulsion: [{
    idCausaExpulsion: '',
    denominacionCausaExpulsion: ''
  }],
  Amonestacion: [{
    idAmonestacion: '',
    idAlumnoAmonestacion: '',
    idProfesorAmonestacion: '',
    idAsignaturaAmonestacion: '',
    fechaAmonestacion: '',
    idCausaAmonestacion: '',
    ControlFamiliaAmonestacion: '',
    idSancionExpulsion: ''
  }],
  Expulsion: [{
    idExpulsion: '',
    idAlumnoExpulsion: '',
    idProfesorExpulsion: '',
    idAsignaturaExpulsion: '',
    fechaExpulsion: '',
    idCausaExpulsion: '',
    ControlJefeEstudiosExpulsion: '',
    ControlFamiliaExpulsion: '',
    idSancionExpulsion: ''
  }]
}; //Objetos ajax

var objetoAjax;
var objetoAjaxCausaAmonestacion;
var objetoAjaxAmonestacion;
var objetoAjaxExpulsion;

function AJAXCrearObjeto() {
  if (window.XMLHttpRequest) {
    // navegadores que siguen los estándares
    objetoAjax = new XMLHttpRequest();
  } else {
    // navegadores obsoletos
    objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return objetoAjax;
}

function AJAXCrearObjetoCausaAmonestacion() {
  if (window.XMLHttpRequest) {
    // navegadores que siguen los estándares
    objetoAjaxCausaAmonestacion = new XMLHttpRequest();
  } else {
    // navegadores obsoletos
    objetoAjaxCausaAmonestacion = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return objetoAjaxCausaAmonestacion;
}

function AJAXCrearObjetoAmonestacion() {
  if (window.XMLHttpRequest) {
    // navegadores que siguen los estándares
    objetoAjaxAmonestacion = new XMLHttpRequest();
  } else {
    // navegadores obsoletos
    objetoAjaxAmonestacion = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return objetoAjaxAmonestacion;
}

function AJAXCrearObjetoExpulsion() {
  if (window.XMLHttpRequest) {
    // navegadores que siguen los estándares
    objetoAjaxExpulsion = new XMLHttpRequest();
  } else {
    // navegadores obsoletos
    objetoAjaxExpulsion = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return objetoAjaxExpulsion;
} //@@@@@@@@@@@@@@@@@@@@@@@@ Cargar objetos para convivencia @@@@@@@@@@@@@@@@@@@@@@@@@@


function cargarObjetos() {
  //console.log("Cargando objeto convivencia");
  var idProfesor = Profesor.id;
  var jsonStringId = JSON.stringify(idProfesor);
  var perfilProfesor = Profesor.perfilProfesor;
  var jsonStringperfil = JSON.stringify(perfilProfesor); //console.log("PROFESORRRR: " + Profesor.id);

  objetoAjax = AJAXCrearObjeto();
  objetoAjax.open('GET', "php/consultaExtraerObjetos.php?idProfesor=".concat(jsonStringId, "&perfilProfesor=").concat(jsonStringperfil), true);
  objetoAjax.send();
  objetoAjax.onreadystatechange = recibirRespuestaArrayConvivencia;

  function recibirRespuestaArrayConvivencia() {
    if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
      var datos = JSON.parse(objetoAjax.responseText); //cargo los objetos

      Convivencia.Profesor = datos[0];
      Convivencia.Grupo = datos[1];
      Convivencia.Alumno = datos[2];
      Convivencia.Asignatura = datos[3];
      Convivencia.ProfGrupAsig = datos[4];
      Convivencia.CausaAmonestacion = datos[5];
      Convivencia.CausaExpulsion = datos[6];
      cargarContenido();
    }
  }
}

function cargarSelectAlumnos(idGrupo, accion) {
  var jsonStringIdGrupo = JSON.stringify(idGrupo);
  var motivoSelect = "cargarSelectGruposAlumnos";
  var jsonStringMotivoSelect3 = JSON.stringify(motivoSelect);
  fetch("php/consultarListados.php?idGrupo=".concat(jsonStringIdGrupo, "&MotivoSelect=").concat(jsonStringMotivoSelect3)).then(function (response) {
    return response.json();
  }).then(function (data) {
    selectDeAlumnos.Alumno = data;
    var selectDni = document.getElementById("codigoAlumno");
    var selectDniSize = document.getElementById("codigoAlumno").length;

    for (var i = 0; i < selectDniSize; i++) {
      var x = selectDni;
      x.remove(0);
    }

    var optionVacia2 = document.createElement("option");
    var textoOptionVacia2 = document.createTextNode("Alumno");
    optionVacia2.setAttribute("value", "");
    optionVacia2.appendChild(textoOptionVacia2);
    selectDni.appendChild(optionVacia2);

    for (var _i = 0; _i < selectDeAlumnos.Alumno.length; _i++) {
      var option = document.createElement("option");
      var textoOption = document.createTextNode("".concat(selectDeAlumnos.Alumno[_i].nombreAlumno, " ").concat(selectDeAlumnos.Alumno[_i].apellidosAlumno));

      if (accion == "Amonestación" || accion == "Sanción") {
        option.setAttribute("value", selectDeAlumnos.Alumno[_i].nifAlumno);
      } else {
        option.setAttribute("value", selectDeAlumnos.Alumno[_i].idAlumno);
      }

      option.appendChild(textoOption);
      selectDni.appendChild(option);
    }
  })["catch"](function (err) {
    console.error(err);
  });
} //@@@@@@@@@@@@@@@@@@@@@@@@ Fin Cargar objetos @@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@ Funciones para eliminar secciones @@@@@@@@@@@@@@@@@@@@@@@@@@


function eliminarCentral() {
  var seccion = document.getElementById("central");

  while (seccion.firstChild) {
    seccion.removeChild(seccion.firstChild);
  }
}

function eliminarLogin() {
  var seccion = document.getElementById("login");

  while (seccion.firstChild) {
    seccion.removeChild(seccion.firstChild);
  }
}

function eliminarAcciones() {
  var divAcciones = document.createElement("div");
  divAcciones.setAttribute("id", "acciones");
  central.appendChild(divAcciones);
  var seccion = document.getElementById("acciones");

  while (seccion.firstChild) {
    seccion.removeChild(seccion.firstChild);
  }
}

function eliminarDatosAccion() {
  var acciones = document.getElementById("acciones");

  if (document.getElementById("contenedorFlexDatos")) {
    var seccion = document.getElementById("contenedorFlexDatos");
    acciones.removeChild(seccion);
  }
} //@@@@@@@@@@@@@@@@@@@@@@@@ Funciones para cargar secciones @@@@@@@@@@@@@@@@@@@@@@@@@@
//Función para cargar el login de la página


function cargaSeccionLogin() {
  var login = document.getElementById("login");
  var divlogin = document.createElement("div");
  divlogin.setAttribute("class", "login");
  login.appendChild(divlogin);
  var parrafoIdProfesor = document.createElement("p");
  parrafoIdProfesor.setAttribute("id", "datos");
  var textoidProfesor = document.createTextNode("IDENTIFICACIÓN");
  parrafoIdProfesor.appendChild(textoidProfesor);
  divlogin.appendChild(parrafoIdProfesor);
  var imputIdProfesor = document.createElement("input");
  imputIdProfesor.setAttribute("id", "identificacion");
  imputIdProfesor.setAttribute("required", "required");
  imputIdProfesor.setAttribute("type", "text");
  imputIdProfesor.setAttribute("pattern", "[0-9]*");
  imputIdProfesor.setAttribute("placeholder", "Identificación");
  parrafoIdProfesor.appendChild(imputIdProfesor);
  imputIdProfesor.focus();
  var imputPassProfesor = document.createElement("input");
  imputPassProfesor.setAttribute("id", "password");
  imputPassProfesor.setAttribute("required", "required");
  imputPassProfesor.setAttribute("type", "password");
  imputPassProfesor.setAttribute("placeholder", "Contraseña");
  parrafoIdProfesor.appendChild(imputPassProfesor);
  var boton = document.createElement("button");
  boton.setAttribute("id", "boton");
  boton.setAttribute("class", "botones"); //boton.setAttribute("onclick", "cargarDatosConvivencia()");

  var textoboton = document.createTextNode("ENTRAR");
  boton.appendChild(textoboton);
  divlogin.appendChild(boton);
  boton.addEventListener("click", cargarDatosConvivencia);
  var central = document.getElementById("central");
  var divImg = document.createElement("div");
  divImg.setAttribute("class", "imgConvivencia");
  central.appendChild(divImg);
  var imgConvivencia = document.createElement("img");
  imgConvivencia.setAttribute("src", "img/ControlConvivencia.png");
  divImg.appendChild(imgConvivencia);
}
/*Función para realizar la conexion de convivencia*/


function cargarDatosConvivencia() {
  if (document.getElementById("identificacion").value == "" && document.getElementById("password").value == "") {
    alert("Debes introducir tu usuario y tu contraseña.");
  } else {
    if (isNaN(document.getElementById("identificacion").value)) {
      alert("El usuario debe ser numérico.");
    } else {
      var identificacion = document.getElementById("identificacion").value;
      var jsonString = JSON.stringify(identificacion);
      var password = document.getElementById("password").value;
      var jsonStringPassword = JSON.stringify(password);
      objetoAjax = AJAXCrearObjeto();
      objetoAjax.open('GET', "php/cargarConvivencia.php?identificacion=".concat(jsonString, "&password=").concat(jsonStringPassword), true);
      objetoAjax.send();
      objetoAjax.onreadystatechange = RespuestaDatosConvivencia;
    }
  }
} //Función para cargar el objeto profesor y cargar el resto de secciones


function RespuestaDatosConvivencia() {
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
    var datos = JSON.parse(objetoAjax.responseText);

    if (datos != "error") {
      //si el login es correcto
      Profesor.id = datos.idProfesor;
      Profesor.codigo = datos.codigoProfesor;
      Profesor.nombre = datos.nombreProfesor;
      Profesor.perfilProfesor = datos.perfilProfesor;

      if (Profesor.perfilProfesor == "JefeEstudios") {
        //Extraigo los grupos.
        var motivoSelect3 = "cargarGrupos";
        var jsonStringMotivoSelect3 = JSON.stringify(motivoSelect3);
        fetch("php/listados.php?&MotivoSelect=".concat(jsonStringMotivoSelect3)).then(function (response) {
          return response.json();
        }).then(function (data) {
          selectDeGrupos.Grupo = data;
        })["catch"](function (err) {
          console.error(err);
        });
      }

      cargarObjetos();
    } else {
      alert("Usuario o contraseña incorrecta.");
    }
  }
} //Función que carga el contenido para comenzar a usar la gestión de la aplicación.


function cargarContenido() {
  cargaSeccionLoginDatos();
  eliminarCentral();
  cargaSeccionPrimera();
} //función para modificar el login principal para mostrar los datos del profesor


function cargaSeccionLoginDatos() {
  var login = document.getElementById("login");
  var seccion = document.getElementById("datos");
  seccion.removeChild(document.getElementById("identificacion"));
  seccion.removeChild(document.getElementById("password"));
  var hijoNombre = document.getElementById("datos").firstChild;
  var nombreNuevo = document.createTextNode("Nombre: ");
  seccion.replaceChild(nombreNuevo, hijoNombre);
  var spanNombreProfesor = document.createElement("span");
  spanNombreProfesor.setAttribute("id", "nombreProfesor");
  var textoSpanNombreProfesor = document.createTextNode(Profesor.nombre);
  spanNombreProfesor.appendChild(textoSpanNombreProfesor);
  seccion.appendChild(spanNombreProfesor);
  var inputPerfilProfesor = document.createElement("input");
  inputPerfilProfesor.setAttribute("type", "hidden");
  inputPerfilProfesor.setAttribute("id", "perfilprofesor");
  inputPerfilProfesor.setAttribute("value", "".concat(Profesor.perfilProfesor));
  seccion.appendChild(inputPerfilProfesor);
  var boton = document.getElementById("boton");
  var hijoBoton = document.getElementById("boton").firstChild;
  var botonNuevo = document.createTextNode("SALIR");
  boton.replaceChild(botonNuevo, hijoBoton);
  boton.setAttribute("onclick", "salir()");
} //Función para salir y cargar la página principal


function salir() {
  eliminarLogin();
  eliminarCentral();
  cargaSeccionLogin();
} //Función para cargar el menú según el tipo de profesor.


function cargaSeccionPrimera() {
  var central = document.getElementById("central");
  var perfilProfesor = Profesor.perfilProfesor;

  switch (perfilProfesor) {
    case "Profesor":
      //console.log("Profesor");
      menu(perfilProfesor);
      cargaAccion("Amonestación");
      break;

    case "JefeEstudios":
      //console.log("Jefe de estudios");
      menu(perfilProfesor);
      cargaAccion("Amonestación");
      break;

    case "Guardia":
      //console.log("Profesor de guardia");
      break;

    case "Director":
      //console.log("Direcctor");
      break;

    default:
  }
} //Función para crear el menú


function menu(perfilProfesor) {
  var Menu = {
    nombres: [{
      titulo: 'Amonestaciones',
      enlace: 'cargaAccion("Amonestación")'
    }, {
      titulo: 'Expulsiones',
      enlace: 'cargaAccion("Expulsión")'
    }, {
      titulo: 'Gestiones',
      enlace: 'cargaGestion("Amonestación")'
    }, {
      titulo: 'Sanciones',
      enlace: 'cargaSancion("Sanción")'
    }, {
      titulo: 'Listados',
      enlace: 'cargaListados("Listados")'
    }]
  };
  var central = document.getElementById("central");
  var nav = document.createElement("nav");
  nav.setAttribute("class", "menu");
  central.appendChild(nav);
  var ul = document.createElement("ul");
  nav.appendChild(ul);

  for (var i = 0; i < Menu.nombres.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("id", Menu.nombres[i].titulo);
    ul.appendChild(li);
    var a = document.createElement("a");
    li.appendChild(a);
    var textoA = document.createTextNode(Menu.nombres[i].titulo);
    a.setAttribute("href", "#");
    a.setAttribute("onclick", "".concat(Menu.nombres[i].enlace));
    a.appendChild(textoA); //Si el perfil del profesor es Profesor oculto los demás menús.

    if (perfilProfesor == "Profesor" && i == 1) {
      i = Menu.nombres.length;
    }
  }
} //Función para cargar los diferentes tipos de sanciones


function cargaAccion(accion) {
  eliminarAcciones();
  var acciones = document.getElementById("acciones");
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("INFORMAR DE UNA ".concat(accion));
  h2.appendChild(texto);
  acciones.appendChild(h2);
  var divParaCamposFlex = document.createElement("div");
  divParaCamposFlex.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlex);
  var Campos = {
    amonestacion: [{
      id: 'grupo'
    }, {
      id: 'fecha'
    }, {
      id: 'alumno'
    }, {
      id: 'causa'
    }, {
      id: 'asignatura'
    }, {
      id: 'otra'
    }]
  };
  var divParaCampos = document.createElement("div");
  divParaCampos.setAttribute("class", "contenedorGrid");
  divParaCamposFlex.appendChild(divParaCampos);

  for (var i = 0; i < Campos.amonestacion.length - 1; i++) {
    if (Campos.amonestacion[i].id == "fecha") {
      var _divCampos = document.createElement("div");

      _divCampos.setAttribute("class", "contenedorCampos");

      divParaCampos.appendChild(_divCampos);

      var _labelTitulo = document.createElement("label");

      _labelTitulo.setAttribute("class", "titulo");

      var _textolabelTitulo = document.createTextNode("".concat(Campos.amonestacion[i].id));

      _labelTitulo.appendChild(_textolabelTitulo);

      _divCampos.appendChild(_labelTitulo);

      var _br = document.createElement("br");

      _divCampos.appendChild(_br);

      var fecha = new Date(); //Fecha actual

      var mes = fecha.getMonth() + 1; //obteniendo mes

      var dia = fecha.getDate(); //obteniendo dia

      var ano = fecha.getFullYear(); //obteniendo año

      if (dia < 10) dia = '0' + dia; //agrega cero si el menor de 10

      if (mes < 10) mes = '0' + mes; //agrega cero si el menor de 10

      var input = document.createElement("input");
      input.setAttribute("type", "date");
      input.setAttribute("required", "required");
      input.value = "".concat(ano + "-" + mes + "-" + dia);
      input.max = "".concat(ano + "-" + mes + "-" + dia);
      input.setAttribute("id", Campos.amonestacion[i].id);

      _divCampos.appendChild(input);

      if (accion == "Expulsión") {
        input.setAttribute("disabled", "true");
        document.getElementById(Campos.amonestacion[i].id).value = ano + "-" + mes + "-" + dia;
      }
    } else {
      var _divCampos2 = document.createElement("div");

      _divCampos2.setAttribute("class", "contenedorCampos");

      divParaCampos.appendChild(_divCampos2);

      var _labelTitulo2 = document.createElement("label");

      _labelTitulo2.setAttribute("class", "titulo");

      var _textolabelTitulo2 = document.createTextNode("".concat(Campos.amonestacion[i].id));

      _labelTitulo2.appendChild(_textolabelTitulo2);

      _divCampos2.appendChild(_labelTitulo2);

      var _br2 = document.createElement("br");

      _divCampos2.appendChild(_br2);

      var select = document.createElement("select");
      select.setAttribute("id", Campos.amonestacion[i].id);

      _divCampos2.appendChild(select);
    }
  }

  rellenarSelects(accion);
  var divCampos = document.createElement("div");
  divCampos.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos);
  var labelTitulo = document.createElement("label");
  labelTitulo.setAttribute("class", "titulo");
  var textolabelTitulo = document.createTextNode("".concat(Campos.amonestacion[5].id, " Causa"));
  labelTitulo.appendChild(textolabelTitulo);
  divCampos.appendChild(labelTitulo);
  var br = document.createElement("br");
  divCampos.appendChild(br);
  var textareaTitulo = document.createElement("textarea");
  textareaTitulo.setAttribute("disabled", "disabled");
  textareaTitulo.setAttribute("id", Campos.amonestacion[5].id);
  divCampos.appendChild(textareaTitulo);
  var botonAgregarCausa = document.createElement("button");
  botonAgregarCausa.setAttribute("id", "botonCausa");
  botonAgregarCausa.setAttribute("class", "botonCausa");
  botonAgregarCausa.setAttribute("onClick", "guardarCausa(\"".concat(accion, "\")"));
  botonAgregarCausa.setAttribute("type", "button");
  var textobotonCausa = document.createTextNode("GUARDAR CAUSA");
  botonAgregarCausa.appendChild(textobotonCausa);
  divCampos.appendChild(botonAgregarCausa);
  var divCampos2 = document.createElement("div");
  divCampos2.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos2);
  var boton = document.createElement("button");
  boton.setAttribute("id", "boton");
  boton.setAttribute("class", "boton");

  if (accion == "Amonestación") {
    boton.setAttribute("onclick", "registrarAmonestacion()");
  } else if (accion == "Expulsión") {
    boton.setAttribute("onclick", "registrarExpulsion()");
  }

  var textoboton = document.createTextNode("REGISTRAR ".concat(accion));
  boton.appendChild(textoboton);
  divCampos2.appendChild(boton);
  var divCampos3 = document.createElement("div");
  divCampos3.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos3);
  var botonBuscadorExpulsion = document.createElement("button");
  botonBuscadorExpulsion.setAttribute("id", "boton");
  botonBuscadorExpulsion.setAttribute("class", "boton botonRojo");
  botonBuscadorExpulsion.setAttribute("onclick", "eliminarAcciones()");
  var accionTitulo = "";

  if (accion == "Amonestación") {
    accionTitulo = "Amonestaciones";
  } else {
    accionTitulo = "Expulsiones";
  }

  var textobotonBuscadorExpulsion = document.createTextNode("CANCELAR ".concat(accionTitulo));
  botonBuscadorExpulsion.appendChild(textobotonBuscadorExpulsion);
  divCampos3.appendChild(botonBuscadorExpulsion);
} //Función para rellenar los selects de grupos para amonestación, expulsión, sanción y gestión.


function rellenarSelects(accion) {
  var selectGrupos = document.getElementById("grupo");
  selectGrupos.setAttribute("onChange", "cargaAlumnoSelect(this.value)");
  var optionVacia = document.createElement("option");
  var textoOptionVacia = document.createTextNode("Seleccione un grupo");
  optionVacia.setAttribute("value", "");
  optionVacia.appendChild(textoOptionVacia);
  selectGrupos.appendChild(optionVacia);

  for (var i = 0; i < Convivencia.Grupo.length; i++) {
    var _option = document.createElement("option");

    var _textoOption = document.createTextNode(Convivencia.Grupo[i].denominacionGrupo);

    _option.setAttribute("value", Convivencia.Grupo[i].idGrupo);

    _option.appendChild(_textoOption);

    selectGrupos.appendChild(_option);
  } //cargo el select de causas de amonestación


  var selectCausas = document.getElementById("causa");

  if (accion == "Amonestación") {
    for (var _i2 = 0; _i2 < Convivencia.CausaAmonestacion.length; _i2++) {
      var _option2 = document.createElement("option");

      var _textoOption2 = document.createTextNode(Convivencia.CausaAmonestacion[_i2].denominacionCausaAmonestacion);

      _option2.setAttribute("value", Convivencia.CausaAmonestacion[_i2].idCausaAmonestacion);

      _option2.appendChild(_textoOption2);

      selectCausas.appendChild(_option2);
    }
  } else {
    //cargo el select de causas de expulsion
    for (var _i3 = 0; _i3 < Convivencia.CausaExpulsion.length; _i3++) {
      var _option3 = document.createElement("option");

      var _textoOption3 = document.createTextNode(Convivencia.CausaExpulsion[_i3].denominacionCausaExpulsion);

      _option3.setAttribute("value", Convivencia.CausaExpulsion[_i3].idCausaExpulsion);

      _option3.appendChild(_textoOption3);

      selectCausas.appendChild(_option3);
    }
  } //Opcion para nueva causa


  var option = document.createElement("option");
  var textoOption = document.createTextNode("---- Otra Causa ----");
  option.setAttribute("value", "nuevacausa"); //tiene que ser el total de option que se han agregado.

  option.appendChild(textoOption);
  selectCausas.appendChild(option);
  selectCausas.setAttribute("onChange", "cargaTextarea(this.value)");
} //Función que habilita el textarea para las causas nuevas.


function cargaTextarea(valor) {
  if (valor == "nuevacausa") {
    var textarea = document.getElementById("otra");
    textarea.removeAttribute("disabled");
    textarea.focus();
    var botonAgregarCausa = document.getElementById("botonCausa");
    botonAgregarCausa.removeAttribute("class");
  }
} //Función para guardar las nuevas causas


function guardarCausa(accion) {
  if (document.getElementById("otra").value == "") {
    alert("Debes escribir la causa.");
  } else {
    var x = document.getElementById("causa").selectedIndex; //guardo el index del select que está seleccionado

    var causa = document.getElementById("otra").value;
    var selectCausas = document.getElementById("causa");
    selectCausas.remove(selectCausas.selectedIndex); //elimino la opción de otra causa

    var option = document.createElement("option");
    var textoOption = document.createTextNode(causa); //creo el nuevo option con la nueva causa.

    option.setAttribute("value", "nuevacausa");
    option.appendChild(textoOption);
    selectCausas.appendChild(option);
    document.getElementById("causa").selectedIndex = x; //muestro la opción con la nueva causa

    if (accion == "Amonestación") {
      //registro la nueva causa de amonestación en la base de datos.
      var motivo = "CausaAmonestacion";
      var jsonStringMotivo = JSON.stringify(motivo);
      var jsonString = JSON.stringify(causa);
      objetoAjax = AJAXCrearObjeto();
      objetoAjax.open('GET', "php/insertPHP.php?CausaAccion=".concat(jsonStringMotivo, "&Causa=").concat(jsonString), true);
      objetoAjax.send();
      objetoAjax.onreadystatechange = respuestaObjetoCausaAmonestacion;
    } else {
      //registro la nueva causa de expulsión en la base de datos.
      var _motivo = "CausaExpulsion";

      var _jsonStringMotivo = JSON.stringify(_motivo);

      var _jsonString = JSON.stringify(causa);

      objetoAjax = AJAXCrearObjeto();
      objetoAjax.open('GET', "php/insertPHP.php?CausaAccion=".concat(_jsonStringMotivo, "&Causa=").concat(_jsonString), true);
      objetoAjax.send();
      objetoAjax.onreadystatechange = respuestaObjetoCausaExpulsion;
    }
  }
} //Función donde se recogen las causas para actualizar el select de causas de amonestaciones


function respuestaObjetoCausaAmonestacion() {
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
    var datos = JSON.parse(objetoAjax.responseText);
    Convivencia.CausaAmonestacion = datos;
    var causa = document.getElementById("otra").value; //Guardo la opcion elegida del select

    var copia = causa; //guardo la causa de la amonestacion (texto) en otra variable
    //borro los options del select

    for (var i = 0; i < Convivencia.CausaAmonestacion.length; i++) {
      var x = document.getElementById("causa");
      x.remove(0);
    } //recargo el select de causas de amonestación


    var selectCausas = document.getElementById("causa");

    for (var _i4 = 0; _i4 < Convivencia.CausaAmonestacion.length; _i4++) {
      var option = document.createElement("option");
      var textoOption = document.createTextNode(Convivencia.CausaAmonestacion[_i4].denominacionCausaAmonestacion);
      option.setAttribute("value", Convivencia.CausaAmonestacion[_i4].idCausaAmonestacion);
      option.appendChild(textoOption);
      selectCausas.appendChild(option);
    } //Muestro la opción que hemos creado en el select


    for (var _i5 = 0; _i5 < Convivencia.CausaAmonestacion.length; _i5++) {
      var texto = document.getElementById("causa").options;

      if (texto[_i5].text == copia) {
        document.getElementById("causa").selectedIndex = _i5;
      }
    }
  }
} //Función donde se recogen las causas para actualizar el select de causas de expulsiones


function respuestaObjetoCausaExpulsion() {
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200) {
    var datos = JSON.parse(objetoAjax.responseText);
    Convivencia.CausaExpulsion = datos;
    var causa = document.getElementById("otra").value; //Guardo la opcion elegida del select

    var copia = causa; //guardo la causa de la Expulsion (texto) en otra variable
    //borro los options del select

    for (var i = 0; i < Convivencia.CausaExpulsion.length; i++) {
      var x = document.getElementById("causa");
      x.remove(0);
    } //recargo el select de causas de expulsión


    var selectCausas = document.getElementById("causa");

    for (var _i6 = 0; _i6 < Convivencia.CausaExpulsion.length; _i6++) {
      var option = document.createElement("option");
      var textoOption = document.createTextNode(Convivencia.CausaExpulsion[_i6].denominacionCausaExpulsion);
      option.setAttribute("value", Convivencia.CausaExpulsion[_i6].idCausaExpulsion);
      option.appendChild(textoOption);
      selectCausas.appendChild(option);
    } //Muestro la opción que hemos creado en el select


    for (var _i7 = 0; _i7 < Convivencia.CausaExpulsion.length; _i7++) {
      var texto = document.getElementById("causa").options;

      if (texto[_i7].text == copia) {
        document.getElementById("causa").selectedIndex = _i7;
      }
    }
  }
} //Funcion para caragar los alumnos en amonestaciones y expulsiones


function cargaAlumnoSelect(opcion) {
  var selectAlumnos = document.getElementById("alumno");

  while (selectAlumnos.firstChild) {
    selectAlumnos.removeChild(selectAlumnos.firstChild);
  } //Cargo el select de alumnos


  for (var i = 0; i < Convivencia.Alumno.length; i++) {
    if (Convivencia.Alumno[i].idGrupo === opcion) {
      var option = document.createElement("option");
      var textoOption = document.createTextNode("".concat(Convivencia.Alumno[i].nombreAlumno, " ").concat(Convivencia.Alumno[i].apellidosAlumno));
      option.setAttribute("value", Convivencia.Alumno[i].idAlumno);
      option.appendChild(textoOption);
      selectAlumnos.appendChild(option);
    }
  } //cargo el select de asignaturas dependiendo del grupo y del profesor


  var selectAsignatura = document.getElementById("asignatura");

  while (selectAsignatura.firstChild) {
    selectAsignatura.removeChild(selectAsignatura.firstChild);
  }

  for (var _i8 = 0; _i8 < Convivencia.ProfGrupAsig.length; _i8++) {
    if (Convivencia.ProfGrupAsig[_i8].idGrupo == opcion && Convivencia.ProfGrupAsig[_i8].idProfesor == Profesor.id) {
      for (var j = 0; j < Convivencia.Asignatura.length; j++) {
        if (Convivencia.Asignatura[j].idAsignatura == Convivencia.ProfGrupAsig[_i8].idAsignatura) {
          var _option4 = document.createElement("option");

          var _textoOption4 = document.createTextNode("".concat(Convivencia.Asignatura[j].denominacionAsignatura));

          _option4.setAttribute("value", Convivencia.Asignatura[j].idAsignatura);

          _option4.appendChild(_textoOption4);

          selectAsignatura.appendChild(_option4);
        }
      }
    }
  }
}

function registrarAmonestacion() {
  if (document.getElementById("grupo").value == "" || document.getElementById("alumno").value == "" || document.getElementById("asignatura").value == "" || document.getElementById("asignatura").value == "") {
    alert("Debes completar todos los campos");
  } else {
    //cuando cambie el estado de la petición
    var respuestaObjetoAmonestacion = function respuestaObjetoAmonestacion() {
      if (objetoAjaxAmonestacion.readyState == 4 && objetoAjaxAmonestacion.status == 200) {
        var datos = JSON.parse(objetoAjaxAmonestacion.responseText);

        if (datos == "Amonestacion registrada") {
          eliminarAcciones();
          var acciones = document.getElementById("acciones");
          var labelTitulo = document.createElement("label");
          labelTitulo.setAttribute("class", "mensaje tarjeta");
          var textolabelTitulo = document.createTextNode("La amonestación ha sido registrada.");
          labelTitulo.appendChild(textolabelTitulo);
          acciones.appendChild(labelTitulo);
        }
      }
    };

    Amonestacion.idProfesorAmonestacion = Convivencia.Profesor.idProfesor;
    Amonestacion.idAsignaturaAmonestacion = document.getElementById("asignatura").value;
    Amonestacion.idAlumnoAmonestacion = document.getElementById("alumno").value;
    Amonestacion.fechaAmonestacion = document.getElementById("fecha").value;
    Amonestacion.idCausaAmonestacion = document.getElementById("causa").value;
    Amonestacion.ControlFamiliaAmonestacion = "N"; //registro la nueva causa en la base de datos.

    var motivo = "MotivoAmonestacion";
    var jsonStringMotivoAmonestacion = JSON.stringify(motivo);
    var jsonString = JSON.stringify(Amonestacion);
    objetoAjaxAmonestacion = AJAXCrearObjeto();
    objetoAjaxAmonestacion.open('GET', "php/insertPHP.php?CausaAccion=".concat(jsonStringMotivoAmonestacion, "&ObjAmonestacion=").concat(jsonString), true);
    objetoAjaxAmonestacion.send();
    objetoAjaxAmonestacion.onreadystatechange = respuestaObjetoAmonestacion;
  }
}

function registrarExpulsion() {
  if (document.getElementById("grupo").value == "" || document.getElementById("alumno").value == "" || document.getElementById("asignatura").value == "" || document.getElementById("asignatura").value == "") {
    alert("Debes completar todos los campos");
  } else {
    //cuando cambie el estado de la petición
    var respuestaObjetoExpulsion = function respuestaObjetoExpulsion() {
      if (objetoAjaxExpulsion.readyState == 4 && objetoAjaxExpulsion.status == 200) {
        var datos = JSON.parse(objetoAjaxExpulsion.responseText);

        if (datos == "Expulsion registrada") {
          eliminarAcciones();
          var acciones = document.getElementById("acciones");
          var labelTitulo = document.createElement("label");
          labelTitulo.setAttribute("class", "mensaje tarjeta");
          var textolabelTitulo = document.createTextNode("La expulsión ha sido registrada.");
          labelTitulo.appendChild(textolabelTitulo);
          acciones.appendChild(labelTitulo);
        }
      }
    };

    Expulsion.idAlumnoExpulsion = document.getElementById("alumno").value;
    Expulsion.idProfesorExpulsion = Convivencia.Profesor.idProfesor;
    Expulsion.idAsignaturaExpulsion = document.getElementById("asignatura").value;
    Expulsion.fechaExpulsion = document.getElementById("fecha").value;
    Expulsion.idCausaExpulsion = document.getElementById("causa").value;
    Expulsion.ControlJefeEstudiosExpulsion = "N";
    Expulsion.ControlFamiliaExpulsion = "N"; //registro la nueva causa en la base de datos.

    var motivo = "MotivoExpulsion";
    var jsonStringMotivoExpulsion = JSON.stringify(motivo);
    var jsonString = JSON.stringify(Expulsion);
    var jsonStringDNI = JSON.stringify("DNI");
    objetoAjaxExpulsion = AJAXCrearObjeto();
    objetoAjaxExpulsion.open('GET', "php/insertPHP.php?CausaAccion=".concat(jsonStringMotivoExpulsion, "&ObjExpulsion=").concat(jsonString), true);
    objetoAjaxExpulsion.send();
    objetoAjaxExpulsion.onreadystatechange = respuestaObjetoExpulsion;
  }
}