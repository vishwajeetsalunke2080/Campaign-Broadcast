import { Provider, useSelector, useStore } from "react-redux";
import { wrapper } from "./store";
import { AxiosInterceptor } from "@/configs/axiosConfig";
import Navbar from "@/Components/Nav Components/Navbar";
import CheckLogin from "@/Components/Auth Components/CheckLogin";
import { useState } from "react";
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  const store = useStore();
  const { loading, isLoggedIn, user, error } = useSelector(
    (state) => state.auth
  );

  const [currentTab, setCurrentTab] = useState("");

  return (
    <Provider store={store}>
      <AxiosInterceptor>
        <CheckLogin />        
        <Component {...pageProps} />
      </AxiosInterceptor>
    </Provider>
  );
}

export default wrapper.withRedux(App);
