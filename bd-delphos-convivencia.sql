-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.6-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bd_convivencia
DROP DATABASE IF EXISTS `bd_convivencia`;
CREATE DATABASE IF NOT EXISTS `bd_convivencia` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_convivencia`;

-- Volcando estructura para tabla bd_convivencia.amonestacion
DROP TABLE IF EXISTS `amonestacion`;
CREATE TABLE IF NOT EXISTS `amonestacion` (
  `idAmonestacion` int(11) NOT NULL AUTO_INCREMENT,
  `idProfesorAmonestacion` int(11) NOT NULL DEFAULT 0,
  `idAlumnoAmonestacion` int(11) NOT NULL DEFAULT 0,
  `idAsignaturaAmonestacion` int(11) NOT NULL DEFAULT 0,
  `fechaAmonestacion` varchar(50) NOT NULL,
  `idCausaAmonestacion` int(11) NOT NULL DEFAULT 0,
  `ControlFamiliaAmonestacion` enum('Y','N') NOT NULL DEFAULT 'N',
  `idSancionAmonestacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAmonestacion`),
  KEY `FK_amonestacion_causaamonestacion` (`idCausaAmonestacion`),
  CONSTRAINT `FK_amonestacion_causaamonestacion` FOREIGN KEY (`idCausaAmonestacion`) REFERENCES `causaamonestacion` (`idCausaAmonestacion`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_convivencia.amonestacion: ~11 rows (aproximadamente)
DELETE FROM `amonestacion`;
/*!40000 ALTER TABLE `amonestacion` DISABLE KEYS */;
INSERT INTO `amonestacion` (`idAmonestacion`, `idProfesorAmonestacion`, `idAlumnoAmonestacion`, `idAsignaturaAmonestacion`, `fechaAmonestacion`, `idCausaAmonestacion`, `ControlFamiliaAmonestacion`, `idSancionAmonestacion`) VALUES
	(57, 1, 1, 1, '2020-03-06', 2, 'N', 60),
	(58, 1, 4, 1, '2020-03-06', 3, 'N', 65),
	(59, 1, 1, 1, '2020-03-06', 2, 'N', NULL),
	(60, 1, 4, 4, '2020-03-06', 1, 'N', NULL),
	(61, 1, 4, 4, '2020-03-06', 60, 'N', NULL),
	(62, 4, 3, 6, '2020-03-07', 61, 'N', NULL),
	(63, 4, 5, 2, '2020-03-07', 2, 'Y', 86),
	(64, 4, 5, 2, '2020-03-07', 62, 'Y', NULL),
	(65, 4, 15, 6, '2020-03-07', 63, 'Y', 87),
	(66, 4, 5, 2, '2020-03-07', 2, 'Y', NULL),
	(67, 4, 5, 2, '2020-03-07', 60, 'N', NULL);
/*!40000 ALTER TABLE `amonestacion` ENABLE KEYS */;

-- Volcando estructura para tabla bd_convivencia.causaamonestacion
DROP TABLE IF EXISTS `causaamonestacion`;
CREATE TABLE IF NOT EXISTS `causaamonestacion` (
  `idCausaAmonestacion` int(11) NOT NULL AUTO_INCREMENT,
  `denominacionCausaAmonestacion` varchar(50) NOT NULL,
  PRIMARY KEY (`idCausaAmonestacion`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_convivencia.causaamonestacion: ~8 rows (aproximadamente)
DELETE FROM `causaamonestacion`;
/*!40000 ALTER TABLE `causaamonestacion` DISABLE KEYS */;
INSERT INTO `causaamonestacion` (`idCausaAmonestacion`, `denominacionCausaAmonestacion`) VALUES
	(1, 'Amonestación verbal'),
	(2, 'Amonestación escrita'),
	(3, 'Comer chicle en clase'),
	(4, 'Usar el móvil en clase'),
	(60, 'Apagar fusibles de la clase'),
	(61, 'Gritar en clase'),
	(62, 'Hablar en clase'),
	(63, 'No hacer caso al profesor');
/*!40000 ALTER TABLE `causaamonestacion` ENABLE KEYS */;

-- Volcando estructura para tabla bd_convivencia.causaexpulsion
DROP TABLE IF EXISTS `causaexpulsion`;
CREATE TABLE IF NOT EXISTS `causaexpulsion` (
  `idCausaExpulsion` int(11) NOT NULL AUTO_INCREMENT,
  `denominacionCausaExpulsion` varchar(50) NOT NULL,
  PRIMARY KEY (`idCausaExpulsion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_convivencia.causaexpulsion: ~8 rows (aproximadamente)
DELETE FROM `causaexpulsion`;
/*!40000 ALTER TABLE `causaexpulsion` DISABLE KEYS */;
INSERT INTO `causaexpulsion` (`idCausaExpulsion`, `denominacionCausaExpulsion`) VALUES
	(1, 'Agresión física'),
	(2, 'Agresión verbal'),
	(3, 'Portar un arma'),
	(4, 'Poner en peligro a otra persona'),
	(6, 'Apagar fusibles de la clase'),
	(7, 'Romper un ordenador a propósito'),
	(8, 'Hablar en clase'),
	(10, 'Insultar al profesor');
/*!40000 ALTER TABLE `causaexpulsion` ENABLE KEYS */;

-- Volcando estructura para tabla bd_convivencia.directa
DROP TABLE IF EXISTS `directa`;
CREATE TABLE IF NOT EXISTS `directa` (
  `idDirecta` int(11) NOT NULL AUTO_INCREMENT,
  `idProfesorDirecta` int(11) NOT NULL DEFAULT 0,
  `idAlumnoDirecta` int(11) NOT NULL DEFAULT 0,
  `fechaDirecta` varchar(50) NOT NULL DEFAULT '0',
  `CausaDirecta` varchar(200) NOT NULL DEFAULT '0',
  `fechaControlFamiliaDirecta` varchar(50) NOT NULL DEFAULT '0',
  `sancionDirecta` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idDirecta`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_convivencia.directa: ~4 rows (aproximadamente)
DELETE FROM `directa`;
/*!40000 ALTER TABLE `directa` DISABLE KEYS */;
INSERT INTO `directa` (`idDirecta`, `idProfesorDirecta`, `idAlumnoDirecta`, `fechaDirecta`, `CausaDirecta`, `fechaControlFamiliaDirecta`, `sancionDirecta`) VALUES
	(2, 4, 4, '2020-02-25', 'Ha roto una silla', 'N', '1'),
	(3, 4, 4, '2020-03-03', 'Ha roto un cristal', 'N', '2'),
	(4, 4, 1, '2020-03-06', 'Ha partido un árbol', 'N', '63'),
	(13, 4, 15, '2020-03-07', 'No hacer caso al jefe de estudios', 'N', '88');
/*!40000 ALTER TABLE `directa` ENABLE KEYS */;

-- Volcando estructura para tabla bd_convivencia.expulsion
DROP TABLE IF EXISTS `expulsion`;
CREATE TABLE IF NOT EXISTS `expulsion` (
  `idExpulsion` int(11) NOT NULL AUTO_INCREMENT,
  `idAlumnoExpulsion` int(11) NOT NULL DEFAULT 0,
  `idProfesorExpulsion` int(11) NOT NULL DEFAULT 0,
  `idAsignaturaExpulsion` int(11) NOT NULL DEFAULT 0,
  `fechaExpulsion` varchar(50) NOT NULL,
  `idCausaExpulsion` int(11) NOT NULL DEFAULT 0,
  `ControlJefeEstudiosExpulsion` enum('Y','N') NOT NULL DEFAULT 'N',
  `ControlFamiliaExpulsion` enum('Y','N') NOT NULL DEFAULT 'N',
  `idSancionExpulsion` int(11) DEFAULT 0,
  PRIMARY KEY (`idExpulsion`),
  KEY `FK_expulsion_causaexpulsion` (`idCausaExpulsion`),
  CONSTRAINT `FK_expulsion_causaexpulsion` FOREIGN KEY (`idCausaExpulsion`) REFERENCES `causaexpulsion` (`idCausaExpulsion`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_convivencia.expulsion: ~8 rows (aproximadamente)
DELETE FROM `expulsion`;
/*!40000 ALTER TABLE `expulsion` DISABLE KEYS */;
INSERT INTO `expulsion` (`idExpulsion`, `idAlumnoExpulsion`, `idProfesorExpulsion`, `idAsignaturaExpulsion`, `fechaExpulsion`, `idCausaExpulsion`, `ControlJefeEstudiosExpulsion`, `ControlFamiliaExpulsion`, `idSancionExpulsion`) VALUES
	(13, 1, 1, 1, '2020-03-06', 1, 'N', 'N', 61),
	(15, 4, 1, 1, '2020-03-06', 1, 'N', 'N', NULL),
	(16, 1, 1, 1, '2020-03-06', 1, 'N', 'N', NULL),
	(19, 3, 4, 6, '2020-03-07', 1, 'N', 'N', NULL),
	(20, 5, 4, 2, '2020-03-07', 1, 'Y', 'Y', 86),
	(21, 15, 4, 6, '2020-03-07', 10, 'Y', 'Y', 86),
	(22, 5, 4, 2, '2020-03-07', 1, 'Y', 'N', NULL),
	(23, 5, 4, 2, '2020-03-07', 6, 'N', 'N', NULL);
/*!40000 ALTER TABLE `expulsion` ENABLE KEYS */;

-- Volcando estructura para tabla bd_convivencia.sancion
DROP TABLE IF EXISTS `sancion`;
CREATE TABLE IF NOT EXISTS `sancion` (
  `idSancion` int(11) NOT NULL AUTO_INCREMENT,
  `fechaSancion` varchar(50) NOT NULL DEFAULT '0',
  `denominacionSancion` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idSancion`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_convivencia.sancion: ~12 rows (aproximadamente)
DELETE FROM `sancion`;
/*!40000 ALTER TABLE `sancion` DISABLE KEYS */;
INSERT INTO `sancion` (`idSancion`, `fechaSancion`, `denominacionSancion`) VALUES
	(1, '2020-02-20', 'Expulsión del Instituto 3 días.'),
	(2, '2020-02-21', 'Expulsión del Instituto 5 días.'),
	(3, '2020-02-22', 'Expulsión permanente.'),
	(4, '2020-02-23', 'Limpiar el patio.'),
	(60, '2020-03-06', '3 días a casa'),
	(61, '2020-03-06', 'Expulsión del Instituto 1 día.'),
	(63, '2020-03-06', 'Sala de estudios'),
	(65, '2020-03-06', '1 dia de baja'),
	(66, '2020-03-07', '1 día de expulsión'),
	(86, '2020-03-07', 'Ordenar los libros de la biblioteca'),
	(87, '2020-03-07', 'Ir a una charla de convivencia'),
	(88, '2020-03-07', '2 días de expulsión');
/*!40000 ALTER TABLE `sancion` ENABLE KEYS */;


-- Volcando estructura de base de datos para bd_delfos
DROP DATABASE IF EXISTS `bd_delfos`;
CREATE DATABASE IF NOT EXISTS `bd_delfos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_delfos`;

-- Volcando estructura para tabla bd_delfos.alumno
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `idAlumno` int(11) NOT NULL AUTO_INCREMENT,
  `nifAlumno` varchar(9) NOT NULL,
  `codigoAlumno` varchar(11) NOT NULL,
  `nombreAlumno` varchar(50) NOT NULL,
  `apellidosAlumno` varchar(50) NOT NULL,
  `direccionAlumno` varchar(50) NOT NULL,
  `telefonoAlumno` varchar(50) NOT NULL,
  `emailAlumno` varchar(50) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idAlumno`),
  UNIQUE KEY `nif` (`nifAlumno`),
  UNIQUE KEY `codigoAlumno` (`codigoAlumno`),
  KEY `FK_alumno_grupo` (`idGrupo`),
  CONSTRAINT `FK_alumno_grupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.alumno: ~12 rows (aproximadamente)
DELETE FROM `alumno`;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` (`idAlumno`, `nifAlumno`, `codigoAlumno`, `nombreAlumno`, `apellidosAlumno`, `direccionAlumno`, `telefonoAlumno`, `emailAlumno`, `idGrupo`) VALUES
	(1, '66424145F', '11111', 'Gabriel', 'Martínez Torres', 'calle A', '600123456', 'gabriel@gmail.com', 1),
	(2, '25999084E', '11112', 'Ana', 'López Pérez', 'calle B', '600123455', 'ana@gmail.com', 5),
	(3, '27618528J', '11113', 'Carlos', 'Múñoz García', 'calle C', '600123444', 'carlos@gmail.com', 4),
	(4, '41169722K', '11114', 'Rául', 'Zamora Motos', 'calle D', '600123333', 'raul@gmail.com', 1),
	(5, '63063260C', '11115', 'Beatriz', 'Sánchez Molina', 'calle E', '600122222', 'bea@gmail.com', 3),
	(11, '61201958Q', '11116', 'María', 'Rodríguez Rico', 'calle F', '600111111', 'maria@gmail.com', 2),
	(12, '83312288D', '11117', 'Tiberiu', 'Lucian Daifanescu', 'calle G', '600122222', 'tuberiu@gmail.com', 1),
	(14, '78730560L', '11118', 'Moises', 'Martínez López', 'calle H', '660578941', 'moises@gmail.com', 2),
	(15, '46355708J', '11119', 'Raquel', 'Sanz González', 'calle I', '657412036', 'raquel@gmail.com', 4),
	(16, '14202972N', '11120', 'Álvaro', 'Belmonte García', 'calle J', '657898560', 'alvaro@gmail.com', 4),
	(17, '91556701A', '11121', 'Anabel', 'Romero Valverde', 'calle K', '654123974', 'anabel@gmail.com', 5),
	(20, '67952064J', '11122', 'Pedro', 'Moreno Barba', 'calle L', '657874123', 'pedro@gmail.com', 6);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;

-- Volcando estructura para tabla bd_delfos.alumnofamilia
DROP TABLE IF EXISTS `alumnofamilia`;
CREATE TABLE IF NOT EXISTS `alumnofamilia` (
  `idAlumnoFamilia` int(11) NOT NULL AUTO_INCREMENT,
  `idAlumno` int(11) NOT NULL,
  `idFamilia` int(11) NOT NULL,
  PRIMARY KEY (`idAlumnoFamilia`),
  KEY `FK_alumnofamilia_alumno` (`idAlumno`),
  KEY `FK_alumnofamilia_familia` (`idFamilia`),
  CONSTRAINT `FK_alumnofamilia_alumno` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`),
  CONSTRAINT `FK_alumnofamilia_familia` FOREIGN KEY (`idFamilia`) REFERENCES `familia` (`idFamilia`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.alumnofamilia: ~12 rows (aproximadamente)
DELETE FROM `alumnofamilia`;
/*!40000 ALTER TABLE `alumnofamilia` DISABLE KEYS */;
INSERT INTO `alumnofamilia` (`idAlumnoFamilia`, `idAlumno`, `idFamilia`) VALUES
	(2, 5, 3),
	(3, 2, 2),
	(4, 1, 1),
	(5, 4, 4),
	(6, 11, 5),
	(7, 12, 6),
	(8, 14, 7),
	(9, 15, 7),
	(10, 16, 5),
	(11, 17, 3),
	(12, 3, 4),
	(13, 20, 6);
/*!40000 ALTER TABLE `alumnofamilia` ENABLE KEYS */;

-- Volcando estructura para tabla bd_delfos.asignatura
DROP TABLE IF EXISTS `asignatura`;
CREATE TABLE IF NOT EXISTS `asignatura` (
  `idAsignatura` int(11) NOT NULL AUTO_INCREMENT,
  `denominacionAsignatura` varchar(100) NOT NULL,
  PRIMARY KEY (`idAsignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.asignatura: ~12 rows (aproximadamente)
DELETE FROM `asignatura`;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` (`idAsignatura`, `denominacionAsignatura`) VALUES
	(1, 'Desarrollo web entorno cliente'),
	(2, 'Desarrollo web entorno servidor'),
	(3, 'Diseño de interfaces WEB'),
	(4, 'Empresa e iniciativa emprendora'),
	(5, 'Despliegue de aplicaciones web'),
	(6, 'Sistemas Informáticos'),
	(7, 'Montaje y mantenimiento de equipos'),
	(8, 'Redes locales'),
	(9, 'Aplicaciones ofimáticas'),
	(10, 'Seguridad informática'),
	(11, 'Aplicaciones web'),
	(12, 'Matemáticas');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;

-- Volcando estructura para tabla bd_delfos.familia
DROP TABLE IF EXISTS `familia`;
CREATE TABLE IF NOT EXISTS `familia` (
  `idFamilia` int(11) NOT NULL AUTO_INCREMENT,
  `nombrePadreFamilia` varchar(50) NOT NULL,
  `apellidosPadreFamilia` varchar(50) NOT NULL,
  `correoFamilia` varchar(50) NOT NULL,
  PRIMARY KEY (`idFamilia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.familia: ~7 rows (aproximadamente)
DELETE FROM `familia`;
/*!40000 ALTER TABLE `familia` DISABLE KEYS */;
INSERT INTO `familia` (`idFamilia`, `nombrePadreFamilia`, `apellidosPadreFamilia`, `correoFamilia`) VALUES
	(1, 'Juana', 'Torres Pérez', 'gabi86ab@gmail.com'),
	(2, 'Maria', 'Motos', 'gabi86ab@gmail.com'),
	(3, 'Alberto', 'Rodríguez', 'gabi86ab@gmail.com'),
	(4, 'Manolo', 'Gonzalez', 'gabi86ab@gmail.com'),
	(5, 'Luisa', 'García', 'gabi86ab@gmail.com'),
	(6, 'Juan', 'Pérez', 'gabi86ab@gmail.com'),
	(7, 'Isabel', 'Muñoz', 'gabi86ab@gmail.com');
/*!40000 ALTER TABLE `familia` ENABLE KEYS */;

-- Volcando estructura para tabla bd_delfos.grupo
DROP TABLE IF EXISTS `grupo`;
CREATE TABLE IF NOT EXISTS `grupo` (
  `idGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `denominacionGrupo` varchar(50) NOT NULL,
  `modalidadGrupo` varchar(50) NOT NULL,
  PRIMARY KEY (`idGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.grupo: ~6 rows (aproximadamente)
DELETE FROM `grupo`;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` (`idGrupo`, `denominacionGrupo`, `modalidadGrupo`) VALUES
	(1, '2º DAW', 'FP2'),
	(2, '1º DAW', 'FP2'),
	(3, '1º SMR', 'FP1'),
	(4, '2º SMR', 'FP1'),
	(5, '2º BACHILLERATO', 'BACH'),
	(6, '1º BACHILLERATO', 'BACH');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;

-- Volcando estructura para tabla bd_delfos.profesor
DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `idProfesor` int(11) NOT NULL AUTO_INCREMENT,
  `codigoProfesor` int(11) NOT NULL,
  `nombreProfesor` varchar(50) NOT NULL,
  `apellidosProfesor` varchar(100) NOT NULL,
  `perfilProfesor` enum('Profesor','Guardia','JefeEstudios') NOT NULL DEFAULT 'Profesor',
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`idProfesor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.profesor: ~7 rows (aproximadamente)
DELETE FROM `profesor`;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` (`idProfesor`, `codigoProfesor`, `nombreProfesor`, `apellidosProfesor`, `perfilProfesor`, `password`) VALUES
	(1, 1, 'Rosa', 'Ropero', 'Profesor', 'rosa'),
	(2, 2, 'Inma', 'Moreno', 'Profesor', 'inma'),
	(3, 3, 'Inma', 'Galdón', 'Profesor', 'inma'),
	(4, 4, 'Juan', 'Diz', 'JefeEstudios', 'juan'),
	(5, 5, 'Alberto', 'Cifuentes', 'Profesor', 'alberto'),
	(6, 6, 'Daniel', 'García', 'Profesor', 'daniel'),
	(7, 7, 'Carlos', 'Motos', 'Profesor', 'carlos');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;

-- Volcando estructura para tabla bd_delfos.profgrupasig
DROP TABLE IF EXISTS `profgrupasig`;
CREATE TABLE IF NOT EXISTS `profgrupasig` (
  `idprofGrupAsig` int(11) NOT NULL AUTO_INCREMENT,
  `idGrupo` int(11) NOT NULL DEFAULT 0,
  `idProfesor` int(11) NOT NULL DEFAULT 0,
  `idAsignatura` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idprofGrupAsig`),
  UNIQUE KEY `idGrupo_idProfesor_idAsignatura` (`idGrupo`,`idProfesor`,`idAsignatura`),
  KEY `FK_profgrupasig_profesor` (`idProfesor`),
  KEY `FK_profgrupasig_asignatura` (`idAsignatura`),
  CONSTRAINT `FK_profgrupasig_asignatura` FOREIGN KEY (`idAsignatura`) REFERENCES `asignatura` (`idAsignatura`),
  CONSTRAINT `FK_profgrupasig_grupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`),
  CONSTRAINT `FK_profgrupasig_profesor` FOREIGN KEY (`idProfesor`) REFERENCES `profesor` (`idProfesor`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_delfos.profgrupasig: ~11 rows (aproximadamente)
DELETE FROM `profgrupasig`;
/*!40000 ALTER TABLE `profgrupasig` DISABLE KEYS */;
INSERT INTO `profgrupasig` (`idprofGrupAsig`, `idGrupo`, `idProfesor`, `idAsignatura`) VALUES
	(1, 1, 1, 1),
	(7, 1, 1, 4),
	(4, 1, 2, 5),
	(5, 1, 3, 3),
	(6, 2, 1, 6),
	(13, 2, 3, 3),
	(12, 2, 3, 8),
	(16, 3, 4, 2),
	(10, 4, 4, 6),
	(14, 4, 5, 7),
	(15, 5, 7, 12);
/*!40000 ALTER TABLE `profgrupasig` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
