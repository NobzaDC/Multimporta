export const DEVELOPER_MODE = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const SERVER_BASE_URL = "/Multimporta";

export const getServerPath = (path) => {
	if (DEVELOPER_MODE) return path;

	return SERVER_BASE_URL + path;
};
