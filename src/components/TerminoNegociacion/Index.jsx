import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import React from "react";
import styled from "styled-components";
import * as TerminoNegociacionService from "services/V1/TerminoNegociacion/Index";
import * as Color from "helpers/colorPalette/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { TERMINO_NEGOCIACION_PATH, ERROR_CASES, HomePage } from "helpers/const/Index";
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

const TIPO_ENTREGA = {
    'PD': 'Puerto destinó',
    'PO': 'Puerto origen',
    'BO': 'Bodega origen'
}

export const TerminoNegociacionIndex = () => {
	const [terminosNegociacion, setTerminosNegociacion] = React.useState([]);

	React.useEffect(() => {
		TerminoNegociacionService.getAllAsync().then(setTerminosNegociacion);
	}, []);

	const handlerDeleteItem = (code) => {
		toast.promise(
			TerminoNegociacionService.DeleteAsync(code),
			{
				pending: 'Eliminando el termino de negociación...',
				success: 'Termino de negociación eliminado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al eliminar el termino de negociación.")
				  }}
			}
		).then(x => {if(x === true)setTerminosNegociacion(last => last.filter(y => y.codigo !== code))})
	}

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle name="Terminos de negociación" path={getServerPath(HomePage.index)} width_title='80%' width_children='20%'>
						<AddButon className="btn btn-success" to={getServerPath(TERMINO_NEGOCIACION_PATH.create)}>
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
											<th>Tipo entrega</th>
											<th>Flete origen</th>
											<th>Flete maritimo</th>
											<th>Flete interno</th>
											<th>Seguro</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{terminosNegociacion.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{x.codigo}</td>
													<td>{x.nombre}</td>
													<td>{TIPO_ENTREGA[x.tipoEntrega] || 'Error'}</td>
													<td>{x.fleteOrigen === true ? 'Incluido' : 'No incluido'}</td>
													<td>{x.fleteMaritimo === true ? 'Incluido' : 'No incluido'}</td>
													<td>{x.fleteInterno === true ? 'Incluido' : 'No incluido'}</td>
													<td>{x.incluyeSeguro === true ? 'Incluido' : 'No incluido'}</td>
													<td>
														<CrudListButtons edit_button_path={TERMINO_NEGOCIACION_PATH.fncEdit(x.codigo)} delete_button_function={() => {handlerDeleteItem(x.codigo)}}/>
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
