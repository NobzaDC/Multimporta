import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { HomePage, ORDEN_COMPRA_PATH } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import styled from "styled-components";
import * as OrdenCompraService from "services/V1/OrdenCompra/Index";
import * as Color from 'helpers/colorPalette/Index'
import { Link } from "react-router-dom";
import React from "react";

const MasterTableContainer = styled.div`
	width: 100%;
`
const TableContainer = styled.div`
	overflow: auto;
	max-width: 100%;
	height: 77vh;
	padding: 20px 15px;
`;

const AddButon = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const OrdenCompraIndex = () => {
	const [orders, setOrders] = React.useState([])

	React.useEffect(() => {
		OrdenCompraService.getAll()
			.then(data => setOrders(data.filter(x => x.esOriginal === false)))

	}, [])

    return (
        <>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Orden de compra" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						<AddButon className="btn btn-success" to={getServerPath(ORDEN_COMPRA_PATH.create)}>
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
											<th>Fecha pedido</th>
											<th>Número importación</th>
											<th>Proveedor</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{orders.map((x) => {
											return (
												<tr key={x.id}>
													<td>{x.id}</td>
													<td>{x.fechaPedido.split('T')[0]}</td>
													<td>{x.numeroImportacion}</td>
													<td>{x.proveedorNavigation?.nombre}</td>
													<td>
														<Link className="btn btn-success" to={getServerPath(ORDEN_COMPRA_PATH.fncUpdate(x.id))}><FontAwesomeIcon className="fa-sync-alt" color={Color.WHITE}/> Actualizar</Link>
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
    )
}