import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as TipoPagoService from "services/V1/TipoPago/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { TIPO_PAGO_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
import { CrudListButtons } from "components/global/CrudListButtons/Index";
import { toast } from "react-toastify";

const TableContainer = styled.div`
	overflow: auto;
	max-width: 100%;
	height: 77vh;
	padding: 20px 15px;
`;

const MasterTableContainer = styled.div`
	width: 100%;
`;

const AddButon = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const TipoPagoIndex = () => {
	const [tiposPago, setTiposPago] = React.useState([]);

	React.useEffect(() => {
		TipoPagoService.getAllAsync().then(setTiposPago);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			TipoPagoService.DeleteAsync(code),
			{
				pending: 'Eliminando el tipo de pago...',
				success: 'Tipo de pago eliminado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar tipo de pago.")
				  }}
			}
		).then(x => {if(x === true)setTiposPago(last => last.filter(y => y.codigo !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Tipo de pago" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						<AddButon className="btn btn-success" to={getServerPath(TIPO_PAGO_PATH.create)}>
							<FontAwesomeIcon className="fa-plus" color={Color.WHITE} /> &nbsp; Agregar
						</AddButon>
					</NavigationTitle>
					<TableContainer>
						<div className="row">
							<div className="col-md-12">
								<table className="table table-dark table-striped table-responsive">
									<thead>
										<tr>
											<th>Codigo</th>
											<th>Nombre</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{tiposPago.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{x.codigo}</td>
													<td>{x.nombre}</td>
													<td>
														<CrudListButtons edit_button_path={TIPO_PAGO_PATH.fncEdit(x.codigo)} delete_button_function={() => {handlerDeleteItem(x.codigo)}}/>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</TableContainer>
				</MasterTableContainer>
			</Section>
		</>
	);
};
