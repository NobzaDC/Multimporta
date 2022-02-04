export const getDigitoDian = (nitParam) => {
	let arreglo, x, y, z, i, nit1, dv1;
	nit1 = nitParam;
	if (isNaN(nit1)) return "";
	else {
		arreglo = new Array(16);
		x = 0;
		y = 0;
		z = nit1.length;
		arreglo[1] = 3;
		arreglo[2] = 7;
		arreglo[3] = 13;
		arreglo[4] = 17;
		arreglo[5] = 19;
		arreglo[6] = 23;
		arreglo[7] = 29;
		arreglo[8] = 37;
		arreglo[9] = 41;
		arreglo[10] = 43;
		arreglo[11] = 47;
		arreglo[12] = 53;
		arreglo[13] = 59;
		arreglo[14] = 67;
		arreglo[15] = 71;
		for (i = 0; i < z; i++) {
			y = nit1.substr(i, 1);
			x += y * arreglo[z - i];
		}
		y = x % 11;
		if (y > 1) {
			dv1 = 11 - y;
		} else {
			dv1 = y;
		}
		return dv1;
	}
};