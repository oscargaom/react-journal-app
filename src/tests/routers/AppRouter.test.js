import React from 'react'

import '@testing-library/jest-dom';

import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';
import { startLoadingNotes } from '../../actions/notes';

import { initialStateAuthNotes } from '../utils/initialState';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

jest.mock('../../actions/notes', () => ({
    startLoadingNotes: jest.fn()
}));

describe('Pruebas en el componente <AppRouter />', () => {

    let store = mockStore(initialStateAuthNotes);

    beforeEach(() => {
        store = mockStore(initialStateAuthNotes);
        store.dispatch = jest.fn();
        jest.clearAllMocks();
    });

    test('debe llamar el observable de firebase que se ejecuta en el useEffect', async () => {

        let user;

        await act(async () => {

            /*  Esta función se debe ejecutar antes para que cuando se ejecute el useEffect encuentre un 
                usuario logeado, ya que de lo contrario marcará errores por que estará vacío el user.
            */
            user = await firebase.auth().signInWithEmailAndPassword('oscar@gmail.com', '123456');

            mount(
                <Provider store={store}>
                    <AppRouter />
                </Provider>);
        });

        expect(login).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledWith(user.user.uid, user.user.displayName);
        expect(startLoadingNotes).toHaveBeenCalledTimes(1);
        expect(startLoadingNotes).toHaveBeenCalledWith(user.user.uid);
    });
})
