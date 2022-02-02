import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { PRESENTACION_PRODUCTO_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as PresentacionProductoService from 'services/V1/PresentacionProducto/Index'

const DEFAULT_FORM_DATA = {
	id: '', 
	nombre: '', nombre_error: '', 
	departamento: '', 
	observaciones: '' 
}

export const PresentacionProductoEdit = () => {
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA)
	const [originalCode, setOriginalCode] = React.useState('')

    const { id } = useParams()
	const history = useHistory();

	React.useEffect(() => {
		PresentacionProductoService.getByIdAsync(id).then(x => {
			setFormData(last => ({...last, id: x.id, nombre: x.nombre,  observaciones: x.observaciones}))
			setOriginalCode(x.id)
		})
	}, [id])
    
	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, nombre_error: "" }));

		const { target } = e;

		const { name, details } = target;

		let validationFlag = true;
		let validationJson = {};

		if (!name.value) {
			validationFlag = false;
			validationJson = { ...validationJson, nombre_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData(last => ({...last, ...validationJson}))
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			Nombre: name.value,
			Observaciones: details.value,
		};

		toast.promise(
			PresentacionProductoService.EditAsync(json, originalCode),
			{
				pending: 'Editando la presentación de producto...',
				success: 'Presentación de producto editada con exito.',
				error: {
					render({data}){
					return (ERROR_CASES[data?.response?.data?.error] || "Error al editar la presentación de producto.")
				  }}
			}
		).then((x) => {
			history.push(getServerPath(PRESENTACION_PRODUCTO_PATH.index));
		});
	};

	return (
		<Section>
			<NavigationTitle name="Editar presentación de producto" path={getServerPath(PRESENTACION_PRODUCTO_PATH.index)} width_title='100%' width_children='0'/>
			<Form submitButtonClass="btn-success" submitButtonName="Guardar" handlerSubmit={handlerFormSubmit}>
				<div className="row mt-4">
					<div className="col-md-2">
						<label htmlFor="id" className="form-label">
							Id
						</label>
						<input
							id="id"
							name="id"
							type="text"
							className="form-control"
							placeholder="Id"
							autoComplete="off"
							maxLength={5}
							value={formData.id}
                            readOnly
                            disabled
						/>
					</div>
					<div className="col-md-10">
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
							onChange={e => setFormData(last => ({...last, nombre: e.target.value}))}
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
							value={formData.observaciones || ''}
							onChange={e => setFormData(last => ({...last, observaciones: e.target.value}))}/>
					</div>
				</div>
			</Form>
		</Section>
	);
};
