import axios from "axios";
import { BASE_URL } from "helpers/const/Index";

export const getAllAsync = () => {
	// const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };
	const URL = `${BASE_URL}/V1/PresentacionProductos/GetAll/${empresa}`;

	return axios
		.get(URL)
		.then(({data}) => {
			return data;
		})
};

export const getByIdAsync = (id) => {
	// const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };

	const URL = `${BASE_URL}/V1/PresentacionProductos/GetById/${empresa}/${id}`;

	return axios
		.get(URL)
		.then(({data}) => {
			return data;
		})
}

export const CreateAsync = (json) => {
	// const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };

	const URL = `${BASE_URL}/V1/PresentacionProductos/Create/${empresa}`;

	return axios
		.post(URL, json)
		.then(({data}) => {
			return data;
		})
}

export const EditAsync = (json, code) => {
	// const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };

	const URL = `${BASE_URL}/V1/PresentacionProductos/Edit/${empresa}/${code}`;

	return axios
		.put(URL, json)
		.then(({data}) => {
			return data;
		})
}

export const DeleteAsync = (code) => {
	// const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };

	const URL = `${BASE_URL}/V1/PresentacionProductos/Delete/${empresa}/${code}`;

	return axios
		.delete(URL)
		.then(({data}) => {
			return data;
		})
}