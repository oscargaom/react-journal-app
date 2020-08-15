import { types } from "../types/types";
import Swal from 'sweetalert2'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { startLoading, finishLoading } from "./ui";
import { cleanNotes } from "./notes";

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                const { displayName, uid } = user;
                // console.log(displayName);
                // console.log(uid);
                dispatch(login(displayName, uid));
            });
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        // console.log(email);
        // console.log(password);
        // console.log(name);

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // console.log(userCredential);
                const { user } = userCredential;
                await user.updateProfile({ displayName: name });
                const { displayName, uid } = user;
                // console.log(displayName);
                // console.log(uid);

                // console.log(user);
                // console.log(displayName);
                Swal.fire('Bienvenido', 'Tu cuenta ha sido creada', 'success');
                dispatch(login(uid, displayName));

            })
            .catch(error => {
                // console.log(error);
                Swal.fire('Register error', error.message, 'error')
            });
    };
}

/*  Esta es una acción asíncrona, por ello en vez de regresar un objeto regresa 
    un callback el cual el middleware thunk queda en espera de la ejecución de algún
    dispatch; en caso de que no se ejecutará algún dispatch simplmente termina. 
    El dispatch es proporcionado por el middleware thunk, así es que no debemos 
    preocuparnos por obtenerlo de algún otro lugar.
*/
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        // setTimeout(() => {
        //     dispatch(login('Gpe', '456789'));
        // }, 3000);


        dispatch(startLoading());

        // setTimeout(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                dispatch(finishLoading());
                const { user: { displayName, uid } } = userCredential;
                Swal.fire('Bienvenido',`Hola ${displayName}`,'success');
                dispatch(login(uid, displayName));
            })
            .catch(error => {
                // const {code} = error;
                dispatch(finishLoading());
                dispatch(login('', ''));
                Swal.fire('Login Error', error.message, 'error');
            });
        // }, 9000);
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());

        dispatch(cleanNotes());
    };
}



