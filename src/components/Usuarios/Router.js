import { USUARIO_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { UsuarioCreate } from "./Create/Index";
import { UsuarioEdit } from "./Edit/Index";
import { UsuarioIndex } from "./Index";

export const UsuarioRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(USUARIO_PATH.index)} component={UsuarioIndex} />
			<Route exact path={getServerPath(USUARIO_PATH.create)} component={UsuarioCreate} />
			<Route exact path={getServerPath(USUARIO_PATH.edit)} component={UsuarioEdit} />
			<Route path={getServerPath(USUARIO_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
