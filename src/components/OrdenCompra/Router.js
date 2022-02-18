import { ORDEN_COMPRA_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { OrdenCompraIndex } from "./Index";

export const OrdenCompraRouter = () => {
	return ( 
		<Switch>
			<Route exact path={getServerPath(ORDEN_COMPRA_PATH.index)} component={OrdenCompraIndex} />
			<Route path={getServerPath(ORDEN_COMPRA_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
