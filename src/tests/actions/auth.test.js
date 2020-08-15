import '@testing-library/jest-dom';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { login, logout, startLogout, startLoginEmailPassword } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en action auth.js', () => {

    const initialState = {};

    let store = mockStore(initialState);
    
    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('debe retornar el objeto action correcto para login y logout', () => {
        
        const user = {
            uid: 'a4e69702db311ea87d00242ac130003',
            displayName: 'Manuel'
        };
        
        const userLogin = login(user.uid, user.displayName);

        expect(userLogin).toEqual({
            type: types.login,
            payload: user
        });

        const userLogout = logout();

        expect(userLogout).toEqual({
            type: types.logout
        });
    });

    test('debe realizar el startLogout', async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning,
            payload: null
        });
    });

    test('debe realizar el startLoginEmailPassword', async () => {
        
        await store.dispatch(startLoginEmailPassword("oscar@gmail.com", "123456"));

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });

        expect(actions[1]).toEqual({
            type: types.uiFinishLoading
        });

        /*  Para este caso displayName es nulo, pero si el usuario se logea con 
            su usuario de gmail, este valor puede ser diferente de null y la 
            evaluación debería ser de tipo displayName: expect.any(String).
        */
        expect(actions[2]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        });
    })
    
})
