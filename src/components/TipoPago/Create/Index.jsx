import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { TIPO_PAGO_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as TipoPagoService from "services/V1/TipoPago/Index";

const DEFAULT_FORM_DATA = {
	codigo: "",
	codigo_error : "",
	nombre: "",
	nombre_error: "",
	observaciones: "",
};

export const TipoPagoCreate = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);

	const history = useHistory();

	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, id_error: "", codigo_error: "", nombre_error: "" }));

		const { target } = e;

		const { code, name, details } = target;

		let validationFlag = true;
		let validationJson = {};

		if (!code.value) {
			validationFlag = false;
			validationJson = { ...validationJson, codigo_error: REQUIRED_ERROR };
		}

		if (!name.value) {
			validationFlag = false;
			validationJson = { ...validationJson, nombre_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Codigo: code.value,
			Nombre: name.value,
			Observaciones: details.value,
		};

		toast
			.promise(TipoPagoService.CreateAsync(json), {
				pending: "Creando el tipo de pago...",
				success: "Tipo de pago creado con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al crear el tipo de pago.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(TIPO_PAGO_PATH.index));
			});
	};

	return (
		<Section>
			<NavigationTitle name="Nuevo tipo de pago" path={getServerPath(TIPO_PAGO_PATH.index)} width_title='100%' width_children='0'/>
			<Form submitButtonClass="btn-success" submitButtonName="Guardar" handlerSubmit={handlerFormSubmit}>
				<div className="row mt-4">
					<div className="col-md-4">
						<label htmlFor="code" className="form-label">
							Código
						</label>
						<input
							id="code"
							name="code"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Código"
							maxLength={5}
							value={formData.codigo}
							onChange={(e) => setFormData((last) => ({ ...last, codigo: e.target.value }))}
						/>
						<span className="text-danger">{formData.codigo_error}</span>
					</div>
					<div className="col-md-8">
						<label htmlFor="name" className="form-label">
							Nombre
						</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Nombre"
							maxLength={50}
							value={formData.nombre}
							onChange={(e) => setFormData((last) => ({ ...last, nombre: e.target.value }))}
						/>
						<span className="text-danger">{formData.nombre_error}</span>
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