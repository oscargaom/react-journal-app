import '@testing-library/jest-dom';
import { setError, removeError, startLoading, finishLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en la acción ui.js', () => {
    test('debe regresar los objetos adecuados para cada llamado ', () => {

        const error = new Error('An error ocurred');
        const respSetErrorAction = setError(error);
        const respRemoveError = removeError();
        const respStartLoading = startLoading();
        const respfinishLoading = finishLoading();

        expect(respSetErrorAction).toEqual({
            type: types.uiSetError,
            payload: error
        });

        expect(respRemoveError).toEqual({ type: types.uiRemoveError });
        expect(respStartLoading).toEqual({ type: types.uiStartLoading });
        expect(respfinishLoading).toEqual({ type: types.uiFinishLoading });
    });
});