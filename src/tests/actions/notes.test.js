import '@testing-library/jest-dom';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store' //ES6 modules
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: (file) => Promise.resolve(`https://testing.modules.com/${file.name}`)
}));

describe('Pruebas en el action notes.js', () => {

    const initialState = {
        auth: {
            uid: 'a4e69702db311ea87d00242ac130003',
            name: 'Manuel'
        },
        notes: {
            active: {
                id:"3LmjhAh8M6sF4Hn7Dicx",
                title:"Actualizar fecha",
                body:"Nota actualizada: Tue, 11 Aug 2020 15:01:51 GMT",
                date:1597088517337
            }
        }
    };
    
    let store = mockStore(initialState);

    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('debe crear una nueva nota con el método startNewNote', async () => {

        await store.dispatch(startNewNote());

        const storeActions = store.getActions();

        expect(storeActions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId =  storeActions[0].payload.id;

        // console.log(`docID: ${docId}`);

        await  db.doc(`${initialState.auth.uid}/journal/notes/${docId}`).delete();
    });

    test('debe de cargar las notas en el state', async () => {
        
        await store.dispatch(startLoadingNotes(initialState.auth.uid));

        const actions = store.getActions();

        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        // console.log(actions[0].payload[8]);

        const note = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect(actions[0].payload[0]).toMatchObject(note);

    });
    
    test('debe de actualizar una nota ', async () => {

        const date = new Date().toUTCString();

        const body = `Nota actualizada: ${date}`;
        const title = "Actualizar fecha";

        const noteToUpdate = {
            id: '3LmjhAh8M6sF4Hn7Dicx',
            body,
            date: 1597088517337,
            title
        };

        await store.dispatch(startSaveNote(noteToUpdate));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const noteFromDb =  await db.doc(`${initialState.auth.uid}/journal/notes/${noteToUpdate.id}`).get();

        expect(noteFromDb.data().title).toBe(noteToUpdate.title);
        expect(noteFromDb.data().body).toBe(noteToUpdate.body);
        expect(noteFromDb.data().date).toBe(noteToUpdate.date);

    });

    test('debe actualizar la url de la imagen de la nota', async () => {
        
        const file = new File([], 'imgToSave.png');

        await store.dispatch(startUploading(file));

        const actions = store.getActions();

        // console.log(actions);
        
        const savedNote = await db.doc(`${initialState.auth.uid}/journal/notes/${initialState.notes.active.id}`).get();

        // console.log(savedNote.data());
        
        expect(savedNote.data().url).toBe(`https://testing.modules.com/${file.name}`);
    });
    
});
