import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function Login({ divClasses, handleSignup, handleSignin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formData1, setFormData1] = useState({
    email: '',
    password: '',
  });

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };
  
  const handleSign = async(e)=>{
   
    e.preventDefault();

    const { name, email, password } = formData;

    const apiUrl = `${process.env.REACT_APP_API_URL}auth/register`;
    
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      let res = await response.json()
      if (response.ok) {
      
        console.log(res)
        localStorage.setItem("token",res.user.token)
        console.log('resgister successful');
      toast.success('register successful', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setTimeout(()=>{
          navigate("/")
        },3000)
      } else {
         toast.error(res.msg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  }

  const handleRegister = async(e)=>{
    e.preventDefault();

    const { email, password } = formData1;

    const apiUrl = `${process.env.REACT_APP_API_URL}auth/login`;

  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password }),
      });
      let res = await response.json()
      if (response.ok) {
      
        console.log(res)
        localStorage.setItem("token",res.user.token)
        toast.success('Login successful', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setTimeout(()=>{
            navigate("/")
          },3000)
      } else {
        toast.error(res.msg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  }
  return (
    <>
      <h2>Member Access <p>Access a world of Possibilities</p></h2>
      <div className={divClasses} id="container">
      <ToastContainer
position="top-right"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
        <div className="form-container sign-up-container">
        <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a  className="social"><i className="fab fa-facebook-f"></i></a>
              <a  className="social"><i className="fab fa-google-plus-g"></i></a>
              <a  className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
            <button type='button' onClick={handleSign}>Sign Up</button>
  </form>
        </div>
        <div className="form-container sign-in-container">
        <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a  className="social"><i className="fab fa-facebook-f"></i></a>
              <a  className="social"><i className="fab fa-google-plus-g"></i></a>
              <a  className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" name='email'   value={formData1.email}
          onChange={handleInputChange1} />
            <input type="password" placeholder="Password" name='password'   value={formData1.password}
          onChange={handleInputChange1} />
            <button type='button' onClick={handleRegister}>Sign In</button>
            </form>  
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={handleSignin}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Explorer!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignup}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
