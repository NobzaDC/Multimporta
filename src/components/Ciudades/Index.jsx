import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as CiudadesService from "services/V1/Ciudades/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { CIUDADES_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

export const CiudadesIndex = () => {
	const [ciudades, setCiudades] = React.useState([]);

	React.useEffect(() => {
		CiudadesService.getAll().then(setCiudades);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			CiudadesService.Delete(code),
			{
				pending: 'Eliminando la ciudad...',
				success: 'Ciudad eliminada con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar la ciudad.")
				  }}
			}
		).then(x => {if(x === true)setCiudades(last => last.filter(y => y.codigo !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Ciudades" path={getServerPath(HomePage.index)}>
						<AddButon className="btn btn-success" to={getServerPath(CIUDADES_PATH.create)}>
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
											<th>Departamento</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{ciudades.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{x.codigo}</td>
													<td>{x.nombre}</td>
													<td>{x.departamento}</td>
													<td>
														<CrudListButtons edit_button_path={CIUDADES_PATH.fncEdit(x.codigo)} delete_button_function={() => {handlerDeleteItem(x.codigo)}}/>
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
