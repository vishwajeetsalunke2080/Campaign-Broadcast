import { setLogoutSuccess } from "@/auth/action";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const logout = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    
    const { loading, isLoggedIn, data, error } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if(isLoggedIn){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            dispatch(setLogoutSuccess());            
            router.replace("/")
        }    
    }, [isLoggedIn]);

}
 
export default logout;