import styled from "styled-components";
import * as Color from "helpers/colorPalette/Index";
import { FontAwesomeIcon } from "../FontAwesomeIcon/Index";
import { Link } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";

const Container = styled.div`
	width: 100%;
	height: 13vh;
`;

const Divider = styled.div`
	width: 100%;
	height: 3px;
	border-radius: 13px;
	background: grey;
`;

const TitleSection = styled(Link)`
	display: flex;
	flex-direction: row;
	text-decoration: none;
	color: ${Color.BLACK};
	width: ${props => props.width || '40%'};

	h2 {
		padding: 5px 0 0 25px;
	}
`;

const ChildrenContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: ${props => props.width || '60%'};
`;

export const NavigationTitle = ({ name, path = "/", children, width_title, width_children }) => {
	return (
		<Container>
			<div className="row">
					<TitleSection to={getServerPath(path)} width={width_title}>
						<FontAwesomeIcon font_size="3rem" className="fa-chevron-left" />
						<h2>{name}</h2>
					</TitleSection>
				<ChildrenContainer width={width_children}>{children}</ChildrenContainer>
			</div>
			<br />
			<Divider />
		</Container>
	);
};
