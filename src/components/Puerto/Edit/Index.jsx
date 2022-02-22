import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { PUERTO_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as PuertoService from 'services/V1/Puerto/Index'
import * as CiudadesService from "services/V1/Ciudades/Index";
import * as PaisesService from "services/V1/Paises/Index";
import { handlerInputNumberKeyPress } from "helpers/InputNumberKeyPress/Index";

const DEFAULT_FORM_DATA = {
	codigo: "",
	codigo_error: "",
	nombre: "",
	nombre_error: "",
	tiempo: "",
	tiempo_error: "",
	pais: "",
	ciudad: "",
	observaciones: "",
};

export const PuertosEdit = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA)
	const [originalCode, setOriginalCode] = React.useState('')
	const [ciudades, setCiudades] = React.useState([]);
	const [paises, setPaises] = React.useState([]);

    const { id } = useParams()
	const history = useHistory();

	React.useEffect(() => {
		PuertoService.getById(id).then(x => {
			setFormData(last => ({...last, codigo: x.codigo, nombre: x.nombre, tiempo: parseInt(x.tiempoTransitoDias), pais: x.codigoPais, ciudad: x.codigoCiudad, observaciones: x.observaciones}))
			setOriginalCode(x.codigo)
		})
        CiudadesService.getAll().then(setCiudades);
		PaisesService.getAll().then(setPaises);
	}, [id])
    
	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, codigo_error: "", nombre_error: "" }));

		const { target } = e;

		const { code, name, days, country, city, details } = target;

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

		if (!days.value) {
			validationFlag = false;
			validationJson = { ...validationJson, tiempo_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Codigo: code.value,
			Nombre: name.value,
			CodigoCiudad: city.value,
			CodigoPais: country.value,
			TiempoTransitoDias: days.value,
			Observaciones: details.value,
		};

		toast.promise(
			PuertoService.Edit(json, originalCode),
			{
				pending: 'Editando el puerto...',
				success: 'Puerto editado con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al editar el puerto.")
				  }}
			}
		).then((x) => {
			history.push(getServerPath(PUERTO_PATH.index));
		});
	};

	return (
		<Section>
			<NavigationTitle name="Editar puerto" path={getServerPath(PUERTO_PATH.index)} />
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
							maxLength={5}
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
						<label htmlFor="days" className="form-label">
							Tiempo de transporte [días]
						</label>
						<input
							id="days"
							name="days"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Dias"
							value={formData.tiempo}
							onKeyPress={handlerInputNumberKeyPress}
							onChange={(e) => setFormData((last) => ({ ...last, tiempo: e.target.value }))}
						/>
						<span className="text-danger">{formData.tiempo_error}</span>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<label htmlFor="country">Pais</label>
						<select
							id="country"
							name="country"
							className="form-select"
							value={formData.pais}
							onChange={(e) => setFormData((last) => ({ ...last, pais: e.target.value }))}
						>
							<option value="">{paises.length >= 1 ? "Seleccione" : "Cargando..."}</option>
							{paises.map((x) => (
								<option value={x.codigo} key={x.codigo}>
									{x.nombre}
								</option>
							))}
						</select>
					</div>
					<div className="col-md-6">
						<label htmlFor="city">Ciudad</label>
						<select
							id="city"
							name="city"
							className="form-select"
							value={formData.ciudad}
							onChange={(e) => setFormData((last) => ({ ...last, ciudad: e.target.value }))}
						>
							<option value="">{ciudades.length >= 1 ? "Seleccione" : "Cargando..."}</option>
							{ciudades.map((x) => (
								<option value={x.codigo} key={x.codigo}>
									{x.nombre}
								</option>
							))}
						</select>
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
