import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import * as Color from "helpers/colorPalette/Index";
import {
	ACTIVE,
	CIUDADES_PATH,
	CONDICION_PAGO_PATH,
	ORDEN_COMPRA_PATH,
	PRESENTACION_PRODUCTO_PATH,
	PRODUCTO_PATH,
	PROVEEDOR_PATH,
	PUERTO_PATH,
	TERMINO_NEGOCIACION_PATH,
	TIPO_PAGO_PATH,
	USUARIO_PATH,
} from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSideBarBody = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: ${Color.PRIMARY};
	overflow-y: hidden;
	overflow-x: hidden;
`;

const Ul = styled.ul`
	width: 100%;
	flex-direction: column;
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
	white-space: nowrap;
	overflow: hidden;
	overflow-y: ${(props) => (props.isactive === ACTIVE ? "scroll" : "hidden")};
	overflow-x: hidden;

	::-webkit-scrollbar {
		background-color: transparent;
		width: 0px;
	}

	/* background of the scrollbar except button or resizer */
	/* ::-webkit-scrollbar-track {
  background-color: transparent;
} */

	/* scrollbar itself */
	/* ::-webkit-scrollbar-thumb {
  background-color: #babac0;
  height: 0px;
  border-radius: 16px;
  border: 0px solid ${Color.PRIMARY};
} */

	/* ::-webkit-scrollbar-scroll {
  background: black;
} */
	/* set button(top and bottom of the scrollbar) */
	/* ::-webkit-scrollbar-button {
  display: none;
} */

	li {
		width: 100%;
		height: ${(props) => (props.isactive === ACTIVE ? "auto" : "50px")};
		box-sizing: border-box;
		font-weight: bold;
		font-size: 1.3rem;
		transition: all 0.3s;
	}
`;

const CustomLink = styled(NavLink)`
	background: ${Color.WHITE};
	display: flex;
	flex-direction: ${(props) => (props.isactive === ACTIVE ? "row" : "row-reverse")};
	color: gray;
	text-decoration: none;
	padding: 10px 8px 10px 15px;
	transition: all 0.3s;

	:hover {
		background: gainsboro;
		color: gray;
	}

	* {
		cursor: pointer;
	}
`;
const IconContainer = styled.div`
	width: 80px;
	padding-left: 13px !important;
`;

const NameContainer = styled.div`
	padding-left: 15px;
	width: 100% !important;

	label {
		width: 200px;
		white-space: normal;
	}
`;

const SubMenu = styled.li`
	width: 100%;
	display: flex;
	flex-direction: column;
	color: ${Color.WHITE};
	transition: all 0.3s;
	margin-left: ${props => props.isactive === ACTIVE ? '0' : '-200px'};
`;

const SuMenuTitle = styled.div`
	padding: 10px 8px 10px 15px;
	width: 100%;
	display: flex;
	flex-direction: row;

	* {
		cursor: pointer;
	}
`;

const DATOS_MAESTROS = [
	{
		path: CIUDADES_PATH.index,
		name: "Ciudad",
		icon: "fa-map-marked-alt",
	},
	{
		path: CONDICION_PAGO_PATH.index,
		name: "Condición pago",
		icon: "fa-comments-dollar",
	},
	{
		path: PRESENTACION_PRODUCTO_PATH.index,
		name: "Presentación del producto",
		icon: "fa-eye",
	},
	{
		path: PRODUCTO_PATH.index,
		name: "Producto",
		icon: "fa-box-open",
	},
	{
		path: PROVEEDOR_PATH.index,
		name: "Proveedor",
		icon: "fa-people-carry",
	},
	{
		path: TERMINO_NEGOCIACION_PATH.index,
		name: "Término de negociación",
		icon: "fa-file-signature",
	},
	{
		path: PUERTO_PATH.index,
		name: "Puerto",
		icon: "fa-plane-departure",
	},
	{
		path: TIPO_PAGO_PATH.index,
		name: "Tipo de pago",
		icon: "fa-file-invoice-dollar",
	},
	{
		path: USUARIO_PATH.index,
		name: "Usuario",
		icon: "fa-user",
	},
];

const CONTROL = [
	{
		path: ORDEN_COMPRA_PATH.index,
		name: "Orden de compra",
		icon: "fa-ballot-check",
	},
];

const SideBarSubMenu = ({ options, name, icon, subMenuId, handlerOnClickSubMenu, isOpen }) => {
	const isActive = subMenuId === name;

	return (
		<SubMenu isactive={isOpen}>
			<SuMenuTitle onClick={() => handlerOnClickSubMenu(name)}>
				<IconContainer>
					<FontAwesomeIcon color={Color.DARK_PRIMARY} font_size="1.3rem" className={icon} />
				</IconContainer>
				<NameContainer>
					<label>{name}</label>
				</NameContainer>
			</SuMenuTitle>
			{isActive === true ? (
				<Ul>
					{options.map((x) => (
						<li>
							<CustomLink to={getServerPath(x.path)} activeclassname="active">
								<IconContainer>
									<FontAwesomeIcon color="gray" font_size="1.3rem" className={x.icon} />
								</IconContainer>
								<NameContainer>
									<label>{x.name}</label>
								</NameContainer>
							</CustomLink>
						</li>
					))}
				</Ul>
			) : (
				<></>
			)}
		</SubMenu>
	);
};

export const SideBarBody = ({ active }) => {
	const [subMenuId, setSubMenu] = React.useState("none");

	const handlerOnClickSubMenu = (name) => {
		setSubMenu((last) => (last === name ? "none" : name));
	};

	return (
		<StyledSideBarBody>
			<Ul isactive={active}>
				<SideBarSubMenu
					options={DATOS_MAESTROS}
					name="Datos maestros"
					icon="fa-globe"
					subMenuId={subMenuId}
					handlerOnClickSubMenu={handlerOnClickSubMenu}
					isOpen={active}
				/>
				<SideBarSubMenu
					options={CONTROL}
					name="Control"
					icon="fa-dolly-flatbed-alt"
					subMenuId={subMenuId}
					handlerOnClickSubMenu={handlerOnClickSubMenu}
					isOpen={active}
				/>
				<SideBarSubMenu
					options={[]}
					name="Informes"
					icon="fa-chart-pie"
					subMenuId={subMenuId}
					handlerOnClickSubMenu={handlerOnClickSubMenu}
					isOpen={active}
				/>
			</Ul>
		</StyledSideBarBody>
	);
};
