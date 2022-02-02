import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import * as Color from "helpers/colorPalette/Index";
import { ACTIVE, CIUDADES_PATH, CONDICION_PAGO_PATH, PRESENTACION_PRODUCTO_PATH, PRODUCTO_PATH, PROVEEDOR_PATH, PUERTO_PATH, TERMINO_NEGOCIACION_PATH, TIPO_PAGO_PATH } from "helpers/const/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
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

const BodyOptions = styled.ul`
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
		padding: 0px;
		font-weight: bold;
		font-size: 1.3rem;
		transition: all 0.3s;

		:hover {
			background: ${Color.LIGHT_PRIMARY};
		}
	}
`;

const CustomLink = styled(NavLink)`
	display: flex;
	flex-direction: ${(props) => (props.isactive === ACTIVE ? "row" : "row-reverse")};
	color: ${Color.WHITE};
	text-decoration: none;
	padding: 10px 8px 10px 15px;
	transition: all 0.3s;

	:hover {
		color: ${Color.WHITE};
	}
`;
const IconContainer = styled.div`
	width: 80px;
	padding-left: 13px;
`;

const NameContainer = styled.div`
	width: 100% !important;

   label{
       width: 200px;
       white-space: normal;
   }
`;

const OpLink = ({ active, path, name, icon }) => {
	return (
		<li>
			<CustomLink to={getServerPath(path)} activeclassname="active" isactive={active}>
				<IconContainer>
					<FontAwesomeIcon color={Color.DARK_PRIMARY} font_size="1.3rem" className={icon} />
				</IconContainer>
				<NameContainer><label>{name}</label></NameContainer>
			</CustomLink>
		</li>
	);
};

export const SideBarBody = ({ active }) => {
	return (
		<StyledSideBarBody>
			<BodyOptions isactive={active}>
				<OpLink active={active} path={getServerPath(CIUDADES_PATH.index)} name='Ciudad' icon='fa-map-marked-alt'/>
				<OpLink active={active} path={getServerPath(CONDICION_PAGO_PATH.index)} name='Condición pago' icon='fa-comments-dollar'/>
				<OpLink active={active} path={getServerPath(PRESENTACION_PRODUCTO_PATH.index)} name='Presentación del producto' icon='fa-eye'/>
				<OpLink active={active} path={getServerPath(PRODUCTO_PATH.index)} name='Producto' icon='fa-box-open'/>
				<OpLink active={active} path={getServerPath(PROVEEDOR_PATH)} name='Proveedor' icon='fa-people-carry'/>
				<OpLink active={active} path={getServerPath(TERMINO_NEGOCIACION_PATH.index)} name='Término de negociación' icon='fa-file-signature'/>
				<OpLink active={active} path={getServerPath(PUERTO_PATH.index)} name='Puerto' icon='fa-plane-departure'/>
				<OpLink active={active} path={getServerPath(TIPO_PAGO_PATH.index)} name='Tipo de pago' icon='fa-file-invoice-dollar'/>
			</BodyOptions>
		</StyledSideBarBody>
	);
};
