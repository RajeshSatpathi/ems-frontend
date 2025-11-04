import React, { useState } from 'react'
import bgImage from '../../assets/loginbg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../mycontext/AuthContext.jsx';
function index() {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate()
    //contextapi
    const { login } = useAuth()

    //login api call function 
    const LoginApiCall = async () => {
        try {
            const url = "http://localhost:8000/api/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            if (!response.ok) {
                // Handle non-2xx status codes
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }
            const data = await response.json();
            // return data;
            // console.log(data);
            //set the token into localstorage
            localStorage.setItem("token", data.token)
            toast("Login Successfull");

            //setdata into authcontext 

            login(data.user);
            
            setTimeout(() => {
                window.location.href ="/admin-dashboard"
            }, 1000);

        } catch (error) {
            toast("Login error:");
            return { error: error.message };
        }
    }
    //handlesubmit and api call
    const handlesubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast("All fileds are require")
        }
        else {
            LoginApiCall()
        }
    }

    return (
        <div className='w-full h-screen  bg-center bg-cover
     flex justify-center items-center
    '
            style={{ backgroundImage: `url(${bgImage})` }}
        >

            <div className='w-90 h-100 rounded shadow-xl bg-gray-200 flex justify-center items-center'>
                <form action="" onSubmit={handlesubmit}>
                    <div className='text-center'>
                        <h2 className='text-center text-xl font-bold shadow-2xl'>EMS ADMIN LOGIN </h2>
                        <span className='text-sm'>Version 1.0</span>
                    </div><br />
                    <div>
                        <input type="text"
                            className='border-b border-gray-400 p-1.5 w-60 my-4 outline-none'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="text"
                            className='border-b border-gray-400 p-1.5 w-60 outline-none'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div> 
                    <div>
                        <span className='text-sm text-gray-700 '>forgot Password ?</span>
                    </div>
<br />
                    <button className='bg-gradient-to-r from-[#8a2387] via-[#e94057] to-[#f27121]  w-full p-1.5
                        text-white cursor-pointer font-semibold
                         rounded-3xl text-sm'>Login</button>

                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition={Bounce}
            />
        </div>
    )
}

export default index