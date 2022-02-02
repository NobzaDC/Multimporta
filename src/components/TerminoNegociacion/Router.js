import { TERMINO_NEGOCIACION_PATH, ErrorPage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Redirect, Route, Switch } from "react-router-dom";
import { TerminoNegociacionCreate } from "./Create/Index";
import { TerminoNegociacionEdit } from "./Edit/Index";
import { TerminoNegociacionIndex } from "./Index";

export const TerminoNegociacionRouter = () => {
	return (
		<Switch>
			<Route exact path={getServerPath(TERMINO_NEGOCIACION_PATH.index)} component={TerminoNegociacionIndex} />
			<Route exact path={getServerPath(TERMINO_NEGOCIACION_PATH.create)} component={TerminoNegociacionCreate} />
			<Route exact path={getServerPath(TERMINO_NEGOCIACION_PATH.edit)} component={TerminoNegociacionEdit} />
			<Route path={getServerPath(TERMINO_NEGOCIACION_PATH.any)}>
                <Redirect to={getServerPath(ErrorPage.not_found)}/>
            </Route>
		</Switch>
	);
};