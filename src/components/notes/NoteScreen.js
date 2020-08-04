import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm'
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { notes: { active: note } } = useSelector(state => state);

    // console.log(note);
    const [formValues, formHandleInputChange, reset] = useForm(note);

    const { body, title, url , id} = note;
    
    /*  useRef almacena una variable mutable que en este caso es note.id la 
        cual no va a redibujar a todo el componente NoteScreen si esta cambia.
    */
    const noteId = useRef(note.id);
    // console.log(noteId);
    
    useEffect(() => {
        /*  Como useForm utiliza su propio state debemos modificar el valor de
            dicho estado para que sea redibujado el componente con los valores
            de la nota, ya que de lo contrario siempre muestra el primer valor.
        */
        if (noteId.current !== note.id) {
            reset(note);
            noteId.current = note.id;
        }
    }, [reset, note]);

    
    useEffect(() => {
        // console.log(formValues);
        dispatch(activeNote(formValues.id, {...formValues}));
    }, [formValues, dispatch])
    
    const handleDelete = () => {
        // console.log(id);
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={formHandleInputChange}
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={formHandleInputChange}
                >
                </textarea>

                {
                    (url)
                    &&
                    (<div className="notes__image">
                        <img
                            src={url}
                            alt="imagen"
                        />
                    </div>)
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
