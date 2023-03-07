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
                {({ errors, touched, isValid, handleBlur, handleChange,isSubmitting }) => (

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
                            <div>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    name="remember"

                                />
                                <label> Remember me </label>
                            </div>

                            <div> <Link to="/auth/forgot-password">Forgotten password?</Link></div>


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