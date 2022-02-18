import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { HomePage } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import styled from "styled-components";

const MasterTableContainer = styled.div`
	width: 100%;
`
const TableContainer = styled.div`
	overflow: auto;
	max-width: 100%;
	height: 77vh;
	padding: 20px 15px;
`;

export const OrdenCompraIndex = () => {

    return (
        <>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Orden de compra" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						{/* <AddButon className="btn btn-success" to={getServerPath(PRESENTACION_PRODUCTO_PATH.create)}>
							<FontAwesomeIcon className="fa-plus" color={Color.WHITE} /> &nbsp; Agregar
						</AddButon> */}
					</NavigationTitle>
					<TableContainer>
						<div className="row">
							<div className="col-md-12">
								<table className="table table-dark table-striped table-responsive">
									<thead>
										<tr>
											<th>Id</th>
											<th>Fecha pedido</th>
											<th>Número importación</th>
											<th>Proveedor</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{/* {presentacionProducto.map((x) => {
											return (
												<tr key={x.id}>
													<td>{x.id}</td>
													<td>{x.nombre}</td>
													<td>
														<CrudListButtons edit_button_path={PRESENTACION_PRODUCTO_PATH.fncEdit(x.id)} delete_button_function={() => {handlerDeleteItem(x.id)}}/>
													</td>
												</tr>
											);
										})} */}
									</tbody>
								</table>
							</div>
						</div>
					</TableContainer>
				</MasterTableContainer>
			</Section>
		</>
    )
}