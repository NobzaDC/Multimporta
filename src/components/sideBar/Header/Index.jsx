import styled from 'styled-components'
import * as Color from 'helpers/colorPalette/Index'
import { FontAwesomeIcon } from 'components/global/FontAwesomeIcon/Index';
import { ACTIVE } from 'helpers/const/Index';

const StyledSideBarHeader = styled.div`
width: 100%;
height: 130px;
background: ${Color.DARK_PRIMARY};
display: flex;
flex-direction: column;
`;

const HeaderSection = styled.div`
width: 100%;
height: 50%;
display: flex;
justify-content: ${(props) => props.horizontal_direction || "flex-start"};
align-items: center;
box-sizing: border-box;
padding: 20px;
`;

const ButtonHeader = styled.button`
width: 50px;
height: 50px;
background: ${Color.PRIMARY};
border-radius: 13px;
border: solid 0px transparent;
transition: all 0.3s;

:hover {
    background: ${Color.LIGHT_PRIMARY};
}
`;

const UbicationTitle = styled.p`
	color: ${(props) => props.color || Color.WHITE};
	font-size: 1.3rem;
	font-weight: ${(props) => props.font_weight || "normal"};
	transition: all 0.3s;
	margin-left: ${(props) => (props.isactive === ACTIVE ? "0" : "-200px")};
`;


export const SideBarHeader = ({toggleMenu, active}) => {
	return (
		<StyledSideBarHeader>
			<HeaderSection horizontal_direction="flex-end">
				<ButtonHeader onClick={toggleMenu}>
					<center>
						<FontAwesomeIcon className="fa-bars" color={Color.WHITE} />
					</center>
				</ButtonHeader>
			</HeaderSection>
			<HeaderSection>
				<UbicationTitle font_weight="bold" font_size="1.3rem" isactive={active}>
					Nombre ubicacíon.
				</UbicationTitle>
			</HeaderSection>
		</StyledSideBarHeader>
	);
};
