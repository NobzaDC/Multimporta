import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as CondicionPagoService from "services/V1/CondicionPago/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { CONDICION_PAGO_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

export const CondicionPagoIndex = () => {
	const [condicionesPago, setCondicionesPago] = React.useState([]);

	React.useEffect(() => {
		CondicionPagoService.getAll().then(setCondicionesPago);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			CondicionPagoService.Delete(code),
			{
				pending: 'Eliminando la condición de pago...',
				success: 'Condición de pago eliminada con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar la condición de pago.")
				  }}
			}
		).then(x => {if(x === true)setCondicionesPago(last => last.filter(y => y.codigo !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Condición de pago" path={getServerPath(HomePage.index)}>
						<AddButon className="btn btn-success" to={getServerPath(CONDICION_PAGO_PATH.create)}>
							<FontAwesomeIcon className="fa-plus" color={Color.WHITE} /> &nbsp; Agregar
						</AddButon>
					</NavigationTitle>
					<TableContainer>
						<div className="row">
							<div className="col-md-12">
								<table className="table table-dark table-striped table-responsive">
									<thead>
										<tr>
											<th>Código</th>
											<th>Nombre</th>
											<th>Cantidad de días</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{condicionesPago.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{x.codigo}</td>
													<td>{x.nombre}</td>
													<td>{`${x.cantidadDias} días`}</td>
													<td>
														<CrudListButtons edit_button_path={CONDICION_PAGO_PATH.fncEdit(x.codigo)} delete_button_function={() => {handlerDeleteItem(x.codigo)}}/>
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
