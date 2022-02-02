import * as Color from "helpers/colorPalette/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "../FontAwesomeIcon/Index";

const ButtonsContainer = styled.div`
	display: flex !important;
	justify-content: center;
	flex-direction: row;
	gap: 13px;
`;

export const CrudListButtons = ({
	icon_color = Color.WHITE,
	edit_button_name = "Editar",
	edit_button_class = "btn-primary",
	edit_button_icon = "fa-pencil",
	edit_button_function,
	edit_button_path = null,
	delete_button_name = "Eliminar",
	delete_button_class = "btn-danger",
	delete_button_icon = "fa-trash",
	delete_button_function,
}) => {
	const [confirmationDelete, setConfirmationDelete] = React.useState(false);

	const toggleConfirmationDelete = () => {
		setConfirmationDelete((last) => !last);
	};

	return (
		<ButtonsContainer>
			{confirmationDelete ? (
				<>
					<span>Seguro? </span>
					<button className="btn btn-success btn-sm" onClick={delete_button_function}>
						<i className="fa fa-check" />
					</button>
					<button className="btn btn-danger btn-sm" onClick={toggleConfirmationDelete}>
						<FontAwesomeIcon className="fa-times" color={icon_color} />
					</button>
				</>
			) : (
				<>
					{!!edit_button_path ? (
						<Link className={`btn ${edit_button_class}`} to={getServerPath(edit_button_path)}>
							<FontAwesomeIcon className={edit_button_icon} color={icon_color} /> {edit_button_name}
						</Link>
					) : (
						<button className={`btn ${edit_button_class}`} onClick={edit_button_function}>
							<FontAwesomeIcon className={edit_button_icon} color={icon_color} /> {edit_button_name}
						</button>
					)}
					<button className={`btn ${delete_button_class}`} onClick={toggleConfirmationDelete}>
						<FontAwesomeIcon className={delete_button_icon} color={icon_color} /> {delete_button_name}
					</button>
				</>
			)}
		</ButtonsContainer>
	);
};
