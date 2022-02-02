import { PRODUCTO_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { ProductoCreate } from "./Create/Index";
import { ProductoEdit } from "./Edit/Index";
import { ProductoIndex } from "./Index";

export const ProductoRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(PRODUCTO_PATH.index)} component={ProductoIndex} />
			<Route exact path={getServerPath(PRODUCTO_PATH.create)} component={ProductoCreate} />
			<Route exact path={getServerPath(PRODUCTO_PATH.edit)} component={ProductoEdit} />
			<Route path={getServerPath(PRODUCTO_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
