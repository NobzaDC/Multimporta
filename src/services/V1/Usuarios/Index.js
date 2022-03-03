import axios from "axios";
import { BASE_URL, USER_LOCAL_STORAGE_STRING } from "helpers/const/Index";

export const RegisterUser = (model) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const mModel = {
		user: model,
		enterprises: []
	}

	console.log(mModel)

	const URL = `${BASE_URL}/V1/Usuarios/Register`;
	
	return axios
		.post(URL, mModel, config)
		.then(({data}) => {
			return data;
		})
};

export const LoginUser = (model) => {

	const URL = `${BASE_URL}/V1/Usuarios/Login`;

	return axios
		.post(URL, model)
		.then(({data}) => {
			return data;
		})
}

export const getAll = () => {
	const { token, codigo } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const URL = `${BASE_URL}/V1/Usuarios/GetAll`;

	return axios
		.get(URL, config)
		.then(({data}) => {
			return data.filter(x => x.codigo !== codigo);
		})
};

export const getById = (id) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Usuarios/GetById/${id}`;

	return axios
		.get(URL, config)
		.then(({data}) => {
			return data;
		})
};

export const Edit = (json, code) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Usuarios/Edit/${code}`;

	return axios
		.put(URL, json, config)
		.then(({data}) => {
			return data;
		})
}

export const Toggle = (json) => {
	const { token } = JSON.parse(window.localStorage.getItem(USER_LOCAL_STORAGE_STRING));

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const URL = `${BASE_URL}/V1/Usuarios/ChangeState`;

	return axios
		.post(URL, json, config)
		.then(({data}) => {
			return data;
		})
}