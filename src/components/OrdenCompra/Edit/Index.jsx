import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { CONDICION_PAGO_PATH, ERROR_CASES, REQUIRED_ERROR } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { handlerInputNumberKeyPress } from "helpers/InputNumberKeyPress/Index";
import React from "react";
import { useLocation } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as CondicionPagoService from "services/V1/CondicionPago/Index";

import * as ProveedorService from "services/V1/Proveedor/Index";
import * as TerminoNegociacionService from "services/V1/TerminoNegociacion/Index";
import * as PuertoService from "services/V1/Puerto/Index";
import * as TipoPagoService from "services/V1/TipoPago/Index";
import * as ProductoService from "services/V1/Producto/Index";
import * as PresentacionProductoService from "services/V1/PresentacionProducto/Index";
import * as OrdenCompraService from "services/V1/OrdenCompra/Index";
import * as Color from "helpers/colorPalette/Index";
import styled from "styled-components";
import { handlerSetMoneyFormat } from "helpers/moneyFormat/Index";
import { FontAwesomeIcon } from "components/global/FontAwesomeIcon/Index";
import { PrintablePurchaseOrder } from "components/global/PrintablePurchaseOrder/Index";
import { Modal } from "components/global/Modal/Index";
const DEFAULT_FORM_DATA = {
	codigo: "",
	codigo_error: "",
	nombre: "",
	nombre_error: "",
	catidad_dias: "",
	cantidad_dias_error: "",
	observaciones: "",
	numero_importacion_error: "",
	proveedor_error: "",
	terminos_negociacion: "",
	factura_proforma_error: "",
	puero_destino_error: "",
	trm_proyectada_error: "",
	condicion_pago_error: "",
	tipo_pago_error: "",
	numero_importacion: "",
	proveedor: "",
	factura_proforma: "",
	puerto_origen: "",
	puerto_destino: "",
	tiempo_produccion: "",
	trm_proyectada: "",
	condicion_pago: "",
	tipo_pago: "",
};

export const CondicionPagoEdit = () => {
	const [detailModal, setDetailModal] = React.useState(false);
	const [sectionState, setSectionState] = React.useState(true);
	const [ordenDetail, setOrdenDetail] = React.useState([]);
	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);
	const [originalCode, setOriginalCode] = React.useState("");

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();

	const params = new URLSearchParams(location.search);
	const origin = params.get("origin");

	const productRef = React.useRef();
	const loteRef = React.useRef();
	const amountRef = React.useRef();
	const containersRef = React.useRef();
	const grammageRef = React.useRef();
	const widthRef = React.useRef();
	const heigthRef = React.useRef();
	const priceRef = React.useRef();
	const presentationRef = React.useRef();

	const handlerChangeSectionState = () => {
		setSectionState((last) => !last);
	};

	const handlerChangeDetailModal = () => {
		setDetailModal((last) => !last);
	};

	React.useEffect(() => {
		CondicionPagoService.getById(id).then((x) => {
			setFormData((last) => ({
				...last,
				codigo: x.codigo,
				nombre: x.nombre,
				catidad_dias: x.cantidadDias,
				observaciones: x.observacion,
			}));
			setOriginalCode(x.codigo);
		});
	}, [id]);

	const handlerFormSubmit = (e) => {
		e.preventDefault();
		setFormData((last) => ({ ...last, codigo_error: "", nombre_error: "", cantidad_dias_error: "" }));

		const { target } = e;

		const {
			importationNumber,
			supplier,
			terms,
			invoice,
			origin,
			destination,
			productionTime,
			trm,
			paymentCondition,
			paymentType,
			details,
		} = target;

		let validationFlag = true;
		let validationJson = {};

		if (!importationNumber.value) {
			validationFlag = false;
			validationJson = { ...validationJson, numero_importacion_error: REQUIRED_ERROR };
		}

		if (!supplier.value) {
			validationFlag = false;
			validationJson = { ...validationJson, proveedor_error: REQUIRED_ERROR };
		}

		if (!terms.value) {
			validationFlag = false;
			validationJson = { ...validationJson, terminos_negociacion: REQUIRED_ERROR };
		}

		if (!invoice.value) {
			validationFlag = false;
			validationJson = { ...validationJson, factura_proforma_error: REQUIRED_ERROR };
		}

		if (!destination.value) {
			validationFlag = false;
			validationJson = { ...validationJson, puero_destino_error: REQUIRED_ERROR };
		}

		if (!trm.value) {
			validationFlag = false;
			validationJson = { ...validationJson, trm_proyectada_error: REQUIRED_ERROR };
		}

		if (!paymentCondition.value) {
			validationFlag = false;
			validationJson = { ...validationJson, condicion_pago_error: REQUIRED_ERROR };
		}

		if (!paymentType.value) {
			validationFlag = false;
			validationJson = { ...validationJson, tipo_pago_error: REQUIRED_ERROR };
		}

		if (!validationFlag) {
			setFormData((last) => ({ ...last, ...validationJson }));
			handlerCreateToast({ message: "Debe llenar todos los campos requeridos.", type: TOAST_TYPES.warning });
			return;
		}

		if (ordenDetail.length === 0) {
			handlerChangeSectionState();
			handlerCreateToast({ message: "Debe seleccionar almenos un producto.", type: TOAST_TYPES.warning });
			return;
		}

		const json = {
			NumeroImportacion: importationNumber.value,
			Proveedor: supplier.value || null,
			CodigoTerminoNegociacion: terms.value || null,
			FacturaProforma: invoice.value,
			CodigoPuertoOrigen: origin.value || null,
			CodigoPuertoDestino: destination.value || null,
			TiempoProduccion: productionTime.value,
			TrmProyectada: trm.value,
			CodigoCondicionPago: paymentCondition.value || null,
			CodigoTipoPago: paymentType.value || null,
			Observaciones: details.value,
			FacordenDetalle: ordenDetail,
		};

		toast
			.promise(CondicionPagoService.Edit(json, originalCode), {
				pending: "Editando la condición de pago...",
				success: "Condición de pago editada con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al editar la condición de pago.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(CONDICION_PAGO_PATH.index));
			});
	};

	const handlerAddProduct = (e) => {
		e.preventDefault();

		const { target } = e;
		const { product, lote, amount, containers, grammage, width, heigth, price, presentation } = target;

		if (
			!product.value ||
			!lote.value ||
			!amount.value ||
			!containers.value ||
			!grammage.value ||
			!width.value ||
			!heigth.value ||
			!price.value ||
			!presentation.value
		)
			return handlerCreateToast({ message: "Todos los campos son requeridos", type: TOAST_TYPES.error });

		const json = {
			UniqueId: Date.now(),
			CodigoProducto: product.value,
			NumeroLote: lote.value,
			Cantidad: amount.value,
			CantidadContenedores: containers.value,
			Gramaje: grammage.value,
			Ancho: width.value,
			Alto: heigth.value,
			PrecioUnidad: price.value,
			IdPresentacionProducto: presentation.value,
		};

		setOrdenDetail((last) => [json, ...last]);

		product.value = "";
		lote.value = "";
		amount.value = "";
		containers.value = "";
		grammage.value = "";
		width.value = "";
		heigth.value = "";
		price.value = "";
		presentation.value = "";
	};

	const handlerEditProduct = (json) => {
		const {
			Alto,
			Ancho,
			Cantidad,
			CantidadContenedores,
			CodigoProducto,
			Gramaje,
			IdPresentacionProducto,
			NumeroLote,
			PrecioUnidad,
			UniqueId,
		} = json;

		productRef.current.value = parseInt(CodigoProducto);
		loteRef.current.value = parseInt(NumeroLote);
		amountRef.current.value = parseInt(Cantidad);
		containersRef.current.value = CantidadContenedores;
		grammageRef.current.value = parseInt(Gramaje);
		widthRef.current.value = parseInt(Ancho);
		heigthRef.current.value = parseInt(Alto);
		priceRef.current.value = parseInt(PrecioUnidad);
		presentationRef.current.value = parseInt(IdPresentacionProducto);

		productRef.current.focus();

		setOrdenDetail((last) => last.filter((x) => x.UniqueId !== UniqueId));
	};

	const handlerDeleteProduct = (id) => {
		setOrdenDetail((last) => last.filter((x) => x.UniqueId !== id));
	};

	return (
		<Section>
			<NavigationTitle
				name="Editar condición de pago"
				path={getServerPath(CONDICION_PAGO_PATH.index)}
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
							maxLength={50}
							value={formData.nombre}
							onChange={(e) => setFormData((last) => ({ ...last, nombre: e.target.value }))}
						/>
						<span className="text-danger">{formData.nombre_error}</span>
					</div>
					<div className="col-md-4">
						<label htmlFor="days" className="form-label">
							Cantidad de días
						</label>
						<input
							id="days"
							name="days"
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Cantidad de días"
							maxLength={50}
							value={formData.catidad_dias}
							onKeyPress={handlerInputNumberKeyPress}
							onChange={(e) => setFormData((last) => ({ ...last, catidad_dias: e.target.value }))}
						/>
						<span className="text-danger">{formData.catidad_dias_error}</span>
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
							value={formData.observaciones || ""}
							onChange={(e) => setFormData((last) => ({ ...last, observaciones: e.target.value }))}
						/>
					</div>
				</div>
			</Form>
		</Section>
	);
};
