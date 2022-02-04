import { PROVEEDOR_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { ProveedorCreate } from "./Create/Index";
import { ProveedorEdit } from "./Edit/Index";
import { ProveedorIndex } from "./Index";

export const ProveedorRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(PROVEEDOR_PATH.index)} component={ProveedorIndex} />
			<Route exact path={getServerPath(PROVEEDOR_PATH.create)} component={ProveedorCreate} />
			<Route exact path={getServerPath(PROVEEDOR_PATH.edit)} component={ProveedorEdit} />
			<Route path={getServerPath(PROVEEDOR_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
