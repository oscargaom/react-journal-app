import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
    const resp = await db.collection(`${uid}/journal/notes`).get();

    // console.log('resp');
    const notes = [];

    resp.forEach((note) => {
        // console.log(note.data());
        notes.push({
            id: note.id,
            ...note.data()
        });
    });

    return notes;
};