import CheckLogin from "@/Components/Auth Components/CheckLogin";
import LoginForm from "@/Components/Auth Components/LoginForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLogin, setLogoutSuccess } from "@/auth/action";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { HashLoader } from "react-spinners";
import { Typography } from "@mui/material";

function Login() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { loading, isLoggedIn, data, error } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isLoggedIn) {
			toast.success("Login Success")
			router.replace("/");
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (error) {			
			dispatch(setLogoutSuccess());
			toast.error("Could not sign in some error occured!",{position:"top-right"})
			router.replace("/login")
		}
	}, [error]);

	const [credentials, setCredentials] = useState({
		Username: "",
		Password: "",		
	});

	const handleChangeUsername = (e) => {
		setCredentials({ ...credentials, Username: e.target.value });
	};
	const handleChangePassword = (e) => {
		setCredentials({ ...credentials, Password: e.target.value });
	};

	const handleSubmitForm = (e) => {		
		e.preventDefault();
		dispatch(callLogin(credentials));		
		setCredentials({ Username: "", Password: ""});
	};

	return (
		<div>
			<CheckLogin/>
			<ToastContainer/>
			{loading ? (
				<HashLoader
				color="#36d7b7"				
				size={100}				
				style={{
					display:"flex",
					alignItems:"center",
					justifyContent:"center",
					verticalAlign:"center",							
				}}				
			  />			  
			) : (
				<LoginForm
					username={credentials.Username}
					password={credentials.Password}					
					handleChangeUsername={handleChangeUsername}
					handleChangePassword={handleChangePassword}					
					handleSubmitForm={handleSubmitForm}					
				/>
			)}
		</div>
	);
}

export default Login;
