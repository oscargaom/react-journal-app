import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

import Swal from "sweetalert2";

export const startNewNote = () => {
    /*  También podemos obtener el estado a través de una función que es enviada 
        por thunk como parámetro junto con el dispatch. Gracias a ello puedemos 
        tener acceso a todo el state y a los reducers y sería equivalente a usar
        el hook useSelector.
    */
    return async (dispatch, getState) => {
        // console.log(getState());
        const { auth: { uid } } = getState();
        // console.log(uid);

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        // console.log(notes);
        dispatch(setNotes(notes));
    };
};


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        // console.log('startSaveNote note');
        // console.log(note);
        const noteToUpdate = { ...note };
        // console.log(noteToUpdate);
        delete noteToUpdate.id;
        // console.log(noteToUpdate);

        if (!noteToUpdate.url) {
            delete noteToUpdate.url;
        }

        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToUpdate);
        } catch (error) {
            Swal.fire('Cant saved your note', error.toString(), 'error')
        }

        // console.log('startSaveNote note.id');
        // console.log(note.id);
        dispatch(refreshNote(note.id, note));

        Swal.fire('Saved note', 'Your note has been saved', 'success');
    };
};

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    };
};

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: note
    };
};

export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { notes: { active } } = getState();

        // console.log(file);
        // console.log(active);

        Swal.fire({
            title: 'Uploading ...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        // console.log(fileUrl);

        dispatch(startSaveNote(active));

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { auth: { uid } } = getState();

        // console.log(`startDeleting uid: ${uid}`);

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const cleanNotes = () => ({
    type: types.notesLogoutCleaning,
    payload: null
})