import { PRESENTACION_PRODUCTO_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { PresentacionProductoCreate } from "./Create/Index";
import { PresentacionProductoEdit } from "./Edit/Index";
import { PresentacionProductoIndex } from "./Index";

export const PresentacionProductoRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(PRESENTACION_PRODUCTO_PATH.index)} component={PresentacionProductoIndex} />
			<Route exact path={getServerPath(PRESENTACION_PRODUCTO_PATH.create)} component={PresentacionProductoCreate} />
			<Route exact path={getServerPath(PRESENTACION_PRODUCTO_PATH.edit)} component={PresentacionProductoEdit} />
			<Route path={getServerPath(PRESENTACION_PRODUCTO_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
