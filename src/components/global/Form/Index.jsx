import styled from "styled-components";

const StyledForm = styled.form`
	width: 100%;
	overflow-y: scroll;
	height: 77vh;

	::-webkit-scrollbar {
		background-color: transparent;
		width: 0px;
	}
`;

export const Form = ({ handlerSubmit, submitButtonClass, submitButtonName, children }) => {
	return (
		<StyledForm onSubmit={handlerSubmit} autoComplete="off">
			{children}
			<div className="modal-footer  ps-5 pe-5 mt-3">
				<button type="submit" className={`btn ${submitButtonClass}`}>
					{submitButtonName}
				</button>
			</div>
		</StyledForm>
	);
};