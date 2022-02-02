import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { SideBar } from "components/sideBar/Index";
import styled from "styled-components";
import { CIUDADES_PATH, CONDICION_PAGO_PATH, PRESENTACION_PRODUCTO_PATH, PUERTO_PATH, TIPO_PAGO_PATH, TERMINO_NEGOCIACION_PATH, PRODUCTO_PATH } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { CiudadesRouter } from "components/Ciudades/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { CondicionPagoRouter } from "components/CondicionPago/Router";
import { PresentacionProductoRouter } from "components/PresentacionProducto/Router";
import { PuertoRouter } from "components/Puerto/Router";
import { TipoPagoRouter } from "components/TipoPago/Router";
import { TerminoNegociacionRouter } from "components/TerminoNegociacion/Router";
import { ProductoRouter } from "components/Producto/Router";

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
					<SideBar />
					<Switch>
						<Route path={getServerPath(CIUDADES_PATH.index)} component={() => <CiudadesRouter />} />
						<Route path={getServerPath(CONDICION_PAGO_PATH.index)} component={() => <CondicionPagoRouter />} />
						<Route path={getServerPath(PRESENTACION_PRODUCTO_PATH.index)} component={() => <PresentacionProductoRouter />} />
						<Route path={getServerPath(PUERTO_PATH.index)} component={() => <PuertoRouter />} />
						<Route path={getServerPath(TIPO_PAGO_PATH.index)} component={() => <TipoPagoRouter />} />
						<Route path={getServerPath(TERMINO_NEGOCIACION_PATH.index)} component={() => <TerminoNegociacionRouter />} />
						<Route path={getServerPath(PRODUCTO_PATH.index)} component={() => <ProductoRouter />} />
					</Switch>
				</Content>
			</Router>
			<Toaster />
		</div>
	);
}

export default App;
