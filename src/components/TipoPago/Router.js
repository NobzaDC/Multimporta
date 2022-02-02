import { TIPO_PAGO_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { TipoPagoCreate } from "./Create/Index";
import { TipoPagoEdit } from "./Edit/Index";
import { TipoPagoIndex } from "./Index";

export const TipoPagoRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(TIPO_PAGO_PATH.index)} component={TipoPagoIndex} />
			<Route exact path={getServerPath(TIPO_PAGO_PATH.create)} component={TipoPagoCreate} />
			<Route exact path={getServerPath(TIPO_PAGO_PATH.edit)} component={TipoPagoEdit} />
			<Route path={getServerPath(TIPO_PAGO_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};
