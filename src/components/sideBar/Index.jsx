import styled from "styled-components";
import React from "react";
import { SideBarHeader } from "./Header/Index";
import { ACTIVE } from "helpers/const/Index";
import { SideBarBody } from "./Body/Index";
import { SideBarFotter } from "./Fotter/Index";

const SideBarContainer = styled.nav`
	width: 280px;
	height: 100vh;
	transition: all 0.3s;
	margin-left: ${(props) => (props.isactive === ACTIVE ? "0" : "-200px")};
	display: flex;
	flex-direction: column;
`;

export const SideBar = () => {
	const [active, setActive] = React.useState(ACTIVE);

	const handlerToggleMenuState = () => {
		if (active === ACTIVE) setActive(null);
		else setActive(ACTIVE);
	};

	return (
		<SideBarContainer isactive={active}>
			<SideBarHeader toggleMenu={handlerToggleMenuState} active={active} />
			<SideBarBody active={active} />
			<SideBarFotter active={active} />
		</SideBarContainer>
	);
};
