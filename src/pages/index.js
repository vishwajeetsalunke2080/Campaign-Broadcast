import CheckLogin from "@/Components/Auth Components/CheckLogin";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./login";
import Navbar from "@/Components/Nav Components/Navbar";

function Home() { 

  return (
    <div>
      <CheckLogin />
      <Navbar />
    </div>
  );
}

export default Home;
