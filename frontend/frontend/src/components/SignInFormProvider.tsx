import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL }  from "../config";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignInFormProvider = () => {
  
  const navigate = useNavigate();
  
    const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const buttonStyle = {
    backgroundColor: 'rgb(58, 103, 179)',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  };

  async function sendRequest() {
    try {
        const url =  `${BACKEND_URL}/api/v1/user/signin`;

      
      const response = await axios.post(url, signInData);
  
      if (response.status === 200) {
        const jwt =  response.data.jwt;
       
        localStorage.setItem("token", jwt);
        navigate("/blogs");
      } else {
        throw new Error("Unexpected response status: " + response.status);
        
      }
    } catch (error) {
      
      alert("Incorrect Inputs");
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center flex-col items-center">
          <div className="text-3xl font-extrabold">Sign In</div>
          <div>
            Don't have an account? <Link className="underline" to="/signup">SignUp</Link>
          </div>
        </div>

        <div className="flex justify-center flex-col items-center mt-3">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={signInData.email}
              onChange={handleChange}
              className="bg-blue-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 block p-2.5 mt-5"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleChange}
              className="bg-blue-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 block p-2.5 mt-5"
              required
            />
          </div>

          <button
            type="submit" onClick={sendRequest}
            style={buttonStyle}
            className="rounded-lg focus:outline-none focus:shadow-outline mt-9 w-80"
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInFormProvider;
