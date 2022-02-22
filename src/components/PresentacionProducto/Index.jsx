import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as PresentacionProductoService from "services/V1/PresentacionProducto/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { PRESENTACION_PRODUCTO_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

export const PresentacionProductoIndex = () => {
	const [presentacionProducto, setPresentacionProducto] = React.useState([]);

	React.useEffect(() => {
		PresentacionProductoService.getAll().then(setPresentacionProducto);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			PresentacionProductoService.Delete(code),
			{
				pending: 'Eliminando la presentación de producto...',
				success: 'Presentación de producto eliminada con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar la presentacion de producto.")
				  }}
			}
		).then(x => {if(x === true)setPresentacionProducto(last => last.filter(y => y.id !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Presentación de producto" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						<AddButon className="btn btn-success" to={getServerPath(PRESENTACION_PRODUCTO_PATH.create)}>
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
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{presentacionProducto.map((x) => {
											return (
												<tr key={x.id}>
													<td>{x.id}</td>
													<td>{x.nombre}</td>
													<td>
														<CrudListButtons edit_button_path={PRESENTACION_PRODUCTO_PATH.fncEdit(x.id)} delete_button_function={() => {handlerDeleteItem(x.id)}}/>
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
