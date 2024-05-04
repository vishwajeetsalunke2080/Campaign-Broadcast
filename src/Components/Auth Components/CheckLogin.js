import { setLogin } from "@/auth/action";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CheckLogin() {
	const { isLoggedIn, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();
	const [bool, setBool] = useState();

	
	useEffect(() => {
		if (!isLoggedIn && bool) {
			router.push("/login");			
		}
	}, [isLoggedIn]);

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const userData = localStorage.getItem("username");		
		if (accessToken) {
			const valid = true;
			if (valid) {
				setBool(true);
				dispatch(setLogin(userData));
			}
		} else {
			router.push("/login");
		}
	}, []);
}

export default CheckLogin;
