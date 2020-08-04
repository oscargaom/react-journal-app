import '@testing-library/jest-dom'
import { types } from '../../types/types';
import { cloudinary } from '../../config';


describe('Pruebas en el objeto types', () => {

    console.log( cloudinary);
    test('debe coincidir el objeto con los parámetros indicados', () => {
        expect(types).toEqual({
            
            login: '[Auth] Login',
            logout: '[Auth] Logout',


            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',

            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning'
        });
    });

})
