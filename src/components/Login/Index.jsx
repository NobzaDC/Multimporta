import styled from "styled-components";
import * as Color from "helpers/colorPalette/Index";
import { useHistory } from "react-router-dom";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { HomePage, ERROR_CASES, USER_LOCAL_STORAGE_STRING } from "helpers/const/Index";
import * as UsuarioService from "services/V1/Usuarios/Index";
import { useRef } from "react";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { toast } from "react-toastify";

const Container = styled.div`
	width: 100%;
	height: 100vh !important;
	background: ${`linear-gradient(315deg, ${Color.DARK_PRIMARY} 0%, ${Color.PRIMARY} 50%, ${Color.LIGHT_PRIMARY} 100%)`};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	h1 {
		color: ${Color.WHITE};
		padding: 0 0 1rem;
	}
`;

const LoginSection = styled.div`
	min-width: 35%;
	background: lightgray;
	border-radius: 13px;
	border: solid 1px ${Color.BLACK};
	display: flex;
	flex-direction: column;
	padding: 2.3rem;
`;

const Button = styled.button`
	width: 100%;
	/* border-radius: 25px; */
	/* background: ${Color.PRIMARY}; */
	padding: 10px 6px;
	/* color: ${Color.WHITE};
	min-height: 40px;
	transition: all 0.3s;

	:hover {
		background: ${Color.DARK_PRIMARY};
	} */
`;

const Form = styled.form`
	label {
		font-weight: 400 !important;
	}
`;

export const LoginIndex = () => {
	const history = useHistory();
	const passwordRef = useRef()


	const handlerOnSubmit = (e) => {
		e.preventDefault();

		const { target } = e
		const { correo, contraseña } = target

		if(!correo.value || !contraseña.value){
			passwordRef.current.value = ''
			return handlerCreateToast({message: 'El usuario y la contraseña son requeridos.', type: TOAST_TYPES.error})
		}

		const json = {
			Correo: correo.value,
			Contraseña: contraseña.value
		}

		toast.promise(
			UsuarioService.LoginUser(json),
			{
				pending: 'Validando...',
				success: 'Usuario validado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al ingresar.")
				  }}
			}
		).then(response => {
			window.localStorage.setItem(USER_LOCAL_STORAGE_STRING, JSON.stringify(response));
			history.push(getServerPath(HomePage.index))
		})

	};

	return (
		<Container>
			<h1>Multimporta</h1>
			<LoginSection>
				<Form onSubmit={handlerOnSubmit}>
					<div className="form-floating mb-3">
						<input
							autoComplete="email"
							type="text"
							maxLength={150}
							className="form-control"
							id="correo"
							name="correo"
							placeholder="Usuario"
						/>
						<label htmlFor="correo">Usuario</label>
					</div>
					<div className="form-floating mb-3">
						<input
							ref={passwordRef}
							type="password"
							className="form-control"
							id="contraseña"
							name="contraseña"
							placeholder="Contraseña"
							autoComplete="current-password"
						/>
						<label htmlFor="contraseña">Contraseña</label>
					</div>
					<Button type="submit" className="btn btn-primary">
						INGRESAR
					</Button>
				</Form>
			</LoginSection>
		</Container>
	);
};
