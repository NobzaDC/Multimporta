import { Form } from "components/global/Form/Index";
import { NavigationTitle } from "components/global/NavigationTitle/Index";
import { Section } from "components/global/Section/Index";
import { ORDEN_COMPRA_PATH, ERROR_CASES, REQUIRED_ERROR, CANTIDAD_CONTENEDORES } from "helpers/const/Index";
import { handlerCreateToast, TOAST_TYPES } from "helpers/createToast/Index";
import { getServerPath } from "helpers/getServerPath/GetServerPath";
import { handlerInputNumberKeyPress } from "helpers/InputNumberKeyPress/Index";
import React from "react";
import { useHistory } from "react-router-dom";
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
import { useLocation } from "react-router-dom";

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
	puero_destino: "",
	tiempo_produccion: "",
	trm_proyectada: "",
	condicion_pago: "",
	tipo_pago: "",
};

const FormHeaderSection = styled.ul`
	width: 100%;
	flex-direction: row;
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
	white-space: nowrap;
	justify-content: space-around;
	overflow: hidden;

	::-webkit-scrollbar {
		background-color: transparent;
		width: 0px;
	}
`;

const OrderDetailList = styled.ul`
	width: 100%;
	flex-direction: column;
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
	white-space: nowrap;
	justify-content: space-around;
	overflow: hidden;

	::-webkit-scrollbar {
		background-color: transparent;
		width: 0px;
	}
`;

const StyledOrderDetailItem = styled.div`
	width: 100%;
	padding: 20px !important;
	border: solid 1px gray;
	white-space: nowrap;
	overflow: hidden;
	text-align: center;
	border-radius: 13px;
`;

const Li = styled.li`
	box-sizing: border-box;
	padding: 30px 0;
	font-weight: bold;
	font-size: 1.3rem;
	transition: all 0.3s;
	color: ${(props) => (props.isActive === true ? Color.BLACK : "gray")};

	:hover {
		cursor: pointer;
		text-decoration: underline;
		font-size: 1.5rem;
		color: ${Color.BLACK};
	}
`;

const FormSection = styled.div`
	display: ${(props) => (props.isActive === true ? "block" : "none")};
`;

const ProductsFormSection = styled.div`
	padding: 30px 20px 10px 20px;
	width: 100%;
	border-radius: 13px;
	border: solid gray 1px;
	background-color: gainsboro;
`;

const OrderDetailItem = ({ data, products, handlerEditProduct, handlerDeleteProduct }) => {
	const { CodigoProducto, PrecioUnidad, Cantidad, NumeroLote, UniqueId } = data;

	const product = products.filter((x) => x.id === parseInt(CodigoProducto))[0];

	return (
		<StyledOrderDetailItem className="mt-4">
			<div className="row">
				<div className="col-md-3">
					<b>{product?.nombre || ""}</b>
				</div>
				<div className="col-md-2">Precio und: {handlerSetMoneyFormat(PrecioUnidad)}</div>
				<div className="col-md-2">Cantidad: {Cantidad}</div>
				<div className="col-md-2">Lote: #{NumeroLote}</div>
				<div className="col-md-3">
					<button className="btn btn-sm btn-primary" onClick={() => handlerEditProduct(data)}>
						<FontAwesomeIcon className="fa-pencil" color={Color.WHITE} /> Editar
					</button>{" "}
					|{" "}
					<button className="btn btn-sm btn-danger" onClick={() => handlerDeleteProduct(UniqueId)}>
						<FontAwesomeIcon className="fa-trash" color={Color.WHITE} /> Eliminar
					</button>
				</div>
			</div>
		</StyledOrderDetailItem>
	);
};

export const OrdenCompraCreate = () => {
	const [sectionState, setSectionState] = React.useState(true);
	const [ordenDetail, setOrdenDetail] = React.useState([]);

	const [lstProveedores, setProveedores] = React.useState([]);
	const [lstTerminoNegociacion, setTerminoNegociacion] = React.useState([]);
	const [lstPuertos, setPuertos] = React.useState([]);
	const [lstCondicionPago, setCondicionPago] = React.useState([]);
	const [lstProductos, setProductos] = React.useState([]);
	const [lstTipoPago, setTipoPago] = React.useState([]);
	const [lstPresentacionProducto, setPresentacionProducto] = React.useState([]);

	const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);

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

	React.useEffect(() => {
		ProveedorService.getAll().then(setProveedores);
		TerminoNegociacionService.getAll().then(setTerminoNegociacion);
		PuertoService.getAll().then(setPuertos);
		TipoPagoService.getAll().then(setTipoPago);
		CondicionPagoService.getAll().then(setCondicionPago);
		ProductoService.getAll().then(setProductos);
		PresentacionProductoService.getAll().then(setPresentacionProducto);
	}, []);

	React.useEffect(() => {
		if (origin)
			OrdenCompraService.getById(origin).then((response) => {
				const {
					codigoCondicionPago,
					codigoPuertoDestino,
					codigoPuertoOrigen,
					codigoTerminoNegociacion,
					codigoTipoPago,
					facturaProforma,
					numeroImportacion,
					proveedor,
					tiempoProduccion,
					trmProyectada,
				} = response;
				setFormData({
					terminos_negociacion: codigoTerminoNegociacion,
					numero_importacion: numeroImportacion,
					proveedor: proveedor,
					factura_proforma: facturaProforma,
					puerto_origen: codigoPuertoOrigen,
					puero_destino: codigoPuertoDestino,
					tiempo_produccion: tiempoProduccion,
					trm_proyectada: trmProyectada,
					condicion_pago: codigoCondicionPago,
					tipo_pago: codigoTipoPago,
				});

				setOrdenDetail(
					response.facordenDetalle.map((detail) => {
						return {
							UniqueId: Date.now(),
							CodigoProducto: detail.codigoProducto,
							NumeroLote: detail.numeroLote,
							Cantidad: detail.cantidad,
							CantidadContenedores: detail.cantidadContenedores,
							Gramaje: detail.gramaje,
							Ancho: detail.ancho,
							Alto: detail.alto,
							PrecioUnidad: detail.precioUnidad,
							IdPresentacionProducto: detail.idPresentacionProducto,
						};
					}),
				);
			});
	}, [origin]);

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
			FacordenDetalle: ordenDetail,
		};

		toast
			.promise(OrdenCompraService.Create(json), {
				pending: "Creando la orden de compra...",
				success: "Orden de compra creada con exito.",
				error: {
					render({ data }) {
						return ERROR_CASES[data?.response?.data?.error] || "Error al crear la orden de compra.";
					},
				},
			})
			.then((x) => {
				history.push(getServerPath(ORDEN_COMPRA_PATH.index));
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
				name={`${origin ? "Actulización" : "Nueva"} orden de compra ${origin ? `/ ${origin}` : ""}`}
				path={getServerPath(ORDEN_COMPRA_PATH.index)}
				width_title="100%"
				width_children="0%"
			/>
			<FormHeaderSection>
				<Li onClick={handlerChangeSectionState} isActive={sectionState}>
					Detalles
				</Li>
				<Li onClick={handlerChangeSectionState} isActive={!sectionState}>
					Productos
				</Li>
			</FormHeaderSection>
			<FormSection isActive={sectionState}>
				<Form submitButtonClass="btn-success" submitButtonName="Guardar" handlerSubmit={handlerFormSubmit}>
					<div className="row mt-4">
						<div className="col-md-4">
							<label htmlFor="importationNumber" className="form-label">
								Numero orden de compra
							</label>
							<input
								id="importationNumber"
								name="importationNumber"
								type="number"
								className="form-control"
								placeholder="Numero de importacion"
								autoComplete="off"
								onKeyPress={handlerInputNumberKeyPress}
								value={formData.numero_importacion}
								onChange={(e) =>
									setFormData((last) => ({
										...last,
										numero_importacion: e.target.value.substring(0, 15),
									}))
								}
							/>
							<span className="text-danger">{formData.numero_importacion_error}</span>
						</div>
						<div className="col-md-4">
							<label htmlFor="supplier" className="form-label">
								Proveedor
							</label>
							<select
								id="supplier"
								name="supplier"
								className="form-select"
								value={formData.proveedor}
								onChange={(e) => setFormData((last) => ({ ...last, proveedor: e.target.value }))}
							>
								<option value="">Seleccione</option>
								{lstProveedores.map((x) => (
									<option value={x.id} key={x.id}>
										{x.nombre}
									</option>
								))}
							</select>
							<span className="text-danger">{formData.proveedor_error}</span>
						</div>
						<div className="col-md-4">
							<label htmlFor="terms" className="form-label">
								Términos de negociación
							</label>
							<select
								id="terms"
								name="terms"
								className="form-select"
								value={formData.terminos_negociacion}
								onChange={(e) =>
									setFormData((last) => ({ ...last, terminos_negociacion: e.target.value }))
								}
							>
								<option value="">Seleccione</option>
								{lstTerminoNegociacion.map((x) => (
									<option value={x.codigo} key={x.codigo}>
										{x.nombre}
									</option>
								))}
							</select>
							<span className="text-danger">{formData.terminos_negociacion_error}</span>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-md-4">
							<label htmlFor="invoice" className="form-label">
								Factura proforma
							</label>
							<input
								id="invoice"
								name="invoice"
								type="text"
								className="form-control"
								placeholder="Factura proforma"
								autoComplete="off"
								maxLength={50}
								value={formData.factura_proforma}
								onChange={(e) => setFormData((last) => ({ ...last, factura_proforma: e.target.value }))}
							/>
							<span className="text-danger">{formData.factura_proforma_error}</span>
						</div>
						<div className="col-md-4">
							<label htmlFor="origin" className="form-label">
								Puerto origen
							</label>
							<select
								id="origin"
								name="origin"
								className="form-select"
								value={formData.puerto_origen}
								onChange={(e) => setFormData((last) => ({ ...last, puerto_origen: e.target.value }))}
							>
								<option value="">Seleccione</option>
								{lstPuertos.map((x) => (
									<option value={x.codigo} key={x.codigo}>
										{x.nombre}
									</option>
								))}
							</select>
						</div>
						<div className="col-md-4">
							<label htmlFor="destination" className="form-label">
								Puerto destinó
							</label>
							<select
								id="destination"
								name="destination"
								className="form-select"
								value={formData.puero_destino}
								onChange={(e) => setFormData((last) => ({ ...last, puero_destino: e.target.value }))}
							>
								<option value="">Seleccione</option>
								{lstPuertos.map((x) => (
									<option value={x.codigo} key={x.codigo}>
										{x.nombre}
									</option>
								))}
							</select>
							<span className="text-danger">{formData.puero_destino_error}</span>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-md-3">
							<label htmlFor="productionTime" className="form-label">
								Tiempo de producción [días]
							</label>
							<input
								id="productionTime"
								name="productionTime"
								type="number"
								className="form-control"
								placeholder="Dias"
								autoComplete="off"
								onKeyPress={handlerInputNumberKeyPress}
								value={formData.tiempo_produccion}
								onChange={(e) =>
									setFormData((last) => ({ ...last, tiempo_produccion: e.target.value }))
								}
							/>
						</div>
						<div className="col-md-3">
							<label htmlFor="trm" className="form-label">
								Trm proyectada
							</label>
							<input
								id="trm"
								name="trm"
								type="number"
								className="form-control"
								placeholder="Trm"
								autoComplete="off"
								onKeyPress={handlerInputNumberKeyPress}
								value={formData.trm_proyectada}
								onChange={(e) => setFormData((last) => ({ ...last, trm_proyectada: e.target.value }))}
							/>
							<span className="text-danger">{formData.trm_proyectada_error}</span>
						</div>
						<div className="col-md-3">
							<label htmlFor="paymentCondition" className="form-label">
								Condición de pago
							</label>
							<select
								id="paymentCondition"
								name="paymentCondition"
								className="form-select"
								value={formData.condicion_pago}
								onChange={(e) => setFormData((last) => ({ ...last, condicion_pago: e.target.value }))}
							>
								<option value="">Seleccione</option>
								{lstCondicionPago.map((x) => (
									<option value={x.codigo} key={x.codigo}>
										{x.nombre}
									</option>
								))}
							</select>
							<span className="text-danger">{formData.condicion_pago_error}</span>
						</div>
						<div className="col-md-3">
							<label htmlFor="paymentType" className="form-label">
								Tipo de pago
							</label>
							<select
								id="paymentType"
								name="paymentType"
								className="form-select"
								value={formData.tipo_pago}
								onChange={(e) => setFormData((last) => ({ ...last, tipo_pago: e.target.value }))}
							>
								<option value="">Seleccione</option>
								{lstTipoPago.map((x) => (
									<option value={x.codigo} key={x.codigo}>
										{x.nombre}
									</option>
								))}
							</select>
							<span className="text-danger">{formData.tipo_pago_error}</span>
						</div>
					</div>
				</Form>
			</FormSection>
			<FormSection isActive={!sectionState}>
				<ProductsFormSection>
					<form onSubmit={handlerAddProduct}>
						<div className="row mt-4">
							<div className="col-md-4">
								<label htmlFor="product" className="form-label">
									Producto
								</label>
								<select id="product" name="product" className="form-select" ref={productRef}>
									<option value="">Seleccione</option>
									{lstProductos.map((x) => (
										<option value={x.id} key={x.id}>
											{x.nombre}
										</option>
									))}
								</select>
								<span className="text-danger">{formData.product_error}</span>
							</div>
							<div className="col-md-2">
								<label htmlFor="lote" className="form-label">
									Lote
								</label>
								<input
									id="lote"
									name="lote"
									type="number"
									className="form-control"
									placeholder="Lote"
									ref={loteRef}
									value={1}
									disabled
									onKeyPress={handlerInputNumberKeyPress}
								/>
								<span className="text-danger">{formData.lote_error}</span>
							</div>
							<div className="col-md-2">
								<label htmlFor="amount" className="form-label">
									Cantidad
								</label>
								<input
									id="amount"
									name="amount"
									type="number"
									ref={amountRef}
									className="form-control"
									placeholder="Cantidad"
									onKeyPress={handlerInputNumberKeyPress}
								/>
								<span className="text-danger">{formData.cantidad_error}</span>
							</div>
							<div className="col-md-4">
								<label htmlFor="containers" className="form-label">
									Cantidad de contenedores
								</label>
								<select id="containers" name="containers" className="form-select" ref={containersRef}>
									<option value="">Seleccione</option>
									{CANTIDAD_CONTENEDORES.map((x) => (
										<option value={x.id} key={x.id}>
											{x.nombre}
										</option>
									))}
								</select>
								<span className="text-danger">{formData.contenedores_error}</span>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-md-2">
								<label htmlFor="grammage" className="form-label">
									Gramaje
								</label>
								<input
									id="grammage"
									name="grammage"
									ref={grammageRef}
									type="number"
									className="form-control"
									placeholder="Gramaje"
									onKeyPress={handlerInputNumberKeyPress}
								/>
								<span className="text-danger">{formData.gramaje_error}</span>
							</div>
							<div className="col-md-2">
								<label htmlFor="width" className="form-label">
									Ancho
								</label>
								<input
									id="width"
									name="width"
									ref={widthRef}
									type="number"
									className="form-control"
									placeholder="Ancho"
									onKeyPress={handlerInputNumberKeyPress}
								/>
								<span className="text-danger">{formData.ancho_error}</span>
							</div>
							<div className="col-md-2">
								<label htmlFor="heigth" className="form-label">
									Alto
								</label>
								<input
									id="heigth"
									name="heigth"
									ref={heigthRef}
									type="number"
									className="form-control"
									placeholder="Alto"
									onKeyPress={handlerInputNumberKeyPress}
								/>
								<span className="text-danger">{formData.heigth_error}</span>
							</div>
							<div className="col-md-3">
								<label htmlFor="price" className="form-label">
									Precio unidad
								</label>
								<input
									id="price"
									name="price"
									ref={priceRef}
									type="number"
									className="form-control"
									placeholder="Precio unidad"
									onKeyPress={handlerInputNumberKeyPress}
								/>
								<span className="text-danger">{formData.precio_error}</span>
							</div>
							<div className="col-md-3">
								<label htmlFor="presentation" className="form-label">
									Presentación del producto
								</label>
								<select
									id="presentation"
									name="presentation"
									className="form-select"
									ref={presentationRef}
								>
									<option value="">Seleccione</option>
									{lstPresentacionProducto.map((x) => (
										<option value={x.id} key={x.id}>
											{x.nombre}
										</option>
									))}
								</select>
								<span className="text-danger">{formData.presentacion_error}</span>
							</div>
						</div>
						<div className="modal-footer">
							<button className="btn btn-primary" type="submit">
								Agregar
							</button>
						</div>
					</form>
				</ProductsFormSection>
				<br />
				<OrderDetailList>
					{ordenDetail.map((x) => (
						<OrderDetailItem
							data={x}
							products={lstProductos}
							key={x.UniqueId}
							handlerEditProduct={handlerEditProduct}
							handlerDeleteProduct={handlerDeleteProduct}
						/>
					))}
				</OrderDetailList>
			</FormSection>
		</Section>
	);
};
