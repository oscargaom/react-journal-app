import React from 'react'
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { initialStateAuthNotesActiveNote } from '../../utils/initialState';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../../types/types';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en el componente <JournalEntry />', () => {

    let store = mockStore(initialStateAuthNotesActiveNote);

    beforeEach(() => {
        store = mockStore(initialStateAuthNotesActiveNote);
        store.dispatch = jest.fn();
    });

    test('debe mostrar el snapshot correctamente ', () => {

        const { active } = initialStateAuthNotesActiveNote.notes;

        const wrapper = mount(
            <Provider store={store}>
                <JournalEntry note={active} />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe de ejecutarse el dispatch en activeNote al ser activada la nota', () => {

        const { active } = initialStateAuthNotesActiveNote.notes;

        const wrapper = mount(
            <Provider store={store}>
                <JournalEntry note={active} />
            </Provider>
        );

        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: types.notesActive,
            payload: active
        });
        //active.body = '4242342423';
        expect(store.dispatch).toHaveBeenLastCalledWith(
            activeNote(active.id, active)
        );
    });
})


