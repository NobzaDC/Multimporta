import axios from "axios";
import { BASE_URL, USER_LOCAL_STORAGE_STRING } from "helpers/const/Index";

export const getAll = () => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const URL = `${BASE_URL}/V1/Paises/GetAll/${empresa}`;

	return axios
		.get(URL, config)
		.then(({data}) => {
			return data;
		})
};

export const getById = (id) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Paises/GetById/${empresa}/${id}`;

	return axios
		.get(URL, config)
		.then(({data}) => {
			return data;
		})
}

export const Create = (json) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Paises/Create/${empresa}`;

	return axios
		.post(URL, json, config)
		.then(({data}) => {
			return data;
		})
}

export const Edit = (json, code) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Paises/Edit/${empresa}/${code}`;

	return axios
		.put(URL, json, config)
		.then(({data}) => {
			return data;
		})
}

export const Delete = (code) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Paises/Delete/${empresa}/${code}`;

	return axios
		.delete(URL, config)
		.then(({data}) => {
			return data;
		})
}
