import AxiosInstance from "@/configs/axiosConfig";


const login = async (info) => {
	try {
		const obj = info.payload;
		let data = JSON.stringify({
			Username: obj.Username,
			Password: obj.Password,			
		});
		
        const res = await AxiosInstance.post("login", data, {
			method: "POST",
		});		
		return res;

	} catch (error) {		
		return error;
	}
};

export default login;
