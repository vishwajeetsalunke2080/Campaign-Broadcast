import { setLogoutSuccess } from "@/auth/action";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

let headers = { "Content-Type": "application/json" };
const AxiosInstance = axios.create({
	baseURL: process.env.API_PATH,
	headers,
});

function AxiosInterceptor({ children }) {
	const dispatch = useDispatch();	
	useEffect(() => {
		const resInterceptor = (response) => {			
			return response;
		};
		const errInterceptor = (error) => {			
			if (error.response.status === 401) {
				localStorage.removeItem("accessToken");
				dispatch(setLogoutSuccess());
			}
			return Promise.reject(error);
		};
		const interceptor = AxiosInstance.interceptors.response.use(
			resInterceptor,
			errInterceptor
		);
		return () => AxiosInstance.interceptors.response.eject(interceptor);
	}, []);
	return children;
}

AxiosInstance.interceptors.request.use((config) => {
	if (localStorage.getItem("accessToken")) {
		const accessToken = localStorage.getItem("accessToken");
		{
			config.headers["Authorization"] = "Bearer " + accessToken;
		}
		
		if (config.params) {
			config.params = {
				...config.params,
			};
		}
	}		
	return config;
});

export default AxiosInstance;
export { AxiosInterceptor };
