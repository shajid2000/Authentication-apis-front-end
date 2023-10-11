import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
useEffect(() => {
  const isTokenValid = async() => {
    const token = localStorage.getItem('token');
   
    if (token) {
      const apiUrl = `${process.env.REACT_APP_API_URL}users/userDetail`;
try{
      let response = await fetch(apiUrl,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const result = await response.json();
    
      if (response.ok) {
        
        setData(result.userDetail);
        return;
      } else {
        toast.error(result.msg, {
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
      toast.error('something went wrong', {
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

   
    }
    else{
      navigate('/auth');
      return
    }

    setTimeout(()=>{
      navigate('/auth');
     },2000)
  }
  

isTokenValid()

}, [])


const logOut = ()=>{
  localStorage.clear("token")
  navigate("/auth")
}
  return (
    <>
      <h2>Home <p>Access a world of Possibilities</p></h2>
      <div className={"container"} id="container">
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
            <h1>User Detail</h1>
            <div className="social-container">
              <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <input
          type="text"
          placeholder="Name"
          name="name"
    
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
       
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
     
        />
            <button type='button'>Sign Up</button>
  </form>
        </div>
        <div className="form-container sign-in-container">
        <form action="#">
            <h1>{data && data.name}</h1>
            <div className="social-container">
              <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            {/* <span>User Detail</span> */}
            {/* <input type="email" placeholder="Email" name='email'  /> */}
            <h4>{data && data.email}</h4>
            <h4>{data && data.location}</h4>
        
            </form>  
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Explorer!</h1>
              <p>{data && data.description}</p>
              <button className="ghost" id="signUp" onClick={logOut}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
