import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';

import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {

    const [formValues, formHandleInputChange] = useForm({
        email: 'oscar@gmail.com',
        password: 'Hola123'
    });

    const { email, password } = formValues;

    const dispatch = useDispatch();

    const { ui: { loading } } = useSelector(state => state);

    // console.log(loading);

    const handleLogin = (e) => {
        e.preventDefault();
        // dispatch(login('987654', 'Manuel'));
        // console.log('dispatch startLoginEmailPassword');
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleGoogleLogin = () => {
        // console.log('dispatch startGoogleLogin');
        dispatch(startGoogleLogin());
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form 
                onSubmit={handleLogin}
                className="animate__animated animate__pulse animate__faster"
            >
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

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img
                                alt="google button"
                                className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
