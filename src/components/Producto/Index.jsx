import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as ProductoService from "services/V1/Producto/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { PRODUCTO_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

export const ProductoIndex = () => {
	const [productos, setProductos] = React.useState([]);

	React.useEffect(() => {
		ProductoService.getAll().then(setProductos);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			ProductoService.Delete(code),
			{
				pending: 'Eliminando el producto...',
				success: 'Producto eliminado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar el producto.")
				  }}
			}
		).then(x => {if(x === true)setProductos(last => last.filter(y => y.codigo !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Productos" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						<AddButon className="btn btn-success" to={getServerPath(PRODUCTO_PATH.create)}>
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
											<th>Presentación</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{productos.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{x.codigo}</td>
													<td>{x.nombre}</td>
													<td>{x.presentacionNavigation?.nombre}</td>
													<td>
														<CrudListButtons edit_button_path={PRODUCTO_PATH.fncEdit(x.codigo)} delete_button_function={() => {handlerDeleteItem(x.codigo)}}/>
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
