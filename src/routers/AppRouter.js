import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checkingAuthState, setCheckingAuthState] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    /*  useEffect solo se ejecutará la primera vez que se cargue la página.
        firebase.auth().onAuthStateChanged es un observable que esta pendiente
        de los cambios que puedan ocurrir en las credenciales del usuario desde 
        firebase, de modo que cuando ocurrá algún cambio se disparará este 
        evento y dispatch se agregá en el arreglo de dependencias para evitar
        el warning que se marca en la consola del explorador.
    */

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            // console.log(user);
            // const {displayName, email, uid} = user;
            // console.log(displayName);
            // console.log(email);

            if (user?.uid) {
                const { uid, displayName } = user;
                // console.log(uid);
                dispatch(login(uid, displayName));
                setIsLogin(true);
                dispatch(startLoadingNotes(uid));
            }
            else {
                setIsLogin(false);
            }

            setCheckingAuthState(false);
        });
    }, [dispatch]);

    if (checkingAuthState) {
        return (
            <>
                <h1>Validando el estado de la autenticación</h1>
            </>
        );
    }

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                <Switch>
                    {/* <Route path="/auth" component={AuthRouter} /> */}
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLogin}
                    />

                    {/* <Route exact path="/" component={JournalScreen} /> */}
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLogin}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}