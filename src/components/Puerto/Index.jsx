import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as PuertosService from "services/V1/Puerto/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { PUERTO_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

export const PuertosIndex = () => {
	const [puertos, setPuertos] = React.useState([]);

	React.useEffect(() => {
		PuertosService.getAll().then(setPuertos);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			PuertosService.Delete(code),
			{
				pending: 'Eliminando el puerto...',
				success: 'Puerto eliminado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar el puerto.")
				  }}
			}
		).then(x => {if(x === true)setPuertos(last => last.filter(y => y.codigo !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Puertos" path={getServerPath(HomePage.index)}>
						<AddButon className="btn btn-success" to={getServerPath(PUERTO_PATH.create)}>
							<FontAwesomeIcon className="fa-plus" color={Color.WHITE} /> &nbsp; Agregar
						</AddButon>
					</NavigationTitle>
					<TableContainer>
						<div className="row">
							<div className="col-md-12">
								<table className="table table-dark table-striped table-responsive">
									<thead>
										<tr>
											<th>C??digo</th>
											<th>Nombre</th>
											<th>Ubicaci??n</th>
											<th>Tiempo de tr??nsito</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{puertos.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{x.codigo}</td>
													<td>{x.nombre}</td>
													<td>{`${x.codigoCiudadNavigation?.nombre} - ${x.codigoPaisNavigation?.nombre}`}</td>
													<td>{`${x.tiempoTransitoDias} dias`}</td>
													<td>
														<CrudListButtons edit_button_path={PUERTO_PATH.fncEdit(x.codigo)} delete_button_function={() => {handlerDeleteItem(x.codigo)}}/>
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
