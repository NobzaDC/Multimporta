import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { TERMINO_NEGOCIACION_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as TerminoNegociacionService from "services/V1/TerminoNegociacion/Index";

const DEFAULT_FORM_DATA = {
	codigo: "",
	codigo_error: "",
	nombre: "",
	nombre_error: "",
    tipo_entrega: "",
    tipo_entrega_error: "",
    origen: "",
    maritimo: "",
    interno: "",
    seguro: "",
};

const TIPO_ENTREGA = [
	{ id: "PD", name: "Puerto destinó" },
	{ id: "PO", name: "Puerto origen" },
	{ id: "BO", name: "Bodega origen" },
];

export const TerminoNegociacionCreate = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);

	const history = useHistory();

	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, codigo_error: "", nombre_error: "", tipo_entrega_error: "" }));

		const { target } = e;

		const { code, name, deliveryType, origin, maritime, internal, secure } = target;

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

		if (!deliveryType.value) {
			validationFlag = false;
			validationJson = { ...validationJson, tipo_entrega_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Codigo: code.value,
			Nombre: name.value,
			TipoEntrega: deliveryType.value,
			FleteOrigen: origin.checked,
			FleteMaritimo: maritime.checked,
			FleteInterno: internal.checked,
			IncluyeSeguro: secure.checked,
		};

		toast
			.promise(TerminoNegociacionService.Create(json), {
				pending: "Creando el termino de negociación...",
				success: "Termino de negociación creado con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al crear el termino de negociación.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(TERMINO_NEGOCIACION_PATH.index));
			});
	};

	return (
		<Section>
			<NavigationTitle
				name="Nuevo termino de negociación"
				path={getServerPath(TERMINO_NEGOCIACION_PATH.index)}
				width_title="100%"
				width_children="0"
			/>
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
							className="form-control"
							placeholder="Código"
							autoComplete="off"
							maxLength={3}
							value={formData.codigo}
							onChange={(e) => setFormData((last) => ({ ...last, codigo: e.target.value }))}
						/>
						<span className="text-danger">{formData.codigo_error}</span>
					</div>
					<div className="col-md-4">
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
							maxLength={150}
							value={formData.nombre}
							onChange={(e) => setFormData((last) => ({ ...last, nombre: e.target.value }))}
						/>
						<span className="text-danger">{formData.nombre_error}</span>
					</div>
					<div className="col-md-4">
						<label htmlFor="deliveryType" className="form-label">
							Tipo de entrega
						</label>
						<select
							id="deliveryType"
							name="deliveryType"
							className="form-select"
							value={formData.tipo_entrega}
							onChange={(e) => setFormData((last) => ({ ...last, tipo_entrega: e.target.value }))}
						>
							<option value="">Seleccione</option>
							{TIPO_ENTREGA.map((x) => (
								<option value={x.id} key={x.id}>
									{x.name}
								</option>
							))}
						</select>
						<span className="text-danger">{formData.tipo_entrega_error}</span>
					</div>
				</div>
				<div className="row mt-4">
					<h5>Incluye:</h5>
				</div>
				<div className="row mt-2">
					<div className="col-md-3 ps-5 form-check">
						<label className="form-check-label" htmlFor="origin">
							Incluye flete origen
						</label>
						<input className="form-check-input" type="checkbox" id="origin" name="origin" />
					</div>
					<div className="col-md-3 ps-5 form-check">
						<label className="form-check-label" htmlFor="maritime">
							Incluye flete marítimo
						</label>
						<input className="form-check-input" type="checkbox" id="maritime" name="maritime" />
					</div>
					<div className="col-md-3 ps-5 form-check">
						<label className="form-check-label" htmlFor="internal">
							Incluye flete interno
						</label>
						<input className="form-check-input" type="checkbox" id="internal" name="internal" />
					</div>
					<div className="col-md-3 ps-5 form-check">
						<label className="form-check-label" htmlFor="secure">
							Incluye seguro
						</label>
						<input className="form-check-input" type="checkbox" id="secure" name="secure" />
					</div>
				</div>
			</Form>
		</Section>
	);
};
