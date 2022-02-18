import axios from "axios";
import { BASE_URL, USER_LOCAL_STORAGE_STRING } from "helpers/const/Index";

export const getAllAsync = () => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Ciudades/GetAll/${empresa}`;

	return axios
		.get(URL, config)
		.then(({data}) => {
			return data;
		})
};

export const getByIdAsync = (id) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Ciudades/GetById/${empresa}/${id}`;

	return axios
		.get(URL, config)
		.then(({data}) => {
			return data;
		})
}

export const CreateAsync = (json) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Ciudades/Create/${empresa}`;

	return axios
		.post(URL, json, config)
		.then(({data}) => {
			return data;
		})
}

export const EditAsync = (json, code) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Ciudades/Edit/${empresa}/${code}`;

	return axios
		.put(URL, json, config)
		.then(({data}) => {
			return data;
		})
}

export const DeleteAsync = (code) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));
	const empresa = "mEmpresa"

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Ciudades/Delete/${empresa}/${code}`;

	return axios
		.delete(URL, config)
		.then(({data}) => {
			return data;
		})
}
