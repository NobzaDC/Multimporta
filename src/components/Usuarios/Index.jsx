import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { HomePage, USUARIO_PATH } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Color from 'helpers/colorPalette/Index'
import * as UsuarioService from "services/V1/Usuarios/Index";
import React from "react";
import { CrudListButtons } from "components/global/CrudListButtons/Index";

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

export const UsuarioIndex = () => {
	const [usuarios, setUsuarios] = React.useState([])

	React.useEffect(() => {
		UsuarioService.getAllAsync().then(setUsuarios)
	}, [])

	console.log(usuarios)

	return (
		<>
			<Section>
				<MasterTableContainer>
					<NavigationTitle
						name="Usuario"
						path={getServerPath(HomePage.index)}
						width_title="80%"
						width_children="20%"
					>
						<AddButon className="btn btn-success" to={getServerPath(USUARIO_PATH.create)}>
							<FontAwesomeIcon className="fa-plus" color={Color.WHITE} /> &nbsp; Agregar
						</AddButon>
					</NavigationTitle>
					<TableContainer>
						<div className="row">
							<div className="col-md-12">
								<table className="table table-dark table-striped table-responsive">
									<thead>
										<tr>
											<th>Nombre completo</th>
											<th>Identificación</th>
											<th>Correo</th>
											<th>Celular</th>
											<th>Opciones</th>
										</tr>
									</thead>
									<tbody>
										{usuarios.map((x) => {
											return (
												<tr key={x.codigo}>
													<td>{`${x.nombre} ${x.apellido}`}</td>
													<td>{x.documento || 'No se registro una identificación.'}</td>
													<td>{x.correo}</td>
													<td>{x.celular}</td>
													<td>
														<CrudListButtons
															edit_button_path={USUARIO_PATH.fncEdit(x.codigo)}
															delete_button_function={() => {
																console.log(x.codigo);
															}}
														/>
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
