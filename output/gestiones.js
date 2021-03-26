"use strict";

//Función que carga el apartado de gestiones.
function cargaGestion(accion) {
  eliminarAcciones();
  var accionTitulo = "AMONESTACIONES Y EXPULSIONES";
  var acciones = document.getElementById("acciones");
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("GESTI\xD3N DE ".concat(accionTitulo));
  h2.appendChild(texto);
  acciones.appendChild(h2);
  var divParaCamposFlex = document.createElement("div");
  divParaCamposFlex.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlex);
  var divParaCampos = document.createElement("div");
  divParaCampos.setAttribute("class", "contenedorGrid");
  divParaCamposFlex.appendChild(divParaCampos);
  var divCampos3 = document.createElement("div");
  divCampos3.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos3);
  var botonBuscadorAmonestacion = document.createElement("button");
  botonBuscadorAmonestacion.setAttribute("id", "boton");
  botonBuscadorAmonestacion.setAttribute("class", "boton");
  botonBuscadorAmonestacion.setAttribute("onclick", "gestionarAccion(\"Amonestaci\xF3n\")");
  var textobotonBuscadorAmonestacion = document.createTextNode("GESTIONAR AMONESTACIONES");
  botonBuscadorAmonestacion.appendChild(textobotonBuscadorAmonestacion);
  divCampos3.appendChild(botonBuscadorAmonestacion);
  var divCampos4 = document.createElement("div");
  divCampos4.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos4);
  var botonBuscadorExpulsion = document.createElement("button");
  botonBuscadorExpulsion.setAttribute("id", "boton");
  botonBuscadorExpulsion.setAttribute("class", "boton");
  botonBuscadorExpulsion.setAttribute("onclick", "gestionarAccion(\"Expulsi\xF3n\")");
  var textobotonBuscadorExpulsion = document.createTextNode("GESTIONAR EXPULSIONES");
  botonBuscadorExpulsion.appendChild(textobotonBuscadorExpulsion);
  divCampos4.appendChild(botonBuscadorExpulsion);
} //Función que carga la búsqueda del alumno


function gestionarAccion(accion) {
  eliminarAcciones();
  var accionTitulo = "";

  if (accion == "Amonestación") {
    accionTitulo = "Amonestaciones";
  } else {
    accionTitulo = "Expulsiones";
  }

  var acciones = document.getElementById("acciones");
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("GESTIONAR ".concat(accionTitulo));
  h2.appendChild(texto);
  acciones.appendChild(h2);
  var divParaCamposFlex = document.createElement("div");
  divParaCamposFlex.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlex);
  var divParaCampos = document.createElement("div");
  divParaCampos.setAttribute("class", "contenedorGrid2 contenedorGrid2G");
  divParaCamposFlex.appendChild(divParaCampos);
  var divCampos = document.createElement("div");
  divCampos.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos);
  var labelTitulo = document.createElement("label");
  var textolabelTitulo = document.createTextNode("Buscar el alumno:");
  labelTitulo.appendChild(textolabelTitulo);
  divCampos.appendChild(labelTitulo);
  var br = document.createElement("br");
  divCampos.appendChild(br);
  var selectGrupos = document.createElement("select");
  selectGrupos.setAttribute("id", "codigoListadoBusqueda");
  selectGrupos.setAttribute("onChange", "cargarSelectAlumnos(this.value,\"".concat(accion, "\")"));
  divCampos.appendChild(selectGrupos);
  var optionVacia = document.createElement("option");
  var textoOptionVacia = document.createTextNode("Grupo");
  optionVacia.setAttribute("value", "");
  optionVacia.appendChild(textoOptionVacia);
  selectGrupos.appendChild(optionVacia);

  for (var i = 0; i < selectDeGrupos.Grupo.length; i++) {
    var option = document.createElement("option");
    var textoOption = document.createTextNode(selectDeGrupos.Grupo[i].denominacionGrupo);
    option.setAttribute("value", selectDeGrupos.Grupo[i].idGrupo);
    option.appendChild(textoOption);
    selectGrupos.appendChild(option);
  }

  var selectDni = document.createElement("select");
  selectDni.setAttribute("id", "codigoAlumno");
  divCampos.appendChild(selectDni);
  var botonBuscar = document.createElement("button");
  botonBuscar.setAttribute("id", "botonBuscarG");
  botonBuscar.setAttribute("class", "botones");
  botonBuscar.setAttribute("onclick", "cargarAccionesAlumno(\"".concat(accion, "\")"));
  var textobotonBuscar = document.createTextNode("BUSCAR");
  botonBuscar.appendChild(textobotonBuscar);
  divCampos.appendChild(botonBuscar);
  var divCampos2 = document.createElement("div");
  divCampos2.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos2);
  var labelTitulo2 = document.createElement("label");
  var textolabelTitulo2 = document.createTextNode("Fecha de la ".concat(accion, ":"));
  labelTitulo2.appendChild(textolabelTitulo2);
  divCampos2.appendChild(labelTitulo2);
  var br2 = document.createElement("br");
  divCampos2.appendChild(br2);
  var selectFecha = document.createElement("select");
  selectFecha.setAttribute("id", "fechaExpulsionAlumno");
  selectFecha.setAttribute("disabled", "disabled");
  divCampos2.appendChild(selectFecha);
} //Función que carga las fechas amonestaciones o expulsiones del alumno


function cargarAccionesAlumno(accion) {
  if (document.getElementById("codigoListadoBusqueda").value == "" || document.getElementById("codigoAlumno").value == "") {
    alert("Debes seleccionar un grupo y un alumno.");
  } else {
    eliminarDatosAccion();
    var idAlumnoBuscar = document.getElementById("codigoAlumno").value;
    var jsonStringId = JSON.stringify(idAlumnoBuscar);
    var motivoSelect = "";

    if (accion == "Expulsión") {
      motivoSelect = "expulsionesAlummno";
    } else {
      motivoSelect = "amonestacionesAlummno";
    }

    var jsonStringMotivoSelect = JSON.stringify(motivoSelect);
    fetch("php/consultarListados.php?idAlumno=".concat(jsonStringId, "&MotivoSelect=").concat(jsonStringMotivoSelect)).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (accion == "Expulsión") {
        Convivencia.Expulsion = data;
      } else {
        Convivencia.Amonestacion = data;
      }

      var selectFecha = document.getElementById("fechaExpulsionAlumno");
      selectFecha.removeAttribute("disabled");
      selectFecha.setAttribute("onChange", "cargarAccionSeleccionada(\"".concat(accion, "\")")); //borro los options del select

      while (selectFecha.firstChild) {
        selectFecha.removeChild(selectFecha.firstChild);
      } //Opcion para nueva causa


      var option1 = document.createElement("option");
      var textoOption1 = document.createTextNode("Selecciona una fecha");
      option1.setAttribute("value", "nulo");
      option1.appendChild(textoOption1);
      selectFecha.appendChild(option1);
      var contadorfechas = 0;

      if (accion == "Expulsión") {
        for (var i = 0; i < Convivencia.Expulsion.length; i++) {
          if (Convivencia.Expulsion[i].ControlJefeEstudiosExpulsion == "N" || Convivencia.Expulsion[i].ControlFamiliaExpulsion == "N") {
            var dateString = Convivencia.Expulsion[i].fechaExpulsion;
            var fecha = dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
            var option = document.createElement("option");
            var textoOption = document.createTextNode(fecha);
            option.setAttribute("value", Convivencia.Expulsion[i].idExpulsion);
            option.appendChild(textoOption);
            selectFecha.appendChild(option);
            contadorfechas++;
          }
        }
      } else {
        for (var _i = 0; _i < Convivencia.Amonestacion.length; _i++) {
          if (Convivencia.Amonestacion[_i].ControlFamiliaAmonestacion == "N") {
            var _dateString = Convivencia.Amonestacion[_i].fechaAmonestacion;

            var _fecha = _dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');

            var _option = document.createElement("option");

            var _textoOption = document.createTextNode(_fecha);

            _option.setAttribute("value", Convivencia.Amonestacion[_i].idAmonestacion);

            _option.appendChild(_textoOption);

            selectFecha.appendChild(_option);
            contadorfechas++;
          }
        }
      }

      if (contadorfechas == 0) {
        //borro los options del select
        while (selectFecha.firstChild) {
          selectFecha.removeChild(selectFecha.firstChild);
        }

        eliminarDatosAccion();
        var acciones1 = document.getElementById("acciones");
        var acciones = document.createElement("div");
        acciones.setAttribute("id", "contenedorFlexDatos");
        acciones1.appendChild(acciones);
        var labelTitulo = document.createElement("label");
        labelTitulo.setAttribute("class", "mensaje tarjeta");
        var textolabelTitulo = document.createTextNode("El alumno no tiene expulsiones activas.");
        labelTitulo.appendChild(textolabelTitulo);
        acciones.appendChild(labelTitulo);
      }
    })["catch"](function (err) {});
  }
} //Función que carga la acción seleccionada


function cargarAccionSeleccionada(accion) {
  eliminarDatosAccion(); //Cargar el objeto Expulsión a través de la idExpulsion elegida.

  var ExpulsionSeleccionada = {
    idExpulsion: '',
    nombreAlumnoExpulsion: '',
    apellidosAlumnoExpulsion: '',
    profesorExpulsion: '',
    cursoExpulsion: '',
    asignaturaExpulsion: '',
    causaExpulsion: ''
  }; //Cargar el objeto Amonestacion a través de la idAmonestacion elegida.

  var AmonestacionSeleccionada = {
    idAmonestacion: '',
    nombreAlumnoAmonestacion: '',
    apellidosAlumnoAmonestacion: '',
    profesorAmonestacion: '',
    cursoAmonestacion: '',
    asignaturaAmonestacion: '',
    causaAmonestacion: ''
  };
  var posicionExpulsion = -1; //posicion de la expulsion seleccionada

  var posicionAmonestacion = -1; //posicion de la amonestacion seleccionada

  var idAccionSeleccionada = document.getElementById("fechaExpulsionAlumno").value;

  if (accion == "Expulsión") {
    for (var i = 0; i < Convivencia.Expulsion.length; i++) {
      if (Convivencia.Expulsion[i].idExpulsion == idAccionSeleccionada) {
        //ID
        ExpulsionSeleccionada.idExpulsion = Convivencia.Expulsion[i].idExpulsion;
        posicionExpulsion = i; //Cargo el objeto global Expulsion para utilizarlo después

        Expulsion.idExpulsion = Convivencia.Expulsion[posicionExpulsion].idExpulsion;
        Expulsion.idAlumnoExpulsion = Convivencia.Expulsion[posicionExpulsion].idAlumnoExpulsion;
        Expulsion.idProfesorExpulsion = Convivencia.Expulsion[posicionExpulsion].idProfesorExpulsion;
        Expulsion.idAsignaturaExpulsion = Convivencia.Expulsion[posicionExpulsion].idAsignaturaExpulsion;
        Expulsion.fechaExpulsion = Convivencia.Expulsion[posicionExpulsion].fechaExpulsion;
        Expulsion.idCausaExpulsion = Convivencia.Expulsion[posicionExpulsion].idCausaExpulsion;
        Expulsion.ControlJefeEstudiosExpulsion = Convivencia.Expulsion[posicionExpulsion].ControlJefeEstudiosExpulsion;
        Expulsion.ControlFamiliaExpulsion = Convivencia.Expulsion[posicionExpulsion].ControlFamiliaExpulsion;
        Expulsion.idSancionExpulsion = Convivencia.Expulsion[posicionExpulsion].idSancionExpulsion;
      }
    }
  } else {
    for (var _i2 = 0; _i2 < Convivencia.Amonestacion.length; _i2++) {
      if (Convivencia.Amonestacion[_i2].idAmonestacion == idAccionSeleccionada) {
        //ID
        AmonestacionSeleccionada.idAmonestacion = Convivencia.Amonestacion[_i2].idAmonestacion;
        posicionAmonestacion = _i2; //Cargo el objeto global Amonestacion para utilizarlo después

        Amonestacion.idAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].idAmonestacion;
        Amonestacion.idProfesorAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].idProfesorAmonestacion;
        Amonestacion.idAlumnoAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].idAlumnoAmonestacion;
        Amonestacion.idAsignaturaAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].idAsignaturaAmonestacion;
        Amonestacion.fechaAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].fechaAmonestacion;
        Amonestacion.idCausaAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].idCausaAmonestacion;
        Amonestacion.ControlFamiliaAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].ControlFamiliaAmonestacion;
        Amonestacion.idSancionAmonestacion = Convivencia.Amonestacion[posicionAmonestacion].idSancionAmonestacion;
      }
    }
  }

  var jsonString = "";
  var motivoSelect = "";

  if (accion == "Expulsión") {
    jsonString = JSON.stringify(Convivencia.Expulsion[posicionExpulsion]);
    motivoSelect = "expulsionSeleccionada";
  } else {
    jsonString = JSON.stringify(Convivencia.Amonestacion[posicionAmonestacion]);
    motivoSelect = "amonestacionSeleccionada";
  }

  var jsonStringMotivoSelect = JSON.stringify(motivoSelect);
  fetch("php/consultarListados.php?Accion=".concat(jsonString, "&MotivoSelect=").concat(jsonStringMotivoSelect)).then(function (response) {
    return response.json();
  }).then(function (data) {
    cargarAccionAlumno(accion, data);
  })["catch"](function (err) {
    console.error(err);
  });
} //Función que carga las amonestaciones o expulsiones del alumno 


function cargarAccionAlumno(accion, data) {
  eliminarDatosAccion();
  var acciones1 = document.getElementById("acciones");
  var acciones = document.createElement("div");
  acciones.setAttribute("id", "contenedorFlexDatos");
  acciones1.appendChild(acciones);
  var h3 = document.createElement("h3");
  h3.setAttribute("class", "tituloSeccion");
  h3.setAttribute("id", "tituloSeccion");
  var texto = document.createTextNode("DATOS DE LA ".concat(accion));
  h3.appendChild(texto);
  acciones.appendChild(h3);
  var divParaCamposFlexTabla = document.createElement("div");
  divParaCamposFlexTabla.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlexTabla);
  var divTablaExpulsion = document.createElement("div");
  divTablaExpulsion.setAttribute("id", "datosAccion");
  divParaCamposFlexTabla.appendChild(divTablaExpulsion);
  var tabla = document.createElement("table");
  divTablaExpulsion.appendChild(tabla);
  var thead = document.createElement("thead");
  tabla.appendChild(thead);
  var fila1 = document.createElement("tr");
  thead.appendChild(fila1);
  var th = document.createElement("th");
  var thTexto = document.createTextNode("ALUMNO");
  th.appendChild(thTexto);
  fila1.appendChild(th);
  var th2 = document.createElement("th");
  var th2Texto = document.createTextNode("PROFESOR");
  th2.appendChild(th2Texto);
  fila1.appendChild(th2);
  var th3 = document.createElement("th");
  var th3Texto = document.createTextNode("GRUPO");
  th3.appendChild(th3Texto);
  fila1.appendChild(th3);
  var th4 = document.createElement("th");
  var th4Texto = document.createTextNode("ASIGNATURA");
  th4.appendChild(th4Texto);
  fila1.appendChild(th4);
  var tbody = document.createElement("tbody");
  tabla.appendChild(tbody);
  var fila2 = document.createElement("tr");
  tbody.appendChild(fila2);
  var td2 = document.createElement("td");
  var td2Texto = document.createTextNode("".concat(data[0].nombreAlumno, " ").concat(data[0].apellidosAlumno));
  td2.appendChild(td2Texto);
  fila2.appendChild(td2);
  var td2_1 = document.createElement("td");
  var td2_1Texto = document.createTextNode("".concat(data[1].nombreProfesor, " ").concat(data[1].apellidosProfesor));
  td2_1.appendChild(td2_1Texto);
  fila2.appendChild(td2_1);
  var td2_2 = document.createElement("td");
  var td2_2Texto = document.createTextNode(data[2].denominacionGrupo);
  td2_2.appendChild(td2_2Texto);
  fila2.appendChild(td2_2);
  var td2_3 = document.createElement("td");
  var td2_3Texto = document.createTextNode(data[3].denominacionAsignatura);
  td2_3.appendChild(td2_3Texto);
  fila2.appendChild(td2_3);
  var fila3 = document.createElement("tr");
  tbody.appendChild(fila3);
  var td3 = document.createElement("th");
  var td3Texto = document.createTextNode("CAUSA:");
  td3.appendChild(td3Texto);
  fila3.appendChild(td3);
  var td3_1 = document.createElement("td");
  td3_1.setAttribute("colspan", "3");
  var td3_1Texto = "";

  if (accion == "Expulsión") {
    td3_1Texto = document.createTextNode(data[4].denominacionCausaExpulsion);
  } else {
    td3_1Texto = document.createTextNode(data[4].denominacionCausaAmonestacion);
  }

  td3_1.appendChild(td3_1Texto);
  fila3.appendChild(td3_1);
  var divParaCamposFlexGestion = document.createElement("div");
  divParaCamposFlexGestion.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlexGestion);
  var divParaCampos = document.createElement("div");
  divParaCampos.setAttribute("class", "contenedorGrid3");
  divParaCamposFlexGestion.appendChild(divParaCampos);
  var divCampos = document.createElement("div");
  divCampos.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos);
  var labelTitulo = document.createElement("label");

  if (Expulsion.ControlJefeEstudiosExpulsion == "N" && accion == "Expulsión") {
    labelTitulo.setAttribute("class", "botonCausa");
  }

  labelTitulo.setAttribute("id", "labelFirma");
  var textolabelTitulo = document.createTextNode("Firma entregada por los padres:");
  labelTitulo.appendChild(textolabelTitulo);
  divCampos.appendChild(labelTitulo);
  var check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("id", "firma");
  check.setAttribute("onchange", "mostrarBtnGuardar()");
  labelTitulo.appendChild(check);
  var divCampos1 = document.createElement("div");
  divCampos1.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos1);

  if (accion == "Expulsión") {
    if (Expulsion.ControlJefeEstudiosExpulsion == "N") {
      var labelTitulo1 = document.createElement("label");
      labelTitulo1.setAttribute("id", "labelFirma2");
      var textolabelTitulo1 = document.createTextNode("¿Desea cancelar la expulsión?");
      labelTitulo1.appendChild(textolabelTitulo1);
      divCampos1.appendChild(labelTitulo1);
      var check2 = document.createElement("input");
      check2.setAttribute("type", "checkbox");
      check2.setAttribute("id", "estadoAccion");
      check2.setAttribute("onchange", "mostrarBtnGuardar()");
      labelTitulo1.appendChild(check2);
    }
  }

  var divCampos2 = document.createElement("div");
  divCampos2.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos2);
  var botonBuscar = document.createElement("button");
  botonBuscar.setAttribute("id", "botonGuardar");
  botonBuscar.setAttribute("class", "botones botonCausa");
  botonBuscar.setAttribute("onclick", "convertirExpulsionAmonestacion(\"".concat(accion, "\")"));
  var textobotonBuscar = document.createTextNode("ACTUALIZAR");
  botonBuscar.appendChild(textobotonBuscar);
  divCampos2.appendChild(botonBuscar);

  if (accion == "Expulsión") {
    if (Expulsion.ControlJefeEstudiosExpulsion == "N") {
      var divParaCamposFlexGestion2 = document.createElement("div");
      divParaCamposFlexGestion2.setAttribute("class", "contenedorFlex");
      acciones.appendChild(divParaCamposFlexGestion2);
      var divParaCampos2 = document.createElement("div");
      divParaCampos2.setAttribute("class", "contenedorGrid4");
      divParaCamposFlexGestion2.appendChild(divParaCampos2);
      var botonProcesar = document.createElement("button");
      botonProcesar.setAttribute("id", "botonProcesar");
      botonProcesar.setAttribute("class", "botones");
      botonProcesar.setAttribute("onclick", "procesarExpulsion()");
      var textobotonProcesar = document.createTextNode("ACEPTAR");
      botonProcesar.appendChild(textobotonProcesar);
      divParaCampos2.appendChild(botonProcesar);
      var botonBuscadorExpulsion = document.createElement("button");
      botonBuscadorExpulsion.setAttribute("id", "boton");
      botonBuscadorExpulsion.setAttribute("class", "boton botonRojo");
      botonBuscadorExpulsion.setAttribute("onclick", "cargaGestion(\"Amonestaci\xF3n\")");
      var textobotonBuscadorExpulsion = document.createTextNode("VOLVER");
      botonBuscadorExpulsion.appendChild(textobotonBuscadorExpulsion);
      divParaCampos2.appendChild(botonBuscadorExpulsion);
    }
  }

  var divParaCamposFlexGestionA = document.createElement("div");
  divParaCamposFlexGestionA.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlexGestionA);
  var divParaCamposA = document.createElement("div");
  divParaCamposA.setAttribute("class", "contenedorGrid3");
  divParaCamposFlexGestionA.appendChild(divParaCamposA);
  var divCamposA = document.createElement("div");
  divCamposA.setAttribute("class", "contenedorCampos");
  divParaCamposA.appendChild(divCamposA);

  if (accion == "Amonestación" || !document.getElementById("firma").checked) {
    if (Expulsion.ControlJefeEstudiosExpulsion == "Y" && accion == "Expulsión") {
      var _botonBuscadorExpulsion = document.createElement("button");

      _botonBuscadorExpulsion.setAttribute("id", "boton");

      _botonBuscadorExpulsion.setAttribute("class", "boton botonRojo");

      _botonBuscadorExpulsion.setAttribute("onclick", "cargaGestion(\"Amonestaci\xF3n\")");

      var _textobotonBuscadorExpulsion = document.createTextNode("CANCELAR");

      _botonBuscadorExpulsion.appendChild(_textobotonBuscadorExpulsion);

      divParaCamposA.appendChild(_botonBuscadorExpulsion);
    }

    if (accion == "Amonestación") {
      var _botonBuscadorExpulsion2 = document.createElement("button");

      _botonBuscadorExpulsion2.setAttribute("id", "boton");

      _botonBuscadorExpulsion2.setAttribute("class", "boton botonRojo");

      _botonBuscadorExpulsion2.setAttribute("onclick", "cargaGestion(\"Amonestaci\xF3n\")");

      var _textobotonBuscadorExpulsion2 = document.createTextNode("CANCELAR");

      _botonBuscadorExpulsion2.appendChild(_textobotonBuscadorExpulsion2);

      divParaCamposA.appendChild(_botonBuscadorExpulsion2);
    }
  }
} //Función que oculta o muestra el botón de actualizar dependiendo del estado de control de la expulsión o amonestación.


function mostrarBtnGuardar() {
  if (document.getElementById("firma").checked) {
    document.getElementById("botonGuardar").removeAttribute("class");
    document.getElementById("botonGuardar").setAttribute("class", "botones");
  } else {
    document.getElementById("botonGuardar").setAttribute("class", "botones botonCausa");
  }

  if (document.getElementById("estadoAccion")) {
    if (document.getElementById("estadoAccion").checked) {
      document.getElementById("botonProcesar").setAttribute("class", "botonCausa");
      document.getElementById("botonGuardar").removeAttribute("class");
      document.getElementById("botonGuardar").setAttribute("class", "botones");
    } else {
      document.getElementById("botonProcesar").removeAttribute("class");
      document.getElementById("botonProcesar").setAttribute("class", "botones");
      document.getElementById("botonGuardar").setAttribute("class", "botones botonCausa");
    }
  }
} //Función que registra la expulsión


function procesarExpulsion() {
  var jsonStringObj = JSON.stringify(Expulsion);
  var motivoConsulta;
  motivoConsulta = "procesaExpulsion";
  var jsonStringConsulta = JSON.stringify(motivoConsulta);
  fetch("php/insertPHP.php?idExpulsion=".concat(jsonStringObj, "&CausaAccion=").concat(jsonStringConsulta)).then(function (response) {
    return response.json();
  }).then(function (data) {
    eliminarDatosAccion();
    var acciones1 = document.getElementById("acciones");
    var acciones = document.createElement("div");
    acciones.setAttribute("id", "contenedorFlexDatos");
    acciones1.appendChild(acciones);
    var labelTitulo = document.createElement("label");
    labelTitulo.setAttribute("class", "mensaje tarjeta");
    var textolabelTitulo = document.createTextNode("La acción se ha completado correctamente.");
    labelTitulo.appendChild(textolabelTitulo);
    acciones.appendChild(labelTitulo); //borro los options del select

    var selectFecha = document.getElementById("fechaExpulsionAlumno");

    while (selectFecha.firstChild) {
      selectFecha.removeChild(selectFecha.firstChild);
    }
  })["catch"](function (err) {
    console.error(err);
  });
} //Función que convierte la expulsión en emonestación.


function convertirExpulsionAmonestacion(accion) {
  var idAccionSeleccionada = document.getElementById("fechaExpulsionAlumno").value;
  var jsonStringId = JSON.stringify(idAccionSeleccionada);
  var motivoConsulta;

  if (document.getElementById("firma").checked) {
    if (accion == "Expulsión") {
      motivoConsulta = "actualizaExpulsion";
    } else {
      motivoConsulta = "actualizaAmonestacion";
    }
  } else {
    motivoConsulta = "expulsionAmonestacion";
  }

  var jsonStringConsulta = JSON.stringify(motivoConsulta);
  fetch("php/insertPHP.php?idAccion=".concat(jsonStringId, "&CausaAccion=").concat(jsonStringConsulta)).then(function (response) {
    return response.json();
  }).then(function (data) {
    eliminarDatosAccion();
    var acciones1 = document.getElementById("acciones");
    var acciones = document.createElement("div");
    acciones.setAttribute("id", "contenedorFlexDatos");
    acciones1.appendChild(acciones);
    var labelTitulo = document.createElement("label");
    labelTitulo.setAttribute("class", "mensaje tarjeta");
    var textolabelTitulo = document.createTextNode("La acción se ha completado correctamente.");
    labelTitulo.appendChild(textolabelTitulo);
    acciones.appendChild(labelTitulo); //borro los options del select

    var selectFecha = document.getElementById("fechaExpulsionAlumno");

    while (selectFecha.firstChild) {
      selectFecha.removeChild(selectFecha.firstChild);
    }
  })["catch"](function (err) {
    console.error(err);
  });
}