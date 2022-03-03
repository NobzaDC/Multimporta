import styled from "styled-components";
import * as Color from "helpers/colorPalette/Index";
import ReactDOM from "react-dom";

const H5 = styled.h5`
	color: ${Color.BLACK};
`;

const Background = styled.div`
	background-color: #282c34c9;
	backdrop-filter: blur(5px);
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	bottom: 0px;
	top: 0px;
	right: 0px;
	left: 0px;
	position: fixed;
`;

const StyledModal = styled.div`
	width: 100%;
`;

const ModalContent = ({ onClose, children, title, btn_class, btn_name, btn_function, modal_size }) => {
	return (
		<Background>
			<StyledModal className={`modal-dialog ${modal_size}`}>
				<div className="modal-content">
					<div className="modal-header">
						<H5 className="modal-title">{title}</H5>
						<button className="btn-close" onClick={onClose}></button>
					</div>
					<div className="modal-body">{children}</div>
					<div className="modal-footer">
						<button className="btn btn-secondary" onClick={onClose}>
							Cerrar
						</button>
						{btn_class ? (
							<button className={`btn btn-${btn_class}`} onClick={btn_function}>
								{btn_name}
							</button>
						) : (
							<></>
						)}
					</div>
				</div>
			</StyledModal>
		</Background>
	);
};

export const Modal = ({ onClose, children, title, btn_class, btn_name, btn_function,modal_size }) => {
	return ReactDOM.createPortal(
		<ModalContent
			onClose={onClose}
			title={title}
			btn_class={btn_class}
			btn_name={btn_name}
			btn_function={btn_function}
            modal_size={modal_size}
		>
			{children}
		</ModalContent>,
		document.getElementById("modal-section"),
	);
};
