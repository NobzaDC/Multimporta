import { CONDICION_PAGO_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { CondicionPagoCreate } from "./Create/Index";
import { CondicionPagoEdit } from "./Edit/Index";
import { CondicionPagoIndex } from "./Index";

export const CondicionPagoRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(CONDICION_PAGO_PATH.index)} component={CondicionPagoIndex} />
			<Route exact path={getServerPath(CONDICION_PAGO_PATH.create)} component={CondicionPagoCreate} />
			<Route exact path={getServerPath(CONDICION_PAGO_PATH.edit)} component={CondicionPagoEdit} />
			<Route path={getServerPath(CONDICION_PAGO_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
