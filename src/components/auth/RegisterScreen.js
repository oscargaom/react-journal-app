import React from 'react'
import validator from 'validator'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { setError, removeError } from '../../actions/ui'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const [formValues, formHandleInputChange] = useForm({
        name: 'oscar',
        email: 'oscar@gmail.com',
        password: 'Hola123',
        password2: 'Hola123'
    });

    const { name, email, password, password2 } = formValues;

    const dispatch = useDispatch();

    const state = useSelector(state => state);

    const { ui: { msgError } } = state;

    // console.log(msgError);

    const handleRegister = (e) => {

        e.preventDefault();

        if (isFormValid()) {
            // console.log('Formulario correcto');
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    };

    const isFormValid = () => {

        if (name.trim().length === 0) {
            // console.log('Name is requiered');
            dispatch(setError('Name is requiered'));
            return false;
        } else if (!validator.isEmail(email)) {
            // console.log('Email is required');
            dispatch(setError('Email is required'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            // console.log('Password should be at least 6 characters and match');
            dispatch(setError('Password should be at least 6 characters and match'));
            return false;
        }

        dispatch(removeError());

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form
                onSubmit={handleRegister}
                className="animate__animated animate__pulse animate__faster"
            >

                {
                    msgError !== null && (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={formHandleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={formHandleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={formHandleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={formHandleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
            </button>


                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already register?
            </Link>
            </form>
        </>
    )
}
