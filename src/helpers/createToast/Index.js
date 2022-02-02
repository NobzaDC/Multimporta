import { toast } from "react-toastify";

const toastMaker = {
	success: (message, config) => {
		toast.success(message, config);
	},
	error: (message, config) => {
		toast.error(message, config);
	},
    warning: (message, config) => {
		toast.warning(message, config);
    },
	default: (message, config) => {
		toast(message, config);
	},
};


export const TOAST_TYPES = {success: 'success', error: 'error', warning: 'warning'};


export const handlerCreateToast = ({ message, type = null, config = {} }) => {
	if (!message) throw new Error(`${typeof message} is not valid`);

	toastMaker[type || "default"](message, config);
};
