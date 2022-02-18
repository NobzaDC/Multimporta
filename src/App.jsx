import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { SideBar } from "components/sideBar/Index";
import styled from "styled-components";
import {
	CIUDADES_PATH,
	CONDICION_PAGO_PATH,
	PRESENTACION_PRODUCTO_PATH,
	PUERTO_PATH,
	TIPO_PAGO_PATH,
	TERMINO_NEGOCIACION_PATH,
	PRODUCTO_PATH,
	PROVEEDOR_PATH,
	ORDEN_COMPRA_PATH,
	LOGIN_PATH,
	HomePage,
	USUARIO_PATH,
} from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { CiudadesRouter } from "components/Ciudades/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { CondicionPagoRouter } from "components/CondicionPago/Router";
import { PresentacionProductoRouter } from "components/PresentacionProducto/Router";
import { PuertoRouter } from "components/Puerto/Router";
import { TipoPagoRouter } from "components/TipoPago/Router";
import { TerminoNegociacionRouter } from "components/TerminoNegociacion/Router";
import { ProductoRouter } from "components/Producto/Router";
import { ProveedorRouter } from "components/Proveedor/Router";
import { OrdenCompraRouter } from "components/OrdenCompra/Router";
import { LoginIndex } from "components/Login/Index";
import { HomeIndex } from "components/Home/Index";
import { UsuarioRouter } from "components/Usuarios/Router";

const Content = styled.div`
	width: 100%;
	min-height: 100vh;
	max-height: 100vh;
	display: flex;
	flex-direction: row;
`;

const Toaster = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover
		/>
	);
};

function App() {
	return (
		<div className="App">
			<Router>
				<Content>
					<Switch>
						<Route exact path={getServerPath(LOGIN_PATH.index)} component={LoginIndex} />
						<Content>
							<SideBar />
							<Route path={getServerPath(HomePage.index)} component={HomeIndex} />
							<Route path={getServerPath(CIUDADES_PATH.index)} component={() => <CiudadesRouter />} />
							<Route
								path={getServerPath(CONDICION_PAGO_PATH.index)}
								component={() => <CondicionPagoRouter />}
							/>
							<Route
								path={getServerPath(PRESENTACION_PRODUCTO_PATH.index)}
								component={() => <PresentacionProductoRouter />}
							/>
							<Route path={getServerPath(PUERTO_PATH.index)} component={() => <PuertoRouter />} />
							<Route path={getServerPath(TIPO_PAGO_PATH.index)} component={() => <TipoPagoRouter />} />
							<Route
								path={getServerPath(TERMINO_NEGOCIACION_PATH.index)}
								component={() => <TerminoNegociacionRouter />}
							/>
							<Route path={getServerPath(PRODUCTO_PATH.index)} component={() => <ProductoRouter />} />
							<Route path={getServerPath(PROVEEDOR_PATH.index)} component={() => <ProveedorRouter />} />
							<Route path={getServerPath(USUARIO_PATH.index)} component={() => <UsuarioRouter />} />
							<Route
								path={getServerPath(ORDEN_COMPRA_PATH.index)}
								component={() => <OrdenCompraRouter />}
							/>
						</Content>
					</Switch>
				</Content>
			</Router>
			<Toaster />
		</div>
	);
}

export default App;
