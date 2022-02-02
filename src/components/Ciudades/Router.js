import { CIUDADES_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { CiudadesCreate } from "./Create/Index";
import { CiudadesEdit } from "./Edit/Index";
import { CiudadesIndex } from "./Index";

export const CiudadesRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(CIUDADES_PATH.index)} component={CiudadesIndex} />
			<Route exact path={getServerPath(CIUDADES_PATH.create)} component={CiudadesCreate} />
			<Route exact path={getServerPath(CIUDADES_PATH.edit)} component={CiudadesEdit} />
			<Route path={getServerPath(CIUDADES_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
