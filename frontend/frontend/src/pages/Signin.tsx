
import { SignUpRight } from "../components/SignUpRight"
import SignInFormProvider from "../components/SignInFormProvider"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


 const Signin = ()=>{
    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/blogs');
            return; 
        }
    },[])

    return (
        <>
        <div className=" grid lg:grid-cols-2 grid-cols-1 ">
            <div> 
                <span className="absolute w-screen text-center top-0 text-3xl font-bold border-white p-3 bg-blue-800 text-white">BlogIt</span>
                <SignInFormProvider/>
            </div>
            <div className="invisible lg:visible">    
            <SignUpRight/>
            </div>
        </div>
        
        </>
    )
}

export default Signin;