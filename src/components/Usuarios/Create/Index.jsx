import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { USUARIO_PATH, ERROR_CASES, REQUIRED_ERROR, TIPO_IDENTIFICACION } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { handlerInputNumberKeyPress } from "helpers/InputNumberKeyPress/Index";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as UsuarioService from "services/V1/Usuarios/Index";

const DEFAULT_FORM_DATA = {
	nombre: "",
	nombre_error: "",
	apellido: "",
	tipo_identificacion: "",
	documento: "",
	correo: "",
	correo_error: "",
	telefono: "",
	celular: "",
	contraseña: "",
	contraseña_error: "",
	contraseña_validacion: "",
	contraseña_validacion_error: "",
	observaciones: "",
};

export const UsuarioCreate = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);

	const history = useHistory();

	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({
			...last,
			nombre_error: "",
			correo_error: "",
			contraseña_error: "",
			contraseña_validacion_error: "",
		}));

		const { target } = e;

		const {
			name,
			last_name,
			identification_type,
			document,
			email,
			phone,
			cellphone,
			password,
			password_validation,
			details,
		} = target;

		let validationFlag = true;
		let validationJson = {};

		if (!name.value) {
			validationFlag = false;
			validationJson = { ...validationJson, nombre_error: REQUIRED_ERROR };
		}

		if (!email.value) {
			validationFlag = false;
			validationJson = { ...validationJson, correo_error: REQUIRED_ERROR };
		}

		if (!password.value) {
			validationFlag = false;
			validationJson = { ...validationJson, contraseña_error: REQUIRED_ERROR };
		} else if (!password_validation.value) {
			validationFlag = false;
			validationJson = { ...validationJson, contraseña_validacion_error: REQUIRED_ERROR };
		} else {
			if (password.value !== password_validation.value) {
				validationFlag = false;
				validationJson = {
					...validationJson,
					contraseña_error: "Las contraseñas no coinciden",
					contraseña_validacion_error: "Las contraseñas no coinciden",
					contraseña: "",
					contraseña_validacion: "",
				};
			}
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Nombre: name.value,
			Apellido: last_name.value,
			TipoIdentidicacion: identification_type.value,
			Documento: document.value,
			Correo: email.value,
			Telefono: phone.value,
			Celular: cellphone.value,
			Contraseña: password.value,
			Observaciones: details.value,
		};

		toast
			.promise(UsuarioService.RegisterUser(json), {
				pending: "Creando el usuario...",
				success: "Usuario creado con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al crear el usuario.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(USUARIO_PATH.index));
			});
	};

	return (
		<Section>
			<NavigationTitle
				name="Nuevo usuario"
				path={getServerPath(USUARIO_PATH.index)}
				width_title="100%"
				width_children="0"
			/>
			<Form submitButtonClass="btn-success" submitButtonName="Guardar" handlerSubmit={handlerFormSubmit}>
				<div className="row mt-4">
					<div className="col-md-4">
						<label htmlFor="name" className="form-label">
							Nombres
						</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Nombres"
							maxLength={100}
							value={formData.nombre}
							onChange={(e) => setFormData((last) => ({ ...last, nombre: e.target.value }))}
						/>
						<span className="text-danger">{formData.nombre_error}</span>
					</div>
					<div className="col-md-4">
						<label htmlFor="last_name" className="form-label">
							Apellidos
						</label>
						<input
							id="last_name"
							name="last_name"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Apellidos"
							maxLength={100}
							value={formData.apellido}
							onChange={(e) => setFormData((last) => ({ ...last, apellido: e.target.value }))}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="identification_type" className="form-label">
							Tipo identificación
						</label>
						<select
							id="identification_type"
							name="identification_type"
							className="form-select"
							value={formData.tipo_identificacion}
							onChange={(e) => setFormData((last) => ({ ...last, tipo_identificacion: e.target.value }))}
						>
							<option value="">Seleccione</option>
							{TIPO_IDENTIFICACION.map((x) => (
								<option value={x.id} key={x.id}>
									{x.nombre}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<label htmlFor="document" className="form-label">
							Documento
						</label>
						<input
							id="document"
							name="document"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Documento"
							maxLength={15}
							onKeyPress={handlerInputNumberKeyPress}
							value={formData.documento}
							onChange={(e) => setFormData((last) => ({ ...last, documento: e.target.value }))}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="email" className="form-label">
							Correo
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="off"
							className="form-control"
							placeholder="Correo"
							maxLength={150}
							value={formData.correo}
							onChange={(e) => setFormData((last) => ({ ...last, correo: e.target.value }))}
						/>
						<span className="text-danger">{formData.correo_error}</span>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<label htmlFor="phone" className="form-label">
							Teléfono
						</label>
						<input
							id="phone"
							name="phone"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Teléfono"
							onKeyPress={handlerInputNumberKeyPress}
							value={formData.telefono}
							onChange={(e) => setFormData((last) => ({ ...last, telefono: e.target.value }))}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="cellphone" className="form-label">
							Celular
						</label>
						<input
							id="cellphone"
							name="cellphone"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Celular"
							onKeyPress={handlerInputNumberKeyPress}
							value={formData.celular}
							onChange={(e) => setFormData((last) => ({ ...last, celular: e.target.value }))}
						/>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<label htmlFor="name" className="form-label">
							Contraseña
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="off"
							className="form-control"
							placeholder="Contraseña"
							maxLength={50}
							value={formData.contraseña}
							onChange={(e) => setFormData((last) => ({ ...last, contraseña: e.target.value }))}
						/>
						<span className="text-danger">{formData.contraseña_error}</span>
					</div>
					<div className="col-md-6">
						<label htmlFor="name" className="form-label">
							Validar contraseña
						</label>
						<input
							id="password_validation"
							name="password_validation"
							type="password"
							autoComplete="off"
							className="form-control"
							placeholder="Validar contraseña"
							maxLength={50}
							value={formData.contraseña_validacion}
							onChange={(e) =>
								setFormData((last) => ({ ...last, contraseña_validacion: e.target.value }))
							}
						/>
						<span className="text-danger">{formData.contraseña_validacion_error}</span>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-12">
						<label htmlFor="details" className="form-label">
							Observaciones
						</label>
						<textarea
							className="form-control"
							id="details"
							name="details"
							rows="3"
							autoComplete="off"
							placeholder="Observaciones"
							value={formData.observaciones}
							onChange={(e) => setFormData((last) => ({ ...last, observaciones: e.target.value }))}
						/>
					</div>
				</div>
			</Form>
		</Section>
	);
};
