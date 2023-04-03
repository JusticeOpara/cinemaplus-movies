import React from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { forgotPassword } from "../Firebase";

export default function ForgotPassword() {

    const handleReset = async (values) => {
        try {


            navigate('/');

        } catch (error) {

            toast.error("Error: " + error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(error, "-TOASTERROR")

        }
    }

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email')
            .required('Required'),
    })

    return (

        <div className="container">
            <Formik
                initialValues={{
                    email: '',
                    
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={handleReset}
            >
                {/* console.log(values, "inputValue") */}


                {({ errors, touched, handleChange, handleBlur,isSubmitting }) => {

                    console.log(errors, "---errors")
                    return < Form className="form" >

                        <h2>FORGOT PASSWORD</h2>

                        <div className="form-outline">
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

                        <button type="submit" > {isSubmitting ? 'RESET PASSWORD..' : 'RESET PASSWORD'}</button>
                        <button type="submit">LOGIN</button>
                        <p>Not a member? <Link to="/SignUp">Register </Link> </p>
                    </Form>
                }}
            </Formik >
        </div >
    )
}