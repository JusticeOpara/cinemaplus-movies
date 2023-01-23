import React from "react"
import { Formik, Form, Field, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { redirect } from "react-router-dom";
import { signup } from "../Firebase"
import { connectFirestoreEmulator } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

const DisplayingErrorMessagesSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});


export default function SignUp() {

    const navigate = useNavigate()

    const handleSignup = async (values) => {
        
        try {
            
            const signupContent = await signup(values.email,values.password);
            console.log(signupContent, "SIGNUPCONTENT")
            navigate('/HomePage');
            
        } catch (error) {

            toast.error("Error: " + error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(error, "-TOASTERROR")
        }
           
    
    }





    return (

        <div className="container">
            <ToastContainer />
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}

                validationSchema={DisplayingErrorMessagesSchema}

                onSubmit={handleSignup}

            >


                {({ errors, touched, isValid, handleChange, handleBlur, handleSubmit, isSubmitting }) => {

                    // console.log(errors, "---errors")



                    return <Form className="form" onSubmit={handleSubmit}  >

                        <h2>REGISTER</h2>

                        <div>
                            <p className="form-text">Username</p>

                            <input
                                type="text"
                                name="username"
                                placeholder="What's your name?"
                                onChange={handleChange}
                                onBlur={handleBlur}

                            />

                            {touched.username && errors.username && <div className="error">{errors.username}</div>}

                        </div>

                        <div>

                            <p className="form-text">Email</p>

                            <input
                                type="email"
                                name="email"
                                placeholder="@mail"
                                onBlur={handleBlur}
                                onChange={handleChange}

                            />


                            {touched.email && errors.email && <div className="error">{errors.email}</div>}

                        </div>


                        <div>
                            <p className="form-text">Password</p>

                            <input type="password"
                                name="password"
                                placeholder="password"
                                onBlur={handleBlur}
                                onChange={handleChange}

                            />


                            {touched.password && errors.password && <div className="error">{errors.password}</div>}

                        </div>

                        <p>Have you read and agree to the terms </p>

                        <button type="submit" disabled={!isValid}
                            style={{ backgroundColor: !isValid ? 'gray' : 'blue' }}>

                            {isSubmitting ? 'Creating account..' : 'Sign up'}

                        </button>



                    </Form>

                }}
            </Formik>
        </div>
    )
}