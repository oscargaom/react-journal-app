import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { initialStateAuthNotesActiveNote } from '../../utils/initialState';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

describe('Pruebas en el componente <NoteScreen />', () => {

    let store = mockStore(initialStateAuthNotesActiveNote);

    beforeEach(() => {
        store = mockStore(initialStateAuthNotesActiveNote);
        store.dispatch = jest.fn();
        jest.clearAllMocks();
    });

    test('debe mostrarse el snapshot correctamente', () => {

        const wrapper = mount(
            <Provider store={store}>
                <NoteScreen />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe ejecutar el dispatch para activeNote cuando se modifica el titulo de la nota ', () => {

        const wrapper = mount(
            <Provider store={store}>
                <NoteScreen />
            </Provider>
        );

        const texto = 'Pasear al perro';

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: texto
            }
        }
        );

        /*  activeNote se ejecuta más de una vez porque la primera ocasión que lo hace es debido a la carga 
            inicla del componente y la segunda porque se dispara el useEffect debido a los cambios en formValues
            porque el cambio que se realizá en el title del input.
        */
        expect(activeNote).toHaveBeenCalledTimes(2);
        
        /*  Hacemos uso de toHaveBeenLastCalledWith para validar el último llamado, ya que el primero no nos 
            interesa saber con que valores fue llamado porque es el que se realiza con la carga por default.
        */
        expect(activeNote).toHaveBeenLastCalledWith(initialStateAuthNotesActiveNote.notes.active.id, {
            ...initialStateAuthNotesActiveNote.notes.active,
            title: texto,
        });
    });

})
