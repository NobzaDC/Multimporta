import { DEVELOPER_MODE } from "helpers/getServerPath/GetServerPath";

export const ACTIVE = "is_active";
export const USER_LOCAL_STORAGE_STRING = "SESSION_USER"

//PATHS
export const CIUDADES_PATH = {
	index: "/Ciudad",
	create: "/Ciudad/Nuevo",
	edit: "/Ciudad/Editar/:id",
	fncEdit: (x) => `/Ciudad/Editar/${x}`,
	any: "/Ciudad/*",
};
export const LOGIN_PATH = {
	index: "/",
};

export const CONDICION_PAGO_PATH = {
	index: "/CondicionPago",
	create: "/CondicionPago/Nuevo",
	edit: "/CondicionPago/Editar/:id",
	fncEdit: (x) => `/CondicionPago/Editar/${x}`,
	any: "/CondicionPago/*",
};
export const PRESENTACION_PRODUCTO_PATH = {
	index: "/PresentacionProducto",
	create: "/PresentacionProducto/Nuevo",
	edit: "/PresentacionProducto/Editar/:id",
	fncEdit: (x) => `/PresentacionProducto/Editar/${x}`,
	any: "/PresentacionProducto/*",
};
export const PUERTO_PATH = {
	index: "/Puerto",
	create: "/Puerto/Nuevo",
	edit: "/Puerto/Editar/:id",
	fncEdit: (x) => `/Puerto/Editar/${x}`,
	any: "/Puerto/*",
};
export const TIPO_PAGO_PATH = {
	index: "/TipoPago",
	create: "/TipoPago/Nuevo",
	edit: "/TipoPago/Editar/:id",
	fncEdit: (x) => `/TipoPago/Editar/${x}`,
	any: "/TipoPago/*",
};
export const TERMINO_NEGOCIACION_PATH = {
	index: "/TerminoNegociacion",
	create: "/TerminoNegociacion/Nuevo",
	edit: "/TerminoNegociacion/Editar/:id",
	fncEdit: (x) => `/TerminoNegociacion/Editar/${x}`,
	any: "/TerminoNegociacion/*",
};
export const PRODUCTO_PATH = {
	index: "/Producto",
	create: "/Producto/Nuevo",
	edit: "/Producto/Editar/:id",
	fncEdit: (x) => `/Producto/Editar/${x}`,
	any: "/Producto/*",
};
export const PROVEEDOR_PATH = {
	index: "/Proveedor",
	create: "/Proveedor/Nuevo",
	edit: "/Proveedor/Editar/:id",
	fncEdit: (x) => `/Proveedor/Editar/${x}`,
	any: "/Proveedor/*",
};
export const USUARIO_PATH = {
	index: "/Usuario",
	create: "/Usuario/Nuevo",
	edit: "/Usuario/Editar/:id",
	fncEdit: (x) => `/Usuario/Editar/${x}`,
	any: "/Usuario/*",
};
export const ORDEN_COMPRA_PATH = {
	index: "/OrdenCompra",
	create: "/OrdenCompra/Nuevo",
	fncUpdate: (x) => `/OrdenCompra/Nuevo?origin=${x}`,
	any: "/OrdenCompra/*",
};
export const ErrorPage = { not_found: "/404" };
export const HomePage = { index: "/Inicio" };

//Config
export const BASE_URL = DEVELOPER_MODE ? "https://localhost:44313" : "http://[PUBLIC_IP]/[SUB_DOMAIN]";

export const ERROR_CASES = {
	"Conflict when try to insert primary key": "El código esta actualmente en uso.",
	"An error occurred while updating the entries. See the inner exception for details.": "Error inesperado.",
	"Archivo o nombre vacío.": "Error al detectar la imagen.",
	"Incorrect user or password": "Usuario y/o contraseña invalida(s).",
};

//Form errors
export const REQUIRED_ERROR = "Este campo es requerido.";

//Dropdowns
export const TIPO_IDENTIFICACION = [
	{id: 'CC', nombre: 'Cédula de ciudadanía'},
	{id: 'TI', nombre: 'Tarjeta de identidad'},
	{id: 'CE', nombre: 'Cédula de extranjería'},
	{id: 'NP', nombre: 'Número de pasaporte'},
	{id: 'PE', nombre: 'Permiso especial'},
	{id: 'RC', nombre: 'Registro civil'},
]

export const CANTIDAD_CONTENEDORES = [
	{id: 'A', nombre: '40'},
	{id: 'B', nombre: '20'}
]

export const NIVEL_ACCESO = [
	{id: 'SA', nombre: 'Super administrador'},
	{id: 'OP', nombre: 'Operador'}
]
