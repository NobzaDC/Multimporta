import { DEVELOPER_MODE } from "helpers/getServerPath/GetServerPath";

export const ACTIVE = "is_active";

//PATHS
export const CIUDADES_PATH = {
	index: "/Ciudad",
	create: "/Ciudad/Nuevo",
	edit: "/Ciudad/Editar/:id",
	fncEdit: (x) => `/Ciudad/Editar/${x}`,
	any: "/Ciudad/*",
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
export const PROVEEDOR_PATH = "/Proveedor";
export const ErrorPage = { not_found: "/404" };
export const HomePage = { index: "/" };

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
