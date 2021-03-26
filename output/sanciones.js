"use strict";

//Función para cargar las sanciones
function cargaSancion(accion) {
  eliminarAcciones();
  var accionTitulo = "SANCIONES";
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
  divParaCampos.setAttribute("class", "contenedorGrid2 contenedorGrid2S");
  divParaCamposFlex.appendChild(divParaCampos);
  var divCamposS = document.createElement("div");
  divCamposS.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCamposS);
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
  botonBuscar.setAttribute("onclick", "cargarSancionesAlumno()");
  var textobotonBuscar = document.createTextNode("BUSCAR");
  botonBuscar.appendChild(textobotonBuscar);
  divCampos.appendChild(botonBuscar);
} //Función que carga las sanciones del alumno


function cargarSancionesAlumno() {
  if (document.getElementById("codigoListadoBusqueda").value == "" || document.getElementById("codigoAlumno").value == "") {
    alert("Debes seleccionar un grupo y un alumno.");
  } else {
    eliminarDatosAccion();
    var nifAlumnoBuscar = document.getElementById("codigoAlumno").value;
    var jsonStringNif = JSON.stringify(nifAlumnoBuscar);
    var motivoSelect = "sancionesAlummno";
    var jsonStringMotivoSelect = JSON.stringify(motivoSelect);
    fetch("php/consultarListados.php?nifAlumno=".concat(jsonStringNif, "&MotivoSelect=").concat(jsonStringMotivoSelect)).then(function (response) {
      return response.json();
    }).then(function (data) {
      var filasAmonestacion = data["Amonestacion"].length;
      var filasExpulsion = data["Expulsion"].length;
      eliminarDatosAccion();
      var acciones1 = document.getElementById("acciones");
      var acciones = document.createElement("div");
      acciones.setAttribute("id", "contenedorFlexDatos");
      acciones1.appendChild(acciones);
      var h3 = document.createElement("h3");
      h3.setAttribute("class", "tituloSeccion");
      h3.setAttribute("id", "tituloSeccion");
      var texto = document.createTextNode("LISTADO DE LAS AMONESTACIONES Y EXPULSIONES DEL ALUMNO");
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
      var th2Texto = document.createTextNode("NIF");
      th2.appendChild(th2Texto);
      fila1.appendChild(th2);
      var th3 = document.createElement("th");
      var th3Texto = document.createTextNode("GRUPO");
      th3.appendChild(th3Texto);
      fila1.appendChild(th3);
      var tbody = document.createElement("tbody");
      tbody.setAttribute("id", "tbody");
      tabla.appendChild(tbody);
      var fila2 = document.createElement("tr");
      tbody.appendChild(fila2);
      var td2 = document.createElement("td");
      var td2Texto = document.createTextNode("".concat(data["Alumno"].nombreAlumno, " ").concat(data["Alumno"].apellidosAlumno));
      td2.appendChild(td2Texto);
      fila2.appendChild(td2);
      var td2_1 = document.createElement("td");
      var td2_1Texto = document.createTextNode("".concat(data["Alumno"].nifAlumno));
      td2_1.appendChild(td2_1Texto);
      fila2.appendChild(td2_1);
      var td2_2 = document.createElement("td");
      var td2_2Texto = document.createTextNode("".concat(data["Grupo"].denominacionGrupo));
      td2_2.appendChild(td2_2Texto);
      fila2.appendChild(td2_2);
      crearTabla(filasAmonestacion, data, "Amonestacion");
      crearTabla(filasExpulsion, data, "Expulsion");
      var divParaCamposFlex = document.createElement("div");
      divParaCamposFlex.setAttribute("class", "contenedorFlex");
      acciones.appendChild(divParaCamposFlex);
      var divParaCampos = document.createElement("div");
      divParaCampos.setAttribute("class", "contenedorGrid5 contenedorGrid5A margen");
      divParaCamposFlex.appendChild(divParaCampos);
      var divCampos2 = document.createElement("div");
      divCampos2.setAttribute("class", "contenedorCampos");
      divParaCampos.appendChild(divCampos2);
      var labelTitulo2 = document.createElement("label");
      var textolabelTitulo2 = document.createTextNode("¿Crear una sación directa?");
      labelTitulo2.appendChild(textolabelTitulo2);
      divCampos2.appendChild(labelTitulo2);
      var check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.setAttribute("id", "sancionDirecta");
      check.setAttribute("value", "".concat(data["Alumno"].idAlumno));
      check.setAttribute("onclick", "monstrarCampos()");
      labelTitulo2.appendChild(check);
      var br2 = document.createElement("br");
      divCampos2.appendChild(br2);
      var labelTitulo3 = document.createElement("label");
      labelTitulo3.setAttribute("class", "titulo oculto");
      labelTitulo3.setAttribute("id", "tituloOculto");
      var textolabelTitulo3 = document.createTextNode("Indica la causa de la sanción directa:");
      labelTitulo3.appendChild(textolabelTitulo3);
      divCampos2.appendChild(labelTitulo3);
      var br3 = document.createElement("br");
      br3.setAttribute("class", "oculto");
      br3.setAttribute("id", "brOculto");
      divCampos2.appendChild(br3);
      var textareaTitulo2 = document.createElement("textarea");
      textareaTitulo2.setAttribute("id", "causaSancionDirecta");
      textareaTitulo2.setAttribute("class", "oculto");
      divCampos2.appendChild(textareaTitulo2);
      var divCampos = document.createElement("div");
      divCampos.setAttribute("class", "contenedorCampos");
      divParaCampos.appendChild(divCampos);
      var labelTitulo = document.createElement("label");
      labelTitulo.setAttribute("class", "titulo");
      var textolabelTitulo = document.createTextNode("Indica la sanción:");
      labelTitulo.setAttribute("id", "labelSancionDirecta");
      labelTitulo.appendChild(textolabelTitulo);
      divCampos.appendChild(labelTitulo);
      var br = document.createElement("br");
      divCampos.appendChild(br);
      var textareaTitulo = document.createElement("textarea");
      textareaTitulo.setAttribute("id", "causaSancion");
      divCampos.appendChild(textareaTitulo);
      var divParaCamposFlex2 = document.createElement("div");
      divParaCamposFlex2.setAttribute("class", "contenedorFlex");
      acciones.appendChild(divParaCamposFlex2);
      var divParaCampos2 = document.createElement("div");
      divParaCampos2.setAttribute("class", "contenedorGrid5 contenedorGrid5A");
      divParaCamposFlex2.appendChild(divParaCampos2);
      var divCampos2G = document.createElement("div");
      divCampos2G.setAttribute("class", "contenedorCampos margen0");
      divParaCampos2.appendChild(divCampos2G);
      var botonBuscar = document.createElement("button");
      botonBuscar.setAttribute("id", "botonSancion");
      botonBuscar.setAttribute("class", "botones");
      botonBuscar.setAttribute("onclick", "registrarSancionAlumno(".concat(filasAmonestacion, ",").concat(filasExpulsion, ")"));
      var textobotonBuscar = document.createTextNode("GUARDAR SANCIÓN");
      botonBuscar.appendChild(textobotonBuscar);
      divCampos2G.appendChild(botonBuscar);
      var divCampos2C = document.createElement("div");
      divCampos2C.setAttribute("class", "contenedorCampos margen0");
      divParaCampos2.appendChild(divCampos2C);
      var botonBuscarC = document.createElement("button");
      botonBuscarC.setAttribute("id", "botonSancion");
      botonBuscarC.setAttribute("class", "botones botonRojo");
      botonBuscarC.setAttribute("onclick", "cargaSancion(\"Sanci\xF3n\")");
      var textobotonBuscarC = document.createTextNode("CANCELAR SANCIÓN");
      botonBuscarC.appendChild(textobotonBuscarC);
      divCampos2C.appendChild(botonBuscarC);
    })["catch"](function (err) {//console.error(err);
    });
  }
} //Función para mostrar u coultar el campo para la sanción directa.


function monstrarCampos() {
  if (document.getElementById("sancionDirecta").checked) {
    var labelTitulo = document.getElementById("tituloOculto");
    labelTitulo.removeAttribute("class");
    labelTitulo.setAttribute("class", "titulo");
    var br = document.getElementById("brOculto");
    br.removeAttribute("class");
    var textArea = document.getElementById("causaSancionDirecta");
    textArea.removeAttribute("class");
  } else {
    var _labelTitulo = document.getElementById("tituloOculto");

    _labelTitulo.removeAttribute("class");

    _labelTitulo.setAttribute("class", "titulo oculto");

    var _br = document.getElementById("brOculto");

    _br.removeAttribute("class");

    _br.setAttribute("class", "oculto");

    var _textArea = document.getElementById("causaSancionDirecta");

    _textArea.removeAttribute("class");

    _textArea.setAttribute("class", "oculto");
  }
} //Función para crear y añadir celdas a una tabla


function crearTabla(filas, data, accion) {
  var tabla = document.createElement("table");
  var divTablaExpulsion = document.getElementById("datosAccion");
  divTablaExpulsion.appendChild(tabla);
  var thead = document.createElement("thead");
  tabla.appendChild(thead);
  var fila1 = document.createElement("tr");
  thead.appendChild(fila1);
  var th = document.createElement("th");
  var thTexto = document.createTextNode("FECHA");
  th.appendChild(thTexto);
  fila1.appendChild(th);
  var th2 = document.createElement("th");
  th2.setAttribute("class", "columnas2");
  var th2Texto = document.createTextNode("CAUSAS DE LAS ".concat(accion, "ES"));
  th2.appendChild(th2Texto);
  fila1.appendChild(th2);
  var th3 = document.createElement("th");
  var th3Texto = document.createTextNode("OPERACIÓN");
  th3.appendChild(th3Texto);
  fila1.appendChild(th3);
  var tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody");
  tabla.appendChild(tbody);

  for (var i = 0; i < filas; i++) {
    var fila3 = document.createElement("tr");
    tbody.appendChild(fila3);
    var td1_1 = document.createElement("td");
    var dateString = void 0;

    if (accion == "Amonestacion") {
      dateString = data[accion][0].fechaAmonestacion;
    } else {
      dateString = data[accion][0].fechaExpulsion;
    }

    var fecha = dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
    var td1_1Texto = document.createTextNode(fecha);
    td1_1.appendChild(td1_1Texto);
    fila3.appendChild(td1_1);
    var td1_3 = document.createElement("td");
    var td1_3Texto = void 0;

    if (accion == "Amonestacion") {
      td1_3Texto = document.createTextNode("".concat(data[accion][i].denominacionCausaAmonestacion));
    } else {
      td1_3Texto = document.createTextNode("".concat(data[accion][i].denominacionCausaExpulsion));
    }

    td1_3.appendChild(td1_3Texto);
    fila3.appendChild(td1_3);
    var td1_4 = document.createElement("td");
    fila3.appendChild(td1_4);
    var labelTitulo = document.createElement("label");
    var textolabelTitulo = void 0;
    var sancionada = false;

    if (accion == "Amonestacion") {
      if (data[accion][i].idSancionAmonestacion != null && data[accion][i].idSancionAmonestacion != 0) {
        textolabelTitulo = document.createTextNode("Amonestación sancionada.");
        labelTitulo.setAttribute("class", "rojo");
        sancionada = true;
      } else {
        textolabelTitulo = document.createTextNode("Marcar para sancionar:");
        labelTitulo.setAttribute("class", "azul");
      }
    } else {
      if (data[accion][i].idSancionExpulsion != null && data[accion][i].idSancionExpulsion != 0) {
        textolabelTitulo = document.createTextNode("Expulsión sancionada.");
        labelTitulo.setAttribute("class", "rojo");
        sancionada = true;
      } else {
        textolabelTitulo = document.createTextNode("Marcar para sancionar:");
        labelTitulo.setAttribute("class", "azul");
      }
    }

    labelTitulo.appendChild(textolabelTitulo);
    td1_4.appendChild(labelTitulo);

    if (!sancionada) {
      var check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.setAttribute("id", "".concat(accion).concat(i));

      if (accion == "Amonestacion") {
        check.setAttribute("value", "".concat(data[accion][i].idAmonestacion));
      } else {
        check.setAttribute("value", "".concat(data[accion][i].idExpulsion));
      }

      labelTitulo.appendChild(check);
    } else {
      var _check = document.createElement("input");

      _check.setAttribute("type", "checkbox");

      _check.setAttribute("id", "".concat(accion).concat(i));

      _check.setAttribute("class", "botonCausa");

      if (accion == "Amonestacion") {
        _check.setAttribute("value", "".concat(data[accion][i].idAmonestacion));
      } else {
        _check.setAttribute("value", "".concat(data[accion][i].idExpulsion));
      }

      labelTitulo.appendChild(_check);
    }
  }
} //Función para registrar la sanción del alumno


function registrarSancionAlumno(numAmonestaciones, numExpulsiones) {
  if (document.getElementById("causaSancion").value == "" && document.getElementById("causaSancionDirecta").value == "" && document.getElementById("sancionDirecta").checked || document.getElementById("causaSancion").value == "" || document.getElementById("causaSancionDirecta").value == "" && document.getElementById("sancionDirecta").checked) {
    alert("Debes indicar los datos de la sanción.");
  } else {
    //insertamos la sanción.
    var denominacionSancion = document.getElementById("causaSancion").value;
    var jsonStringDenominacion = JSON.stringify(denominacionSancion);
    var fecha = new Date();
    var mes = fecha.getMonth() + 1; //obteniendo mes

    var dia = fecha.getDate(); //obteniendo dia

    var ano = fecha.getFullYear(); //obteniendo año

    if (dia < 10) dia = '0' + dia; //agrega cero si el menor de 10

    if (mes < 10) mes = '0' + mes; //agrega cero si el menor de 10

    var fechaSancion = ano + "-" + mes + "-" + dia;
    var jsonStringFecha = JSON.stringify(fechaSancion);
    var motivo = "sancion";
    var jsonStringMotivo = JSON.stringify(motivo);
    fetch("php/insertPHP.php?CausaAccion=".concat(jsonStringMotivo, "&DenominacionSancion=").concat(jsonStringDenominacion, "&FechaSancion=").concat(jsonStringFecha)).then(function (response) {
      return response.json();
    }).then(function (data) {
      actualizarAccionesSancion(data, numAmonestaciones, numExpulsiones);
    })["catch"](function (err) {});
  }
} //Función para actualizar las amonestaciones y las expulsiones segun la id de la sanción añadida en ellas


function actualizarAccionesSancion(idSancion, numAmonestaciones, numExpulsiones) {
  //Actualizo las amonestaciones con la id de sanción
  var arrayAmonestacionesElegidas = new Array();
  var checkbox;
  var idAmonestacion;

  if (numAmonestaciones > 0) {
    for (var i = 0; i < numAmonestaciones; i++) {
      checkbox = document.getElementById("Amonestacion" + i);

      if (checkbox.checked) {
        idAmonestacion = checkbox.value;
        arrayAmonestacionesElegidas.push(idAmonestacion);
        var jsonStringIdSancion = JSON.stringify(idSancion);
        var jsonStringIdAmonestacion = JSON.stringify(idAmonestacion);
        var motivo = "ActualizarAmonestacionSancion";
        var jsonStringMotivo = JSON.stringify(motivo);
        fetch("php/insertPHP.php?CausaAccion=".concat(jsonStringMotivo, "&IdSancion=").concat(jsonStringIdSancion, "&IdAmonestacion=").concat(jsonStringIdAmonestacion)).then(function (response) {
          return response.json();
        }).then(function (data) {})["catch"](function (err) {});
      }
    }
  } //Actualizo las expulsiones con la id de sanción


  if (numExpulsiones > 0) {
    var idExpulsion;

    for (var _i = 0; _i < numExpulsiones; _i++) {
      checkbox = document.getElementById("Expulsion" + _i);

      if (checkbox.checked) {
        idExpulsion = checkbox.value;

        var _jsonStringIdSancion = JSON.stringify(idSancion);

        var jsonStringIdExpulsion = JSON.stringify(idExpulsion);
        var _motivo = "ActualizarExpulsionSancion";

        var _jsonStringMotivo = JSON.stringify(_motivo);

        fetch("php/insertPHP.php?CausaAccion=".concat(_jsonStringMotivo, "&IdSancion=").concat(_jsonStringIdSancion, "&IdExpulsion=").concat(jsonStringIdExpulsion)).then(function (response) {
          return response.json();
        }).then(function (data) {})["catch"](function (err) {});
      }
    }
  } //Registrar la sanción directa.


  if (document.getElementById("sancionDirecta").checked) {
    var profesor = Profesor.id;
    var idAlumno = document.getElementById("sancionDirecta").value;
    var fecha = new Date();
    var mes = fecha.getMonth() + 1; //obteniendo mes

    var dia = fecha.getDate(); //obteniendo dia

    var ano = fecha.getFullYear(); //obteniendo año

    if (dia < 10) dia = '0' + dia; //agrega cero si el menor de 10

    if (mes < 10) mes = '0' + mes; //agrega cero si el menor de 10

    var fechaSancion = ano + "-" + mes + "-" + dia;
    var causa = document.getElementById("causaSancionDirecta").value;
    Sancion.idProfesorDirecta = profesor;
    Sancion.idAlumnoDirecta = idAlumno;
    Sancion.fechaDirecta = fechaSancion;
    Sancion.CausaDirecta = causa;
    Sancion.fechaControlFamiliaDirecta = 'N';
    Sancion.sancionDirecta = idSancion;
    var jsonStringSancionDirecta = JSON.stringify(Sancion);
    var _motivo2 = "MotivoSancionDirecta";

    var _jsonStringMotivo2 = JSON.stringify(_motivo2);

    fetch("php/insertPHP.php?CausaAccion=".concat(_jsonStringMotivo2, "&ObjSancionDirecta=").concat(jsonStringSancionDirecta)).then(function (response) {
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
      acciones.appendChild(labelTitulo);
    })["catch"](function (err) {});
  } else {
    eliminarDatosAccion();
    var acciones1 = document.getElementById("acciones");
    var acciones = document.createElement("div");
    acciones.setAttribute("id", "contenedorFlexDatos");
    acciones1.appendChild(acciones);
    var labelTitulo = document.createElement("label");
    labelTitulo.setAttribute("class", "mensaje tarjeta");
    var textolabelTitulo = document.createTextNode("La acción se ha completado correctamente.");
    labelTitulo.appendChild(textolabelTitulo);
    acciones.appendChild(labelTitulo);
  }
}