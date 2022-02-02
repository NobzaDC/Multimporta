import { PUERTO_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { PuertosCreate } from "./Create/Index";
import { PuertosEdit } from "./Edit/Index";
import { PuertosIndex } from "./Index";

export const PuertoRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(PUERTO_PATH.index)} component={PuertosIndex} />
			<Route exact path={getServerPath(PUERTO_PATH.create)} component={PuertosCreate} />
			<Route exact path={getServerPath(PUERTO_PATH.edit)} component={PuertosEdit} />
			<Route path={getServerPath(PUERTO_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
