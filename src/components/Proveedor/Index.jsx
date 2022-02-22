import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as ProveedorService from "services/V1/Proveedor/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { PROVEEDOR_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

export const ProveedorIndex = () => {
	const [proveedores, setProveedores] = React.useState([]);

	React.useEffect(() => {
		ProveedorService.getAll().then(setProveedores);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			ProveedorService.Delete(code),
			{
				pending: 'Eliminando el proveedor...',
				success: 'Proveedor eliminado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar el proveedor.")
				  }}
			}
		).then(x => {if(x === true)setProveedores(last => last.filter(y => y.id !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Proveedor" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						<AddButon className="btn btn-success" to={getServerPath(PROVEEDOR_PATH.create)}>
							<FontAwesomeIcon className="fa-plus" color={Color.WHITE} /> &nbsp; Agregar
						</AddButon>
					</NavigationTitle>
					<TableContainer>
						<div className="row">
							<div className="col-md-12">
								<table className="table table-dark table-striped table-responsive">
									<thead>
										<tr>
											<th>Id</th>
											<th>Nombre</th>
											<th>Email</th>
											<th>Telefono</th>
											<th>Celular</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{proveedores.map((x) => {
											return (
												<tr key={x.id}>
													<td>{x.id}</td>
													<td>{x.nombre}</td>
													<td>{x.email}</td>
													<td>{x.telefono}</td>
													<td>{x.celular}</td>
													<td>
														<CrudListButtons edit_button_path={PROVEEDOR_PATH.fncEdit(x.id)} delete_button_function={() => {handlerDeleteItem(x.id)}}/>
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
