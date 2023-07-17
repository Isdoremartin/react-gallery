import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"
import { useHistory, useNavigate } from "react-router-dom";

export default function Login() {

    const [isLoading, setisLoading] = useState("");
    const [error, setError] = useState(false);
    const [form, setForm] = useState({email:"", password: ""});
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const navigate = useNavigate();

    function handleForm(e){
        if (isLoading) return;
        setisLoading (true)
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            // Signed in 
            navigate("/", { replace: true });
            setisLoggedIn(true)
            setisLoading (false)
            setError("")
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            setError(error.message)
            setisLoading(false)
        });
    }

    function handleInput(e) {
       setForm({...form, [e.target.name]: e.target.value}); 
    }

    // if(isLoggedIn) return <Redirect to="/" />;

    return (
        <div className='flex h-screen bg-gray-200'>
            <div className='m-auto w-1/3  flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700'>
                <form className='m-5 w-10/12' onSubmit={handleForm}>
                    
                    {(error != "") && <p className='text-white'>{error}</p>}
                    <h1 className='w-full text-4xl tracking-widset text-center my-6 text-white'>
                        Login
                    </h1>

                    <div className='w-full my-6'>
                        <input
                        type="email"
                        className="p-2 rounded shadow w-full"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleInput}
                        />
                    </div>
                    <div className='w-full my-6'>
                        <input
                        type="password"
                        className="p-2 rounded shadow w-full"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleInput}
                        />
                    </div>
                    <div className='w-full my-6'>
                        <button
                        type="submit"
                        className="p-2 rounded shadow w-full text-black bg-gradient-to-br from-yellow-600 to-yellow-400"
                        
                        >
                            {
                                isLoading ? ( <i className='fas fa-circle-notch fa-spin'></i>
                                ):(
                                    "Login"
                                )
                            }
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
