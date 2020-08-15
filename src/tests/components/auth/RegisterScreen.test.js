import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';

import { initialStateEmpty, initialStateMsgError } from '../../utils/initialState';
/*  Test debe ejecutarse el dispatch de error al introducir un correo no valido
    haciendo uso de ject.mock()
    
    // import { setError } from '../../../actions/ui';
*/
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/*  Test debe ejecutarse el dispatch de error al introducir un correo no valido
    haciendo uso de ject.mock()

    // jest.mock('../../../actions/ui', () => ({
    //     setError: jest.fn()
    // }));
*/


describe('Pruebas en el componente <RegisterScreen />', () => {

    let store = mockStore(initialStateEmpty);

    test('debe mostrarse el snashopt correctamente', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe ejecutarse el dispatch de error al introducir un correo no valido', () => {
        /*  Test debe ejecutarse el dispatch de error al introducir un correo no valido
            haciendo uso de ject.mock()

            // store.dispatch = jest.fn();
        */

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = wrapper.find('input[name="email"]')

        emailInput.simulate('change', {
            target: {
                name: 'email',
                value: ''
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is required'
        });

        /*  Test debe ejecutarse el dispatch de error al introducir un correo no valido
            haciendo uso de ject.mock()
            // expect(setError).toHaveBeenCalledTimes(1);
            // expect(setError).toHaveBeenCalledWith('Email is required');
        */

    });

    test('debe mostar el mensaje de Sw con el error', () => {

        const localStore = mockStore(initialStateMsgError);

        const wrapper = mount(
            <Provider store={localStore}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists());
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialStateMsgError.ui.msgError);
    });


});
