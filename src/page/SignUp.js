import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"
import { ErrorMessage, Form,  Field, Formik, replace, } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';


export default function SignUp() {
   
   
    
    // if(isLoggedIn) return <Redirect to="/" />;

    return (
        <Formik

        initialValues= { {email: "", password: ""}}

        onSubmit= {(value, formikBag) => {

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, value.email, value.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                <Navigate to="/" replace={true} />
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                formikBag.setFieldError("email", errorMessage)
                // ..
            });
           
        }}

        validationSchema=  {Yup.object({
            email: 
                Yup.string()
                .required("Email is required")
                .email(),

            password:
                Yup.number("Password must be number")
                .required("Password is required")
                .min(4)
                
        })}
       >
        <div className='flex h-screen bg-gray-200'>
            <div className='m-auto w-1/3  flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700'>
                <Form className='m-5 w-10/12'>
                    
                    <p className='text-white'></p>
                    <h1 className='w-full text-4xl tracking-widset text-center my-6 text-white'>
                        SignUp
                    </h1>

                    <div className='w-full my-6'>
                        <Field 
                        name="email"
                         type="email"
                         className="p-2 rounded shadow w-full"
                         placeholder="Email"/>
                       
                        <p className='mt-1 text-yellow-400'><ErrorMessage name="email" /></p>
                    </div>

                    <div className='w-full my-6'>
                        <Field 
                        name="password"
                        type="password"
                        className="p-2 rounded shadow w-full"
                        placeholder="Password"
                        />
            
                       <p className='mt-1 text-yellow-400'><ErrorMessage name="password" /></p>
                    </div>
                    <div className='w-full my-6'>
                        <button
                        type="submit"
                        className="p-2 rounded shadow w-full text-black bg-gradient-to-br from-yellow-600 to-yellow-400"
                        
                        >
                            {/* {
                                isLoading ? ( <i className='fas fa-circle-notch fa-spin'></i>
                                ):( */}
                                    SignUp
                                {/* )
                            } */}
                            
                        </button>
                    </div>
                </Form>
            </div>
        </div>
        </Formik>
    );
}
