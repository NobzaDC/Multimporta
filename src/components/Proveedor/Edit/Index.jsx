import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { PROVEEDOR_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getDigitoDian } from "helpers/getDigitoVerificacion/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { handlerInputNumberKeyPress } from "helpers/InputNumberKeyPress/Index";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as ProveedorService from "services/V1/Proveedor/Index";
import * as CiudadService from "services/V1/Ciudades/Index";
import * as PaisService from "services/V1/Paises/Index";
import * as PuertoService from "services/V1/Puerto/Index";

const DEFAULT_FORM_DATA = {
	nombre: "",
	nombre_error: "",
	nombre_referencia: "",
	tipo_persona: "",
	tipo_persona_error: "",
	nit: "",
	nit_error: "",
	numero_verificacion: "",
	telefono: "",
	celular: "",
	email: "",
	puerto: "",
	numero_cuenta: "",
	codigo_swift: "",
	direccion_banco: "",
	pais_banco: "",
	ciudad_banco: "",
	ban: "",
};

const TIPO_IDENTIFICACION = [
	{ id: "CC", nombre: "Cédula de ciudadanía" },
	{ id: "TI", nombre: "Tarjeta de identidad" },
	{ id: "CE", nombre: "Cédula de extranjería" },
	{ id: "NP", nombre: "Número de pasaporte" },
	{ id: "PE", nombre: "Permiso especial" },
	{ id: "RC", nombre: "Registro civil" },
];

export const ProveedorEdit = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);
	const [originalCode, setOriginalCode] = React.useState("");
	const [ciudades, setCiudades] = React.useState([]);
	const [paises, setPaises] = React.useState([]);
	const [puertos, setPuertos] = React.useState([]);

	const { id } = useParams();
	const history = useHistory();

	React.useEffect(() => {
		ProveedorService.getById(id).then((x) => {
			setFormData((last) => ({
				...last,
				id: x.id,
				nombre: x.nombre,
				nombre_referencia: x.nombreReferencia,
				tipo_persona: x.tipoPersona,
				nit: x.nit,
				numero_verificacion: x.numeroVerificacion,
				telefono: x.telefono,
				celular: x.celular,
				email: x.email,
				puerto: x.puertoPrincipal,
				numero_cuenta: x.numeroCuenta,
				codigo_swift: x.codigoSwift,
				direccion_banco: x.direccionBanco,
				pais_banco: x.paisBanco,
				ciudad_banco: x.ciudadBanco,
				ban: x.ban,
			}));
			setOriginalCode(x.id);
		});
		CiudadService.getAll().then(setCiudades);
		PaisService.getAll().then(setPaises);
		PuertoService.getAll().then(setPuertos);
	}, [id]);

	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, nombre_error: "" }));

		const { target } = e;

		const {
			name,
			referenceName,
			personType,
			nit,
			verification,
			phone,
			cellphone,
			mail,
			port,
			account,
			swift,
			bankDirection,
			bankCountry,
			bankCity,
			ban,
		} = target;

		let validationFlag = true;
		let validationJson = {};

		if (!name.value) {
			validationFlag = false;
			validationJson = { ...validationJson, nombre_error: REQUIRED_ERROR };
		}

		if (!personType.value) {
			validationFlag = false;
			validationJson = { ...validationJson, tipo_persona_error: REQUIRED_ERROR };
		}

		if (!nit.value) {
			validationFlag = false;
			validationJson = { ...validationJson, nit_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Nombre: name.value,
			NombreReferencia: referenceName.value,
			TipoPersona: personType.value,
			Nit: nit.value,
			NumeroVerificacion: verification.value,
			Telefono: phone.value,
			Email: mail.value,
			Celular: cellphone.value,
			PuertoPrincipal: port.value || null,
			NumeroCuenta: account.value,
			CodigoSwift: swift.value,
			DireccionBanco: bankDirection.value,
			CiudadBanco: bankCity.value || null,
			PaisBanco: bankCountry.value || null,
			Ban: ban.value,
		};

		toast
			.promise(ProveedorService.Edit(json, originalCode), {
				pending: "Editando el proveedor...",
				success: "Proveedor editado con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al editar el proveedor.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(PROVEEDOR_PATH.index));
			});
	};

	const handlerChangeNit = (e) => {
		setFormData((last) => ({ ...last, nit: e.target.value, numero_verificacion: getDigitoDian(e.target.value) }));
	};

	return (
		<Section>
			<NavigationTitle
				name="Editar proveedor"
				path={getServerPath(PROVEEDOR_PATH.index)}
				width_title="100%"
				width_children="0"
			/>
			<Form submitButtonClass="btn-success" submitButtonName="Guardar" handlerSubmit={handlerFormSubmit}>
				<div className="row mt-4">
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
						<label htmlFor="referenceName" className="form-label">
							Nombre referencia
						</label>
						<input
							id="referenceName"
							name="referenceName"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Nombre referencia"
							maxLength={150}
							value={formData.nombre_referencia}
							onChange={(e) => setFormData((last) => ({ ...last, nombre_referencia: e.target.value }))}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="personType" className="form-label">
							Tipo persona
						</label>
						<select
							id="personType"
							name="personType"
							className="form-select"
							value={formData.tipo_persona}
							onChange={(e) => setFormData((last) => ({ ...last, tipo_persona: e.target.value }))}
						>
							<option value="">Seleccione</option>
							{TIPO_IDENTIFICACION.map((x) => (
								<option value={x.id} key={x.id}>
									{x.nombre}
								</option>
							))}
						</select>
						<span className="text-danger">{formData.tipo_persona_error}</span>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-5">
						<label htmlFor="nit" className="form-label">
							Nit
						</label>
						<input
							id="nit"
							name="nit"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Nit"
							maxLength={9}
							onKeyPress={handlerInputNumberKeyPress}
							value={formData.nit}
							onChange={handlerChangeNit}
						/>
						<span className="text-danger">{formData.nit_error}</span>
					</div>
					<div className="col-md-2">
						<label htmlFor="verification" className="form-label">
							# verificación
						</label>
						<input
							id="verification"
							name="verification"
							autoComplete="off"
							className="form-control"
							placeholder="# verificación"
							maxLength={1}
							value={formData.numero_verificacion}
							disabled
							readOnly
						/>
					</div>
					<div className="col-md-5">
						<label htmlFor="phone" className="form-label">
							Telefono
						</label>
						<input
							id="phone"
							name="phone"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Telefono"
							onKeyPress={handlerInputNumberKeyPress}
							value={formData.telefono}
							onChange={(e) => setFormData((last) => ({ ...last, telefono: e.target.value }))}
						/>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-4">
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
					<div className="col-md-4">
						<label htmlFor="mail" className="form-label">
							Email
						</label>
						<input
							id="mail"
							name="mail"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Email"
							maxLength={100}
							value={formData.email}
							onChange={(e) => setFormData((last) => ({ ...last, email: e.target.value }))}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="port" className="form-label">
							Puerto principal
						</label>
						<select
							id="port"
							name="port"
							className="form-select"
							value={formData.puerto}
							onChange={(e) => setFormData((last) => ({ ...last, puerto: e.target.value }))}
						>
							<option  value="">Seleccione</option>
							{puertos.map((x) => (
								<option value={x.codigo} key={x.codigo}>
									{x.nombre}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-4">
						<label htmlFor="account" className="form-label">
							Numero de cuenta
						</label>
						<input
							id="account"
							name="account"
							type="number"
							autoComplete="off"
							className="form-control"
							placeholder="Numero de cuenta"
							onKeyPress={handlerInputNumberKeyPress}
							value={formData.numero_cuenta}
							onChange={(e) => setFormData((last) => ({ ...last, numero_cuenta: e.target.value }))}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="swift" className="form-label">
							Codigo SWIFT
						</label>
						<input
							id="swift"
							name="swift"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Codigo SWIFT"
							maxLength={11}
							value={formData.codigo_swift}
							onChange={(e) => setFormData((last) => ({ ...last, codigo_swift: e.target.value }))}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="bankDirection" className="form-label">
							Dirección del banco
						</label>
						<input
							id="bankDirection"
							name="bankDirection"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Dirección del banco"
							maxLength={50}
							value={formData.direccion_banco}
							onChange={(e) => setFormData((last) => ({ ...last, direccion_banco: e.target.value }))}
						/>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-4">
						<label htmlFor="bankCountry" className="form-label">
							Pais del banco
						</label>
						<select
							id="bankCountry"
							name="bankCountry"
							className="form-select"
							value={formData.pais_banco}
							onChange={(e) => setFormData((last) => ({ ...last, pais_banco: e.target.value }))}
						>
							<option  value="">Seleccione</option>
							{paises.map((x) => (
								<option value={x.codigo} key={x.codigo}>
									{x.nombre}
								</option>
							))}
						</select>
					</div>
					<div className="col-md-4">
						<label htmlFor="bankCity" className="form-label">
							Ciudad Banco
						</label>
						<select
							id="bankCity"
							name="bankCity"
							className="form-select"
							value={formData.ciudad_banco}
							onChange={(e) => setFormData((last) => ({ ...last, ciudad_banco: e.target.value }))}
						>
							<option  value="">Seleccione</option>
							{ciudades.map((x) => (
								<option value={x.codigo} key={x.codigo}>
									{x.nombre}
								</option>
							))}
						</select>
					</div>
					<div className="col-md-4">
						<label htmlFor="ban" className="form-label">
							Ban
						</label>
						<input
							id="ban"
							name="ban"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Ban"
							maxLength={16}
							value={formData.ban}
							onChange={(e) => setFormData((last) => ({ ...last, ban: e.target.value }))}
						/>
					</div>
				</div>
			</Form>
		</Section>
	);
};
