import styled from "styled-components";
import * as Color from "helpers/colorPalette/Index";
import React from "react";
import { USER_LOCAL_STORAGE_STRING } from "helpers/const/Index";
import * as UserService from "services/V1/Usuarios/Index";
import { handlerAddDays } from "helpers/addDays/Index";
import { handlerSetMoneyFormat } from "helpers/moneyFormat/Index";

const Container = styled.div`
	border: ${props => props.no_border === true ? '1px' : '0'}1px solid ${Color.PRIMARY};
	text-align: center;
	padding: 8px 10px;
`;

const HeaderTitle = styled.div`
	display: flex;
	color: darkred;
	font-weight: 500;
	justify-content: center;
	align-items: center;
`;

const THead = styled.thead`
	color: ${Color.WHITE};
	background: ${Color.DARK_PRIMARY};
`;

const TBody = styled.tbody`

    td{
        border: solid 1px ${Color.DARK_PRIMARY};
    }
`

const MasterPrintableContainer = styled.div`
    display: ${props => props.display || 'none' };
`

export const PrintablePurchaseOrder = ({
	date = Date.now(),
	orderNumber = 0,
	orderId,
	supplier,
	paymentType,
	productionTime = 0,
	origin,
	destiny,
    details,
	ordenDetail = [],
    lstProducts = [],
    display,
    printableId
}) => {
	const [user, setUser] = React.useState({});
	const { codigo } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));

	React.useEffect(() => {
		UserService.getById(codigo).then(setUser);
	}, [codigo, setUser]);

	const mDate = new Date(date);
	const deliveryTime = handlerAddDays(
		mDate,
		parseInt(productionTime || 0) + parseInt(origin?.tiempoTransitoDias || 0),
	);

    let subtotal = 0

    ordenDetail.forEach(x => {
        subtotal += (x.PrecioUnidad * x.Cantidad)
    })

	return (
		<MasterPrintableContainer display={display} id={printableId}>
			<div className="row">
				<div className="col-md-6">
					<div className="row">
						<Container className="col-md-2">
							<h5>
								<b>DIA</b>
							</h5>
							{mDate.getDate()}
						</Container>
						<Container className="col-md-3">
							<h5>
								<b>MES</b>
							</h5>
							{mDate.getMonth() + 1}
						</Container>
						<Container className="col-md-3">
							<h5>
								<b>AÑO</b>
							</h5>
							{mDate.getFullYear()}
						</Container>
						<Container className="col-md-4">
							<h5>
								<b>HORA</b>
							</h5>
							{`${mDate.getHours()} : ${mDate.getMinutes()} : ${mDate.getSeconds()}`}
						</Container>
					</div>
				</div>
				<HeaderTitle className="col-md-3">
					<h2>OC N° {orderNumber}</h2>
				</HeaderTitle>
				<HeaderTitle className="col-md-3">
					<h2>Pedido N° {orderId}</h2>
				</HeaderTitle>
			</div>
			<div className="row">
				<Container className="mt-3">
					<div className="row">
						<div className="col-md-2">
							<b>NIT:</b>
						</div>
						<div className="col-md-4">{supplier?.nit}</div>
						<div className="col-md-2"></div>
						<div className="col-md-4"></div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<b>PROVEEDOR:</b>
						</div>
						<div className="col-md-4">{supplier?.nombre}</div>
						<div className="col-md-2">
							<b>ASESOR:</b>
						</div>
						<div className="col-md-4">{`${user?.nombre} ${user?.apellido}`}</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<b>DIRECCIÓN ENTREGA: </b>
						</div>
						<div className="col-md-4"></div>
						<div className="col-md-2">
							<b>TELÉFONO / CELULAR: </b>
						</div>
						<div className="col-md-4"></div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<b>FORMA DE PAGO:</b>
						</div>
						<div className="col-md-4">{`${paymentType?.nombre || "SIN DEFINIR"} - ${
							productionTime || 0
						} días`}</div>
						<div className="col-md-2">
							<b>FECHA DE ENTREGA: </b>
						</div>
						<div className="col-md-4">{`${deliveryTime.getDate()} / ${
							deliveryTime.getMonth() + 1
						} / ${deliveryTime.getFullYear()}`}</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<b>PUERTO EMBARQUE:</b>
						</div>
						<div className="col-md-4">{origin?.nombre}</div>
						<div className="col-md-2">
							<b>PUERTO DESTINO:</b>
						</div>
						<div className="col-md-4">{destiny?.nombre}</div>
					</div>
				</Container>
			</div>
			<div className="row">
				<Container className="mt-2">
					<table>
						<THead>
							<tr>
								<th>CÓDIGO</th>
								<th>MATERIAL</th>
								<th>U. EMP</th>
								<th>CANT</th>
								<th>V/R UNID</th>
								<th>V/R TOTAL</th>
							</tr>
						</THead>
						<TBody>
							{ordenDetail.map((x) => {
								return (
									<tr key={x.CodigoProducto}>
										<td>{x.CodigoProducto}</td>
										<td>{lstProducts.filter(y => y.codigo === x.CodigoProducto)[0]?.nombre}</td>
										<td></td>
										<td>{x.Cantidad}</td>
										<td>{handlerSetMoneyFormat(x.PrecioUnidad)}</td>
										<td>{handlerSetMoneyFormat(parseInt(x.Cantidad) * parseInt(x.PrecioUnidad))}</td>
									</tr>
								);
							})}
						</TBody>
					</table>
				</Container>
			</div>
            <div className="row mt-2">
                <Container className="col-md-6">
                    <h4>OBSERVACIONES</h4>
                    <p>{details || 'SIN OBSERVACIONES'}</p>
                </Container>
                <Container className="col-md-6" no_border={true}>
                    <div className="row">
                        <div className="col-md-4"><b>SUBTOTAL:</b></div>
                        <div className="col-md-8">{handlerSetMoneyFormat(subtotal)}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"><b>DESCUENTO:</b></div>
                        <div className="col-md-8">{handlerSetMoneyFormat(0)}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"><b>TOTAL:</b></div>
                        <div className="col-md-8">{handlerSetMoneyFormat(subtotal)}</div>
                    </div>
                </Container>
            </div>
            <Container className="row mt-2">
                <div className="col-md-2">
                    <b>APROBADOR POR:</b>
                </div>
            </Container>
		</MasterPrintableContainer>
	);
};
