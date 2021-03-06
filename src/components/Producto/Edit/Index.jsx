import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { PRODUCTO_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as ProductoService from "services/V1/Producto/Index";
import * as PresentacionProductoService from "services/V1/PresentacionProducto/Index";

const DEFAULT_FORM_DATA = {
	nombre: "",
	nombre_error: "",
	cantidad: "",
	cantidad_error: "",
	precio: "",
	precio_error: "",
	presentacion: "",
	presentacion_error: "",
	observacion: "",
};

export const ProductoEdit = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);
	const [originalCode, setOriginalCode] = React.useState("");
	const [presentacionesProducto, setPresentacionesProducto] = React.useState([]);

	const { id } = useParams();
	const history = useHistory();

	React.useEffect(() => {
		ProductoService.getById(id).then((x) => {
			setFormData((last) => ({
				...last,
				codigo: x.codigo,
				nombre: x.nombre,
				presentacion: x.presentacion,
				observacion: x.observacion,
			}));
			setOriginalCode(x.codigo);
		});
		PresentacionProductoService.getAll().then(setPresentacionesProducto);
	}, [id]);

	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, id_error: "", nombre_error: "", codigo_error: "", precio_error: "" }));

		const { target } = e;

		const { code, name, presentation, details } = target;

		let validationFlag = true;
		let validationJson = {};

		if (!name.value) {
			validationFlag = false;
			validationJson = { ...validationJson, nombre_error: REQUIRED_ERROR };
		}

		if (!code.value) {
			validationFlag = false;
			validationJson = { ...validationJson, codigo_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Codigo: code.value,
			Nombre: name.value,
			Presentacion: presentation.value,
			Observacion: details.value,
		};

		toast
			.promise(ProductoService.Edit(json, originalCode), {
				pending: "Editando el producto...",
				success: "producto editado con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al editar el producto.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(PRODUCTO_PATH.index));
			});
	};

	return (
		<Section>
			<NavigationTitle
				name="Editar producto"
				path={getServerPath(PRODUCTO_PATH.index)}
				width_title="100%"
				width_children="0"
			/>
			<Form submitButtonClass="btn-success" submitButtonName="Guardar" handlerSubmit={handlerFormSubmit}>
				<div className="row mt-4">
					<div className="col-md-2">
						<label htmlFor="name" className="form-label">
							Codigo
						</label>
						<input
							id="code"
							name="code"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Codigo"
							value={formData.codigo}
							onChange={(e) =>
								setFormData((last) => ({ ...last, codigo: e.target.value.substring(0, 5) }))
							}
						/>
						<span className="text-danger">{formData.nombre_error}</span>
					</div>
					<div className="col-md-5">
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
					<div className="col-md-5">
						<label htmlFor="presentation" className="form-label">
							Presentaci??n
						</label>
						<select
							id="presentation"
							name="presentation"
							className="form-select"
							value={formData.presentacion}
							onChange={(e) => setFormData((last) => ({ ...last, presentacion: e.target.value }))}
						>
							<option value="">
								{presentacionesProducto.length >= 1 ? "Seleccione" : "Cargando..."}
							</option>
							{presentacionesProducto.map((x) => (
								<option value={x.id} key={x.id}>
									{x.nombre}
								</option>
							))}
						</select>
						<span className="text-danger">{formData.presentacion_error}</span>
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
							value={formData.observacion}
							onChange={(e) => setFormData((last) => ({ ...last, observacion: e.target.value }))}
						/>
					</div>
				</div>
			</Form>
		</Section>
	);
};
