import '@testing-library/jest-dom'
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

import { initialState, initialStateAuthNotes } from '../utils/initialState';

describe('Pruebas del reducer authReducer', () => {

    test('debe retornar el reducer el state valido para el type login', () => {

        const loginAction = {
            type: types.login,
            payload: {
                uid: 'eDLCZMfLBc5SpM0v7p0P',
                displayName: 'Manuel'
            }
        }
        const loginReducer = authReducer(initialState, loginAction);

        expect(loginReducer).toEqual({
            uid: loginAction.payload.uid,
            name: loginAction.payload.displayName
        });

        expect(loginReducer.uid).toBe(loginAction.payload.uid);
        expect(loginReducer.name).toBe(loginAction.payload.displayName);
    });

    test('debe retornar el reducer el state valido para el type logout', () => {

        const logoutAction = {
            type: types.logout
        };

        const logoutReducer = authReducer(initialStateAuthNotes, logoutAction);

        expect(logoutReducer).toEqual({});

    });

    test('debe retornar el reducer el state valido para el type default', () => {

        const defaultReducer = authReducer(initialStateAuthNotes, { type: null });

        expect(defaultReducer).toEqual(initialStateAuthNotes);
    })
})
