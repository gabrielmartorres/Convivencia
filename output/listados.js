"use strict";

//Objeto para cargar el select de profesores.
var selectDeProfesores = {
  Profesor: [{
    idProfesor: '',
    denominacionGrupo: '',
    modalidadGrupo: ''
  }]
}; //Función que carga los listados

function cargaListados(accion) {
  eliminarAcciones(accion);
  var accionTitulo = "LISTADOS";
  var acciones = document.getElementById("acciones");
  var h2 = document.createElement("h2");
  h2.setAttribute("class", "tituloSeccion");
  var texto = document.createTextNode("LISTADOS");
  h2.appendChild(texto);
  acciones.appendChild(h2);
  var divParaCamposFlex = document.createElement("div");
  divParaCamposFlex.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlex);
  var divParaCampos = document.createElement("div");
  divParaCampos.setAttribute("class", "contenedorGrid2");
  divParaCampos.setAttribute("id", "contenedorListados");
  divParaCamposFlex.appendChild(divParaCampos);
  var divCampos = document.createElement("div");
  divCampos.setAttribute("class", "contenedorCampos");
  divParaCampos.appendChild(divCampos);
  var labelTitulo = document.createElement("label");
  var textolabelTitulo = document.createTextNode("Selecciona un listado:");
  labelTitulo.appendChild(textolabelTitulo);
  divCampos.appendChild(labelTitulo);
  var br = document.createElement("br");
  divCampos.appendChild(br);
  var selectListados = document.createElement("select");
  selectListados.setAttribute("id", "selectListados");
  selectListados.setAttribute("onchange", "cambiaListados()");
  divCampos.appendChild(selectListados);
  var OpcionesListados = {
    opciones: [{
      value: 'amonestacionExpulsionSancionesAlumno',
      texto: 'Amonestaciones, expulsiones y sanciones por alumno'
    }, {
      value: 'noFecha',
      texto: 'Alumnos sin fecha de familia'
    }, {
      value: 'amonestacionExpulsionProfesor',
      texto: 'Amonestaciones y expulsiones por profesor'
    }, {
      value: 'amonestacionesGrupo',
      texto: 'Amonestaciones y expulsiones por grupo'
    }, {
      value: 'totalAmonestacionesProfesor',
      texto: 'Total de Amonestaciones y expulsiones de los profesores'
    }]
  };

  for (var i = 0; i < OpcionesListados.opciones.length; i++) {
    var opcionListado = document.createElement("option");
    var textoOpcionListado = document.createTextNode(OpcionesListados.opciones[i].texto);
    opcionListado.setAttribute("value", OpcionesListados.opciones[i].value);
    opcionListado.appendChild(textoOpcionListado);
    selectListados.appendChild(opcionListado);
  }

  var divCampos2 = document.createElement("div");
  divCampos2.setAttribute("class", "contenedorCampos");
  divCampos2.setAttribute("id", "contenedorBoton");
  divParaCampos.appendChild(divCampos2);
  var labelTitulo2 = document.createElement("label");
  labelTitulo2.setAttribute("id", "labelBuscar");
  var textolabelTitulo2 = document.createTextNode("Buscar el alumno:");
  labelTitulo2.appendChild(textolabelTitulo2);
  divCampos2.appendChild(labelTitulo2);
  var br2 = document.createElement("br");
  divCampos2.appendChild(br2);
  var selectGrupos = document.createElement("select");
  selectGrupos.setAttribute("id", "codigoListadoBusqueda");
  selectGrupos.setAttribute("class", "buscadorGrupo");
  selectGrupos.setAttribute("onChange", "cargarSelectAlumnos(this.value,\"".concat(accion, "\")"));
  divCampos2.appendChild(selectGrupos);
  var optionVacia = document.createElement("option");
  var textoOptionVacia = document.createTextNode("Grupo");
  optionVacia.setAttribute("value", "");
  optionVacia.appendChild(textoOptionVacia);
  selectGrupos.appendChild(optionVacia);

  for (var _i = 0; _i < selectDeGrupos.Grupo.length; _i++) {
    var option = document.createElement("option");
    var textoOption = document.createTextNode(selectDeGrupos.Grupo[_i].denominacionGrupo);
    option.setAttribute("value", selectDeGrupos.Grupo[_i].idGrupo);
    option.appendChild(textoOption);
    selectGrupos.appendChild(option);
  }

  var selectDni = document.createElement("select");
  selectDni.setAttribute("id", "codigoAlumno");
  selectDni.setAttribute("class", "buscadorAlumno");
  divCampos2.appendChild(selectDni);
  var botonListar = document.createElement("button");
  botonListar.setAttribute("id", "botonListar");
  botonListar.setAttribute("class", "botones");
  botonListar.setAttribute("onclick", "cargarListado()");
  var textobotonListar = document.createTextNode("LISTAR");
  botonListar.appendChild(textobotonListar);
  divCampos2.appendChild(botonListar); //extraigo los grupos

  var motivoSelect3 = "cargarProfesoresListados";
  var jsonStringMotivoSelect3 = JSON.stringify(motivoSelect3);
  fetch("php/consultarListados.php?&MotivoSelect=".concat(jsonStringMotivoSelect3)).then(function (response) {
    return response.json();
  }).then(function (data) {
    selectDeProfesores.Profesor = data;
  })["catch"](function (err) {});
} //Función para mostrar los diferentes listados


function cambiaListados() {
  var selectGrupos = document.getElementById("codigoListadoBusqueda");
  var selectGruposSize = document.getElementById("codigoListadoBusqueda").length;

  for (var i = 0; i < selectGruposSize; i++) {
    var x = selectGrupos;
    x.remove(0);
  }

  var optionVacia = document.createElement("option");
  var textoOptionVacia = document.createTextNode("Grupo");
  optionVacia.setAttribute("value", "");
  optionVacia.appendChild(textoOptionVacia);
  selectGrupos.appendChild(optionVacia);

  for (var _i2 = 0; _i2 < selectDeGrupos.Grupo.length; _i2++) {
    var option = document.createElement("option");
    var textoOption = document.createTextNode(selectDeGrupos.Grupo[_i2].denominacionGrupo);
    option.setAttribute("value", selectDeGrupos.Grupo[_i2].idGrupo);
    option.appendChild(textoOption);
    selectGrupos.appendChild(option);
  }

  var selectProfesores = document.getElementById("codigoListadoBusqueda");
  selectProfesores.removeAttribute("onchange");
  selectProfesores.setAttribute("onchange", 'cargarSelectAlumnos(this.value,"Listados")');
  var selectListados = document.getElementById("selectListados").value;

  if (selectListados == "amonestacionExpulsionSancionesAlumno" || selectListados == "amonestacionExpulsionProfesor" || selectListados == "amonestacionesGrupo") {
    var _contenedorBoton = document.getElementById("contenedorBoton");

    _contenedorBoton.removeAttribute("class");

    _contenedorBoton.setAttribute("class", "contenedorCampos");

    var botonAlumno = document.getElementById("codigoAlumno");
    botonAlumno.removeAttribute("class");
    botonAlumno.setAttribute("class", "buscadorAlumno"); //cambiar el label para profesor

    if (selectListados == "amonestacionExpulsionProfesor") {
      var labelBuscar = document.getElementById("labelBuscar");
      labelBuscar.removeChild(document.getElementById("labelBuscar").firstChild);
      var textolabelTitulo2 = document.createTextNode("Profesor:");
      labelBuscar.appendChild(textolabelTitulo2);

      var _selectProfesores = document.getElementById("codigoListadoBusqueda");

      _selectProfesores.removeAttribute("onchange");

      var _botonAlumno = document.getElementById("codigoAlumno");

      _botonAlumno.removeAttribute("class");

      _botonAlumno.setAttribute("class", "botonCausa");

      cargarSelectProfesores();
    } else {
      //cambiar el label para alumno
      if (selectListados == "amonestacionExpulsionSancionesAlumno") {
        var _labelBuscar = document.getElementById("labelBuscar");

        _labelBuscar.removeChild(document.getElementById("labelBuscar").firstChild);

        var _textolabelTitulo = document.createTextNode("NIF del alumno:");

        _labelBuscar.appendChild(_textolabelTitulo);
      } else {
        //cambiar el label para grupos
        var _labelBuscar2 = document.getElementById("labelBuscar");

        _labelBuscar2.removeChild(document.getElementById("labelBuscar").firstChild);

        var _textolabelTitulo2 = document.createTextNode("Grupo:");

        _labelBuscar2.appendChild(_textolabelTitulo2);

        if (selectListados == "amonestacionesGrupo") {
          var _botonAlumno2 = document.getElementById("codigoAlumno");

          _botonAlumno2.removeAttribute("class");

          _botonAlumno2.setAttribute("class", "botonCausa");
        }
      }
    }
  } else {
    contenedorBoton.removeAttribute("class");
    contenedorBoton.setAttribute("class", "contenedorCampos oculto2");
    cargarListado();
  }
} //Función para cargar el select de profesores


function cargarSelectProfesores() {
  var selectProfesores = document.getElementById("codigoListadoBusqueda");
  var selectProfesoresSize = document.getElementById("codigoListadoBusqueda").length;

  for (var i = 0; i < selectProfesoresSize; i++) {
    var x = selectProfesores;
    x.remove(0);
  }

  var optionVacia2 = document.createElement("option");
  var textoOptionVacia2 = document.createTextNode("Profesor");
  optionVacia2.setAttribute("value", "");
  optionVacia2.appendChild(textoOptionVacia2);
  selectProfesores.appendChild(optionVacia2);

  for (var _i3 = 0; _i3 < selectDeProfesores.Profesor.length; _i3++) {
    var option = document.createElement("option");
    var textoOption = document.createTextNode("".concat(selectDeProfesores.Profesor[_i3].nombreProfesor, " ").concat(selectDeProfesores.Profesor[_i3].apellidosProfesor));
    option.setAttribute("value", selectDeProfesores.Profesor[_i3].codigoProfesor);
    option.appendChild(textoOption);
    selectProfesores.appendChild(option);
  }
} //Función para cargar los listados


function cargarListado() {
  var listado = document.getElementById("selectListados").value;

  switch (listado) {
    case "amonestacionExpulsionSancionesAlumno":
      //Muestra el listado de amonestaciones, expulsiones y sanciones por alumno
      if (document.getElementById("codigoListadoBusqueda").value == "" || document.getElementById("codigoAlumno").value == "") {
        alert("Debes seleccionar un grupo y un alumno.");
      } else {
        var nifAlumnoBuscar = document.getElementById("codigoAlumno").value;
        var jsonStringNif = JSON.stringify(nifAlumnoBuscar);
        var _motivoSelect = "amonestacionExpulsionSancionesAlumno";

        var _jsonStringMotivoSelect = JSON.stringify(_motivoSelect);

        fetch("php/listados.php?nifAlumno=".concat(jsonStringNif, "&MotivoSelect=").concat(_jsonStringMotivoSelect)).then(function (response) {
          return response.json();
        }).then(function (data) {
          eliminarDatosAccion();
          var acciones = document.getElementById("acciones");
          var contenedorFlexDatos = document.createElement("div");
          contenedorFlexDatos.setAttribute("id", "contenedorFlexDatos");
          acciones.appendChild(contenedorFlexDatos); //Tabla de alumno

          var cabecera = ["ALUMNO", "NIF", "GRUPO"];
          var cantidadColumnas = cabecera.length;
          var cantidadFilas = 2;
          var titulo = "LISTADO DE LAS AMONESTACIONES, EXPULSIONES y SANCIONES DEL ALUMNO";
          var nombretabla = "alumno";
          createTabla(data, titulo, nombretabla, cantidadFilas, cantidadColumnas, cabecera);
          agregarCelda(nombretabla + "-0-0", "".concat(data["Alumno"].nombreAlumno, " ").concat(data["Alumno"].apellidosAlumno));
          agregarCelda(nombretabla + "-0-1", data["Alumno"].nifAlumno);
          agregarCelda(nombretabla + "-0-2", data.Grupo.denominacionGrupo); //Tabla de Amonestaciones

          cabecera = ["FECHA", "PROFESOR", "ASIGNATURA", "CAUSA DE AMONESTACIÓN"];
          cantidadColumnas = cabecera.length;
          cantidadFilas = data.Amonestacion.length;
          titulo = "";
          nombretabla = "amonestaciones";
          createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera);

          if (cantidadFilas == 0) {
            var labelTitulo = document.createElement("label");
            labelTitulo.setAttribute("class", "mensaje2");
            var textolabelTitulo = document.createTextNode("No hay amonestaciones.");
            labelTitulo.appendChild(textolabelTitulo);
            contenedorFlexDatos.appendChild(labelTitulo);
          }

          for (var i = 0; i < cantidadFilas; i++) {
            for (var j = 0; j < cantidadColumnas; j++) {
              switch (j) {
                case 0:
                  //fecha
                  var dateString = data.Amonestacion[i].fechaAmonestacion;
                  var fecha = dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
                  agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), fecha);
                  break;

                case 1:
                  //profesor
                  var nombreProfesor = void 0;

                  for (var x = 0; x < data.Profesor.length; x++) {
                    if (data.Profesor[x].idProfesor == data.Amonestacion[i].idProfesorAmonestacion) {
                      nombreProfesor = data.Profesor[x].nombreProfesor + " " + data.Profesor[x].apellidosProfesor;
                      x = data.Profesor.length;
                    }
                  }

                  agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nombreProfesor);
                  break;

                case 2:
                  //asignatura
                  var denominacionAsignatura = void 0;

                  for (var _x = 0; _x < data.Asignatura.length; _x++) {
                    if (data.Asignatura[_x].idAsignatura == data.Amonestacion[i].idAsignaturaAmonestacion) {
                      denominacionAsignatura = data.Asignatura[_x].denominacionAsignatura;
                      _x = data.Asignatura.length;
                    }
                  }

                  agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), denominacionAsignatura);
                  break;

                case 3:
                  //causa
                  agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), data.Amonestacion[i].denominacionCausaAmonestacion);
                  break;
              }
            }
          } //Tabla de Expulsiones


          cabecera = ["FECHA", "PROFESOR", "ASIGNATURA", "CAUSA DE EXPULSIÓN"];
          cantidadColumnas = cabecera.length;
          cantidadFilas = data.Expulsion.length;
          titulo = "";
          nombretabla = "expulsiones";
          createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera);

          if (cantidadFilas == 0) {
            var _labelTitulo = document.createElement("label");

            _labelTitulo.setAttribute("class", "mensaje2");

            var _textolabelTitulo3 = document.createTextNode("No hay expulsiones.");

            _labelTitulo.appendChild(_textolabelTitulo3);

            contenedorFlexDatos.appendChild(_labelTitulo);
          }

          for (var _i4 = 0; _i4 < cantidadFilas; _i4++) {
            for (var _j = 0; _j < cantidadColumnas; _j++) {
              switch (_j) {
                case 0:
                  //fecha
                  var _dateString = data.Expulsion[_i4].fechaExpulsion;

                  var _fecha = _dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');

                  agregarCelda("".concat(nombretabla, "-").concat(_i4, "-").concat(_j), _fecha);
                  break;

                case 1:
                  //profesor
                  var _nombreProfesor = void 0;

                  for (var _x2 = 0; _x2 < data.Profesor.length; _x2++) {
                    if (data.Profesor[_x2].idProfesor == data.Expulsion[_i4].idProfesorExpulsion) {
                      _nombreProfesor = data.Profesor[_x2].nombreProfesor + " " + data.Profesor[_x2].apellidosProfesor;
                      _x2 = data.Profesor.length;
                    }
                  }

                  agregarCelda("".concat(nombretabla, "-").concat(_i4, "-").concat(_j), _nombreProfesor);
                  break;

                case 2:
                  //asignatura
                  var _denominacionAsignatura = void 0;

                  for (var _x3 = 0; _x3 < data.Asignatura.length; _x3++) {
                    if (data.Asignatura[_x3].idAsignatura == data.Expulsion[_i4].idAsignaturaExpulsion) {
                      _denominacionAsignatura = data.Asignatura[_x3].denominacionAsignatura;
                      _x3 = data.Asignatura.length;
                    }
                  }

                  agregarCelda("".concat(nombretabla, "-").concat(_i4, "-").concat(_j), _denominacionAsignatura);
                  break;

                case 3:
                  //causa
                  agregarCelda("".concat(nombretabla, "-").concat(_i4, "-").concat(_j), data.Expulsion[_i4].denominacionCausaExpulsion);
                  break;
              }
            }
          } //Tabla de sanciones


          cabecera = ["FECHA", "CAUSA DE SANCIÓN"];
          cantidadColumnas = cabecera.length;
          ;
          cantidadFilas = data.Sancion.length;
          titulo = "";
          nombretabla = "sanciones";
          createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera);

          if (cantidadFilas == 0) {
            var _labelTitulo2 = document.createElement("label");

            _labelTitulo2.setAttribute("class", "mensaje2");

            var _textolabelTitulo4 = document.createTextNode("No hay sanciones.");

            _labelTitulo2.appendChild(_textolabelTitulo4);

            contenedorFlexDatos.appendChild(_labelTitulo2);
          }

          for (var _i5 = 0; _i5 < cantidadFilas; _i5++) {
            for (var _j2 = 0; _j2 < cantidadColumnas; _j2++) {
              switch (_j2) {
                case 0:
                  //fecha
                  var _dateString2 = data.Sancion[_i5].fechaSancion;

                  var _fecha2 = _dateString2.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');

                  agregarCelda("".concat(nombretabla, "-").concat(_i5, "-").concat(_j2), _fecha2);
                  break;

                case 1:
                  //causa
                  agregarCelda("".concat(nombretabla, "-").concat(_i5, "-").concat(_j2), data.Sancion[_i5].denominacionSancion);
                  break;
              }
            }
          }
        })["catch"](function (err) {
          eliminarDatosAccion();
          var acciones = document.getElementById("acciones");
          var contenedorFlexDatos = document.createElement("div");
          contenedorFlexDatos.setAttribute("id", "contenedorFlexDatos");
          acciones.appendChild(contenedorFlexDatos);
          var labelTitulo = document.createElement("label");
          labelTitulo.setAttribute("class", "mensaje");
          var select = document.getElementById("codigoAlumno");
          var selected = select.options[select.selectedIndex].text;
          var textolabelTitulo = document.createTextNode("El alumno ".concat(selected, " tiene un registro impecable."));
          labelTitulo.appendChild(textolabelTitulo);
          contenedorFlexDatos.appendChild(labelTitulo);
        });
      }

      break;

    case "noFecha":
      //Listado para amonestaciones o expulsiones sin fecha de la familia
      var motivoSelect = "noFechaFamilia";
      var jsonStringMotivoSelect = JSON.stringify(motivoSelect);
      fetch("php/listados.php?MotivoSelect=".concat(jsonStringMotivoSelect)).then(function (response) {
        return response.json();
      }).then(function (data) {
        eliminarDatosAccion();
        var acciones = document.getElementById("acciones");
        var contenedorFlexDatos = document.createElement("div");
        contenedorFlexDatos.setAttribute("id", "contenedorFlexDatos");
        acciones.appendChild(contenedorFlexDatos); //tabla de alumnos

        var nombretabla;
        var cabecera;
        var titulo;
        var cantidadColumnas;
        var cantidadFilas;

        for (var n = 1; n < 3; n++) {
          switch (n) {
            case 1:
              nombretabla = "amonestacionAlumno";
              cabecera = ["ALUMNO", "NIF", "GRUPO", "FECHA", "AMONESTACIÓN"];
              titulo = "LISTADO DE ALUMNOS SIN TRAER LA FIRMA DE LA FAMILIA";
              cantidadColumnas = cabecera.length;
              cantidadFilas = data["Amonestacion"].length;
              createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera); //Si no hay filas

              if (cantidadFilas == 0) {
                var labelTitulo = document.createElement("label");
                labelTitulo.setAttribute("class", "mensaje2");
                var textolabelTitulo = document.createTextNode("No hay amonestaciones sin firma de familia.");
                labelTitulo.appendChild(textolabelTitulo);
                contenedorFlexDatos.appendChild(labelTitulo);
              } //Añadimos las celdas de amonestaciones.


              for (var i = 0; i < cantidadFilas; i++) {
                for (var j = 0; j < cantidadColumnas; j++) {
                  switch (j) {
                    case 0:
                      //Alumno
                      var nombreAlumno = void 0;

                      for (var x = 0; x < data.Alumno.length; x++) {
                        if (data["Alumno"][x].idAlumno == data.Amonestacion[i].idAlumnoAmonestacion) {
                          nombreAlumno = data["Alumno"][x].nombreAlumno + " " + data["Alumno"][x].apellidosAlumno;
                          x = data.Alumno.length;
                        }
                      }

                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nombreAlumno);
                      break;

                    case 1:
                      //NIF
                      var nifAlumno = void 0;

                      for (var _x4 = 0; _x4 < data.Alumno.length; _x4++) {
                        if (data["Alumno"][_x4].idAlumno == data.Amonestacion[i].idAlumnoAmonestacion) {
                          nifAlumno = data["Alumno"][_x4].nifAlumno;
                          _x4 = data.Alumno.length;
                        }
                      }

                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nifAlumno);
                      break;

                    case 2:
                      //Grupo
                      var grupo = void 0;

                      for (var _x5 = 0; _x5 < data.Alumno.length; _x5++) {
                        if (data["Alumno"][_x5].idAlumno == data.Amonestacion[i].idAlumnoAmonestacion) {
                          var idGrupo = data["Alumno"][_x5].idGrupo;

                          for (var k = 0; k < data.Grupo.length; k++) {
                            if (data["Grupo"][k].idGrupo == idGrupo) {
                              grupo = data["Grupo"][k].denominacionGrupo;
                              k = data.Grupo.length;
                            }
                          }

                          _x5 = data.Alumno.length;
                        }
                      }

                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), grupo);
                      break;

                    case 3:
                      //fecha
                      var dateString = data.Amonestacion[i].fechaAmonestacion;
                      var fecha = dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), fecha);
                      break;

                    case 4:
                      //causa
                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), data.Amonestacion[i].denominacionCausaAmonestacion);
                      break;
                  }
                }
              }

              break;

            case 2:
              nombretabla = "expulsionAlumno";
              cabecera = ["ALUMNO", "NIF", "GRUPO", "FECHA", "EXPULSIÓN"];
              titulo = "";
              cantidadColumnas = cabecera.length;
              cantidadFilas = data["Expulsion"].length;
              createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera);

              if (cantidadFilas == 0) {
                var _labelTitulo3 = document.createElement("label");

                _labelTitulo3.setAttribute("class", "mensaje2");

                var _textolabelTitulo5 = document.createTextNode("No hay expulsiones sin firma de familia.");

                _labelTitulo3.appendChild(_textolabelTitulo5);

                contenedorFlexDatos.appendChild(_labelTitulo3);
              } //Añadimos las celdas de expulsiones.


              for (var _i6 = 0; _i6 < cantidadFilas; _i6++) {
                for (var _j3 = 0; _j3 < cantidadColumnas; _j3++) {
                  switch (_j3) {
                    case 0:
                      //Alumno
                      var _nombreAlumno = void 0;

                      for (var _x6 = 0; _x6 < data.Alumno.length; _x6++) {
                        if (data["Alumno"][_x6].idAlumno == data.Expulsion[_i6].idAlumnoExpulsion) {
                          _nombreAlumno = data["Alumno"][_x6].nombreAlumno + " " + data["Alumno"][_x6].apellidosAlumno;
                          _x6 = data.Alumno.length;
                        }
                      }

                      agregarCelda("".concat(nombretabla, "-").concat(_i6, "-").concat(_j3), _nombreAlumno);
                      break;

                    case 1:
                      //NIF
                      var _nifAlumno = void 0;

                      for (var _x7 = 0; _x7 < data.Alumno.length; _x7++) {
                        if (data["Alumno"][_x7].idAlumno == data.Expulsion[_i6].idAlumnoExpulsion) {
                          _nifAlumno = data["Alumno"][_x7].nifAlumno;
                          _x7 = data.Alumno.length;
                        }
                      }

                      agregarCelda("".concat(nombretabla, "-").concat(_i6, "-").concat(_j3), _nifAlumno);
                      break;

                    case 2:
                      //Grupo
                      var _grupo = void 0;

                      for (var _x8 = 0; _x8 < data.Alumno.length; _x8++) {
                        if (data["Alumno"][_x8].idAlumno == data.Expulsion[_i6].idAlumnoExpulsion) {
                          var _idGrupo = data["Alumno"][_x8].idGrupo;

                          for (var _k = 0; _k < data.Grupo.length; _k++) {
                            if (data["Grupo"][_k].idGrupo == _idGrupo) {
                              _grupo = data["Grupo"][_k].denominacionGrupo;
                              _k = data.Grupo.length;
                            }
                          }

                          _x8 = data.Alumno.length;
                        }
                      }

                      agregarCelda("".concat(nombretabla, "-").concat(_i6, "-").concat(_j3), _grupo);
                      break;

                    case 3:
                      //fecha
                      var _dateString3 = data.Expulsion[_i6].fechaExpulsion;

                      var _fecha3 = _dateString3.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');

                      agregarCelda("".concat(nombretabla, "-").concat(_i6, "-").concat(_j3), _fecha3);
                      break;

                    case 4:
                      //causa
                      agregarCelda("".concat(nombretabla, "-").concat(_i6, "-").concat(_j3), data.Expulsion[_i6].denominacionCausaExpulsion);
                      break;
                  }
                }
              }

              break;
          }
        }
      })["catch"](function (err) {
        console.error(err);
      });
      break;

    case "amonestacionExpulsionProfesor":
      //Listado de amonestaciones y expulsiones por profesor
      if (document.getElementById("codigoListadoBusqueda").value == "") {
        alert("Debes seleccionar un profesor.");
      } else {
        var codigoProfesorBuscar = document.getElementById("codigoListadoBusqueda").value;
        var jsonStringCodigo = JSON.stringify(codigoProfesorBuscar);
        var motivoSelect2 = "amonestacionExpulsionProfesor";
        var jsonStringMotivoSelect2 = JSON.stringify(motivoSelect2);
        fetch("php/listados.php?codigoProfesor=".concat(jsonStringCodigo, "&MotivoSelect=").concat(jsonStringMotivoSelect2)).then(function (response) {
          return response.json();
        }).then(function (data) {
          eliminarDatosAccion();
          var acciones = document.getElementById("acciones");
          var contenedorFlexDatos = document.createElement("div");
          contenedorFlexDatos.setAttribute("id", "contenedorFlexDatos");
          acciones.appendChild(contenedorFlexDatos); //Tabla de alumno

          var cabecera = ["PROFESOR", "CÓDIGO"];
          var cantidadColumnas = cabecera.length;
          var cantidadFilas = 2;
          var titulo = "LISTADO DE LAS AMONESTACIONES Y EXPULSIONES POR PROFESOR";
          var nombretabla = "profesor";
          createTabla(data, titulo, nombretabla, cantidadFilas, cantidadColumnas, cabecera);
          agregarCelda(nombretabla + "-0-0", "".concat(data["Profesor"].nombreProfesor, " ").concat(data["Profesor"].apellidosProfesor));
          agregarCelda(nombretabla + "-0-1", data["Profesor"].codigoProfesor); //tabla de alumnos

          for (var n = 1; n < 3; n++) {
            switch (n) {
              case 1:
                nombretabla = "amonestacionAlumno";
                cabecera = ["ALUMNO", "NIF", "GRUPO", "FECHA", "AMONESTACIÓN"];
                titulo = "";
                cantidadColumnas = cabecera.length;
                cantidadFilas = data["Amonestacion"].length;
                createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera);

                if (cantidadFilas == 0) {
                  var labelTitulo = document.createElement("label");
                  labelTitulo.setAttribute("class", "mensaje2");
                  var textolabelTitulo = document.createTextNode("No hay amonestaciones.");
                  labelTitulo.appendChild(textolabelTitulo);
                  contenedorFlexDatos.appendChild(labelTitulo);
                } //Añadimos las celdas de amonestaciones.


                for (var i = 0; i < cantidadFilas; i++) {
                  for (var j = 0; j < cantidadColumnas; j++) {
                    switch (j) {
                      case 0:
                        //Alumno
                        var nombreAlumno = void 0;

                        for (var x = 0; x < data.Alumno.length; x++) {
                          if (data["Alumno"][x].idAlumno == data.Amonestacion[i].idAlumnoAmonestacion) {
                            nombreAlumno = data["Alumno"][x].nombreAlumno + " " + data["Alumno"][x].apellidosAlumno;
                            x = data.Alumno.length;
                          }
                        }

                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nombreAlumno);
                        break;

                      case 1:
                        //NIF
                        var nifAlumno = void 0;

                        for (var _x9 = 0; _x9 < data.Alumno.length; _x9++) {
                          if (data["Alumno"][_x9].idAlumno == data.Amonestacion[i].idAlumnoAmonestacion) {
                            nifAlumno = data["Alumno"][_x9].nifAlumno;
                            _x9 = data.Alumno.length;
                          }
                        }

                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nifAlumno);
                        break;

                      case 2:
                        //Grupo
                        var grupo = void 0;

                        for (var _x10 = 0; _x10 < data.Alumno.length; _x10++) {
                          if (data["Alumno"][_x10].idAlumno == data.Amonestacion[i].idAlumnoAmonestacion) {
                            var idGrupo = data["Alumno"][_x10].idGrupo;

                            for (var k = 0; k < data.Grupo.length; k++) {
                              if (data["Grupo"][k].idGrupo == idGrupo) {
                                grupo = data["Grupo"][k].denominacionGrupo;
                                k = data.Grupo.length;
                              }
                            }

                            _x10 = data.Alumno.length;
                          }
                        }

                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), grupo);
                        break;

                      case 3:
                        //fecha
                        var dateString = data.Amonestacion[i].fechaAmonestacion;
                        var fecha = dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');
                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), fecha);
                        break;

                      case 4:
                        //causa
                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), data.Amonestacion[i].denominacionCausaAmonestacion);
                        break;
                    }
                  }
                }

                break;

              case 2:
                nombretabla = "expulsionAlumno";
                cabecera = ["ALUMNO", "NIF", "GRUPO", "FECHA", "EXPULSIÓN"];
                titulo = "";
                cantidadColumnas = cabecera.length;
                cantidadFilas = data["Expulsion"].length;
                createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera);

                if (cantidadFilas == 0) {
                  var _labelTitulo4 = document.createElement("label");

                  _labelTitulo4.setAttribute("class", "mensaje2");

                  var _textolabelTitulo6 = document.createTextNode("No hay expulsiones.");

                  _labelTitulo4.appendChild(_textolabelTitulo6);

                  contenedorFlexDatos.appendChild(_labelTitulo4);
                } //Añadimos las celdas de expulsiones.


                for (var _i7 = 0; _i7 < cantidadFilas; _i7++) {
                  for (var _j4 = 0; _j4 < cantidadColumnas; _j4++) {
                    switch (_j4) {
                      case 0:
                        //Alumno
                        var _nombreAlumno2 = void 0;

                        for (var _x11 = 0; _x11 < data.Alumno.length; _x11++) {
                          if (data["Alumno"][_x11].idAlumno == data.Expulsion[_i7].idAlumnoExpulsion) {
                            _nombreAlumno2 = data["Alumno"][_x11].nombreAlumno + " " + data["Alumno"][_x11].apellidosAlumno;
                            _x11 = data.Alumno.length;
                          }
                        }

                        agregarCelda("".concat(nombretabla, "-").concat(_i7, "-").concat(_j4), _nombreAlumno2);
                        break;

                      case 1:
                        //NIF
                        var _nifAlumno2 = void 0;

                        for (var _x12 = 0; _x12 < data.Alumno.length; _x12++) {
                          if (data["Alumno"][_x12].idAlumno == data.Expulsion[_i7].idAlumnoExpulsion) {
                            _nifAlumno2 = data["Alumno"][_x12].nifAlumno;
                            _x12 = data.Alumno.length;
                          }
                        }

                        agregarCelda("".concat(nombretabla, "-").concat(_i7, "-").concat(_j4), _nifAlumno2);
                        break;

                      case 2:
                        //Grupo
                        var _grupo2 = void 0;

                        for (var _x13 = 0; _x13 < data.Alumno.length; _x13++) {
                          if (data["Alumno"][_x13].idAlumno == data.Expulsion[_i7].idAlumnoExpulsion) {
                            var _idGrupo2 = data["Alumno"][_x13].idGrupo;

                            for (var _k2 = 0; _k2 < data.Grupo.length; _k2++) {
                              if (data["Grupo"][_k2].idGrupo == _idGrupo2) {
                                _grupo2 = data["Grupo"][_k2].denominacionGrupo;
                                _k2 = data.Grupo.length;
                              }
                            }

                            _x13 = data.Alumno.length;
                          }
                        }

                        agregarCelda("".concat(nombretabla, "-").concat(_i7, "-").concat(_j4), _grupo2);
                        break;

                      case 3:
                        //fecha
                        var _dateString4 = data.Expulsion[_i7].fechaExpulsion;

                        var _fecha4 = _dateString4.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1');

                        agregarCelda("".concat(nombretabla, "-").concat(_i7, "-").concat(_j4), _fecha4);
                        break;

                      case 4:
                        //causa
                        agregarCelda("".concat(nombretabla, "-").concat(_i7, "-").concat(_j4), data.Expulsion[_i7].denominacionCausaExpulsion);
                        break;
                    }
                  }
                }

                break;
            }
          }
        })["catch"](function (err) {
          console.error(err);
        });
      }

      break;

    case "amonestacionesGrupo":
      //Listado de amonestaciones por grupo
      if (document.getElementById("codigoListadoBusqueda").value == "") {
        alert("Debes seleccionar.");
      } else {
        var idGrupo = document.getElementById("codigoListadoBusqueda").value;
        var jsonStringidGrupo = JSON.stringify(idGrupo);
        var motivoSelect4 = "amonestacionesExpulsionesSancionesGrupo";
        var jsonStringMotivoSelect4 = JSON.stringify(motivoSelect4);
        fetch("php/listados.php?idGrupo=".concat(jsonStringidGrupo, "&MotivoSelect=").concat(jsonStringMotivoSelect4)).then(function (response) {
          return response.json();
        }).then(function (data) {
          eliminarDatosAccion();
          var acciones = document.getElementById("acciones");
          var contenedorFlexDatos = document.createElement("div");
          contenedorFlexDatos.setAttribute("id", "contenedorFlexDatos");
          acciones.appendChild(contenedorFlexDatos); //Tabla de alumno

          var cabecera = ["GRUPO", "MODALIDAD"];
          var cantidadColumnas = cabecera.length;
          var cantidadFilas = 2;
          var titulo = "TOTAL DE AMONESTACIONES Y EXPULSIONES POR GRUPO";
          var nombretabla = "grupo";
          createTabla(data, titulo, nombretabla, cantidadFilas, cantidadColumnas, cabecera);
          agregarCelda(nombretabla + "-0-0", "".concat(data.GrupoAlumno[0].denominacionGrupo));
          agregarCelda(nombretabla + "-0-1", "".concat(data.GrupoAlumno[0].modalidadGrupo)); //tabla de alumnos

          for (var n = 1; n < 3; n++) {
            switch (n) {
              case 1:
                nombretabla = "amonestacionAlumno";
                cabecera = ["ALUMNO", "NIF", "Nº AMONESTACIONES", "Nº EXPULSIONES"];
                titulo = "";
                cantidadColumnas = cabecera.length;
                cantidadFilas = data.GrupoAlumno.length;
                createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera); //Añadimos las celdas de amonestaciones.

                for (var i = 0; i < cantidadFilas; i++) {
                  for (var j = 0; j < cantidadColumnas; j++) {
                    switch (j) {
                      case 0:
                        //Alumno
                        var nombreAlumno = void 0;
                        nombreAlumno = data.GrupoAlumno[i].nombreAlumno + " " + data.GrupoAlumno[i].apellidosAlumno;
                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nombreAlumno);
                        break;

                      case 1:
                        //NIF
                        var nifAlumno = void 0;
                        nifAlumno = data.GrupoAlumno[i].nifAlumno;
                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nifAlumno);
                        break;

                      case 2:
                        //nº amonestaciones
                        var totalAmonestaciones = void 0;
                        totalAmonestaciones = data.TotalAmonestaciones[i].total;
                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), totalAmonestaciones);
                        break;

                      case 3:
                        //nº expulsiones
                        var totalExpulsiones = void 0;
                        totalExpulsiones = data.TotalExpulsiones[i].total;
                        agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), totalExpulsiones);
                        break;
                    }
                  }
                }

                break;
            }
          }
        })["catch"](function (err) {
          console.error(err);
        });
      }

      break;

    case "totalAmonestacionesProfesor":
      //Listado del total de amonesaciones que ha realizado un profesor
      var motivoSelect5 = "totalAmonestacionesExpulsionesProfesor";
      var jsonStringMotivoSelect5 = JSON.stringify(motivoSelect5);
      fetch("php/listados.php?&MotivoSelect=".concat(jsonStringMotivoSelect5)).then(function (response) {
        return response.json();
      }).then(function (data) {
        eliminarDatosAccion();
        var acciones = document.getElementById("acciones");
        var contenedorFlexDatos = document.createElement("div");
        contenedorFlexDatos.setAttribute("id", "contenedorFlexDatos");
        acciones.appendChild(contenedorFlexDatos); //Tabla de alumno

        var cabecera = ["NOMBRE", "CODIGO", "Nº AMONESTACIONES", "Nº EXPULSIONES"];
        var cantidadColumnas = cabecera.length;
        var cantidadFilas = 1;
        var titulo = "TOTAL DE AMONESTACIONES Y EXPULSIONES POR PROFESOR";
        var nombretabla = "profesor"; //tabla de profesores

        for (var n = 1; n < 3; n++) {
          switch (n) {
            case 1:
              nombretabla = "amonestacionProfesor";
              cantidadFilas = data.Profesor.length;
              createTabla(data, titulo, nombretabla, cantidadFilas + 1, cantidadColumnas, cabecera); //Añadimos las celdas de amonestaciones.

              for (var i = 0; i < cantidadFilas; i++) {
                for (var j = 0; j < cantidadColumnas; j++) {
                  switch (j) {
                    case 0:
                      //profesor
                      var nombreProfesor = void 0;
                      nombreProfesor = data.Profesor[i].nombreProfesor + " " + data.Profesor[i].apellidosProfesor;
                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), nombreProfesor);
                      break;

                    case 1:
                      //codigo
                      var codigoProfesor = void 0;
                      codigoProfesor = data.Profesor[i].codigoProfesor;
                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), codigoProfesor);
                      break;

                    case 2:
                      //nº amonestaciones
                      var totalAmonestaciones = void 0;
                      totalAmonestaciones = data.TotalAmonestaciones[i].total;
                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), totalAmonestaciones);
                      break;

                    case 3:
                      //nº expulsiones
                      var totalExpulsiones = void 0;
                      totalExpulsiones = data.TotalExpulsiones[i].total;
                      agregarCelda("".concat(nombretabla, "-").concat(i, "-").concat(j), totalExpulsiones);
                      break;
                  }
                }
              }

              break;
          }
        }
      })["catch"](function (err) {
        console.error(err);
      });
      break;
  }
} //Función para crear la estrctura de la tabla


function createTabla(data, titulo, nombretabla, cantidadFilas, cantidadColumnas, cabecera) {
  var acciones = document.getElementById("contenedorFlexDatos");

  if (titulo != "") {
    var h3 = document.createElement("h3");
    h3.setAttribute("class", "tituloSeccion");
    h3.setAttribute("id", "tituloSeccion");
    var texto = document.createTextNode("".concat(titulo));
    h3.appendChild(texto);
    acciones.appendChild(h3);
  }

  var divParaCamposFlexTabla = document.createElement("div");
  divParaCamposFlexTabla.setAttribute("class", "contenedorFlex");
  acciones.appendChild(divParaCamposFlexTabla);
  var divTablaExpulsion = document.createElement("div");
  divTablaExpulsion.setAttribute("id", "datosAccion");
  divParaCamposFlexTabla.appendChild(divTablaExpulsion); // Crea un elemento <table> y un elemento <tbody>

  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var tblHead = document.createElement("thead"); // Crea las celdas 

  for (var i = 0; i < cantidadFilas; i++) {
    //(FILAS)
    // Crea las hileras de la tabla 
    var fila = document.createElement("tr");

    for (var j = 0; j < cantidadColumnas; j++) {
      //(COLUMNAS)
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la fila de la tabla
      if (i == 0) {
        var celda = document.createElement("th");
        var textoCelda = document.createTextNode("".concat(cabecera[j]));
        celda.appendChild(textoCelda);
        fila.appendChild(celda);
      } else {
        var _celda = document.createElement("td");

        _celda.setAttribute("id", "".concat(nombretabla, "-").concat(i - 1, "-").concat(j));

        fila.appendChild(_celda);
      }
    } // agrega la fila al final de la tabla (al final del elemento tblbody)


    if (i == 0) {
      tblHead.appendChild(fila);
    } else {
      tblBody.appendChild(fila);
    }
  } // posiciona el <tbody> debajo del elemento <table>


  tabla.appendChild(tblHead);
  tabla.appendChild(tblBody);
  divTablaExpulsion.appendChild(tabla);
} //Funcion para agregar celdas a la tabla


function agregarCelda(posicion, valor) {
  var textoCelda = document.createTextNode(valor);
  document.getElementById(posicion).appendChild(textoCelda);
}