
import AdminSignInProvider from "../components/AdminSignInProvider"

const Signin = ()=>{
    return (
        <>
        
            <div> 
                <span className="absolute w-screen text-center top-0 text-3xl font-bold border-white p-3 bg-blue-800 text-white">BlogIt</span>
                <AdminSignInProvider/>
            </div>
           
        
        
        </>
    )
}

export default Signin;