
import { SignUpRight } from "../components/SignUpRight"
import SignUpFormProvider from "../components/SignUpFormProvider"

 const Signup = ()=>{
    return (
        <>
        <div className=" grid lg:grid-cols-2 grid-cols-1 ">
            <div> 
            <span className="absolute w-screen text-center top-0 text-3xl font-bold border-white p-3 bg-blue-800 text-white">BlogIt</span>
                <SignUpFormProvider/>
            </div>
            <div className="invisible lg:visible">    
            <SignUpRight/>
            </div>
        </div>
        
        </>
    )
}

export default Signup;