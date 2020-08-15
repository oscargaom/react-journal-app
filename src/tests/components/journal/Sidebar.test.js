import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Sidebar } from '../../../components/journal/Sidebar';
import { Provider } from 'react-redux';
import { initialStateAuthNotes } from '../../utils/initialState';

import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));

describe('Pruebas en el componente <Sidebar />', () => {

    let store = mockStore(initialStateAuthNotes);

    beforeEach(() => {
        store = mockStore(initialStateAuthNotes);
        /*  Al momento de ejecutarse dispatch(startLogout()) o cualquier otra acción mediante dispatch 
            en las pruebas vamos a tener el siguiente error 'Actions must be plain objects. Use custom 
            middleware for async actions.' debido a que dispatch regresa una promesa y para evitar eso 
            hacemos uso de store.dispatch = jest.fn();
        */
        store.dispatch = jest.fn();
    });


    test('debe hacer match el snapshot.', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe llamar el dispatch startLogout mediante el evento handleLogout.', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        wrapper.find('button').prop('onClick')();

        expect(startLogout).toHaveBeenCalledTimes(1);
        expect(startLogout).toHaveBeenCalledWith();
    });

    test('debe de llamar el dispatch startNewNote mediante el evento handleNewEntry.', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        wrapper.find('.journal__new-entry').prop('onClick')();

        expect(startNewNote).toHaveBeenCalledTimes(1);
        expect(startNewNote).toHaveBeenCalledWith();
    })


})


