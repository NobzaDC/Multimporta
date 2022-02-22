import * as Color from 'helpers/colorPalette/Index'
import { ACTIVE, USER_LOCAL_STORAGE_STRING, LOGIN_PATH } from 'helpers/const/Index';
import { getServerPath } from 'helpers/getServerPath/GetServerPath';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledSideBarFotter = styled.div`
	width: 100%;
	min-height: 100px;
	max-height: 100px;
	background: ${Color.DARK_PRIMARY};
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	padding-left: 13px;

	div {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		transition: all 0.3s;
		margin-left: ${(props) => (props.isactive === ACTIVE ? "0" : "-200px")};
	}

	img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		transition: all 0.3s;

		:hover {
			border-radius: 13%;
		}
	}
`;

const LogOutButton = styled.button`
	width: 80%;
	background: red;
	border: 0px solid transparent;
	padding: 2px 6px;
	text-align: center;
	font-size: 0.8rem;
	transition: all 0.2s;
	color: ${Color.WHITE};

	:hover {
		font-weight: bold;
	}
`;

const UserInfo = styled.label`
	padding-left: 10px;
	color: ${Color.WHITE};
	font-size: 0.8rem;
	text-align: center;
`;

export const SideBarFotter = ({active}) => {

	const history = useHistory()

	const handlerCloseSesion = () => {
		window.localStorage.removeItem(USER_LOCAL_STORAGE_STRING);
		history.push(getServerPath(LOGIN_PATH.index))
	}
	return (
		<StyledSideBarFotter isactive={active}>
			<img
				src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
				alt="Not find"
			/>
			<div>
				<UserInfo>Usuario</UserInfo>
				<UserInfo>Empresa</UserInfo>
				<LogOutButton onClick={handlerCloseSesion}>Cerrar sesión.</LogOutButton>
			</div>
		</StyledSideBarFotter>
	);
};
