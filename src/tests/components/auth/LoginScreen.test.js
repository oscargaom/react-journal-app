import React from 'react'
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

import { initialStateEmpty } from '../../utils/initialState';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en el componente <LoginScreen />', () => {

    

    let store = mockStore(initialStateEmpty);

    beforeEach(() => {
        store = mockStore(initialStateEmpty);
        jest.clearAllMocks();
    });

    test('debe de mostrarse el componente', () => {

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe ejecutarse el dispatch startGoogleLogin', () => {

        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );

        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalledTimes(1);

    });

    test('debe ejecutarse el dispatch startLoginEmailPassword', () => {

        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );

        wrapper.find('form').prop('onSubmit')({
            preventDefault: jest.fn()
        });

        expect(startLoginEmailPassword).toHaveBeenCalledTimes(1);
        expect(startLoginEmailPassword).toHaveBeenCalledWith('oscar@gmail.com', 'Hola123');

    });

})
