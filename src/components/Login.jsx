import React from "react"
import './styles.css'
import { Link } from "react-router-dom"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signIn } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    email: Yup.string().email('Invalid email')
        .required('Required'),
});

export default function Login() {

    const navigate = useNavigate()

    const handleSignIn = async (values) => {
        try {

            await signIn(values.email, values.password);

            navigate('/');

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
                    email: '',
                    password: '',
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={handleSignIn}
            >
                {({ errors, touched, isValid, handleBlur, handleChange, isSubmitting }) => (

                    <Form className="form">

                        <h2>LOGIN</h2>

                        <a className="form-outline">

                            <p className="form-text">Email</p>

                            <input
                                type="email"
                                name="email"
                                placeholder="@mail"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {/* If this field has been touched, and it contains an error, display it */}

                            {touched.email && errors.email && <div className="error">{errors.email}</div>}
                        </a>

                        <div className="form-outline">
                            <p className="form-text">Password</p>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {/* If this field has been touched, and it contains an error, display it*/}

                            {touched.password && errors.password && <div className="error">{errors.password}</div>}

                        </div>

                        <div className="align-text">

                            <div className="checker">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19 19H5V5h10V3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 
                                    2-2v-8h-2m-11.09-.92L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17l-3.09-3.09Z" /></svg>
                                <a>
                                    Rememeber Me
                                </a>

                            </div>


                            <a> <Link to="/auth/forgot-password">Forgotten password?</Link></a>

                        </div>

                        <button type="submit" disabled={console.log(!isValid, "not valid")}
                            style={{ backgroundColor: !isValid ? 'gray' : 'blue' }}
                        >  {isSubmitting ? 'Signing In..' : 'Sign in'}</button>



                        <p className="xlll">Don't have an account? <Link to="/auth/signup">Register  </Link> </p>

                    </Form>
                )}
            </Formik>
        </div>
    )
}