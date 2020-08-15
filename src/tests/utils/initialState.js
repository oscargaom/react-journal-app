
export const initialStateAuthNotes = {
    auth: {
        uid: 'UXYjbpwCTcVql4idEv0hNtCSm3A3',
        name: 'oscar'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [
            {
                id: 'He6idl56vMhcaI1EXRJ8',
                url: 'https://res.cloudinary.com/dhc6rsfox/image/upload/v1597086578/p9npxjothlhhrdtkjasu.jpg',
                body: 'trabajando duro!',
                date: 1595866665073,
                title: 'Titulo firebase'
            },
            {
                id: 'SUuCtNN1DRuwMhgmvsEB',
                body: '30 minutos.',
                title: 'Meditación',
                date: 1595896369734,
                url: 'https://res.cloudinary.com/dhc6rsfox/image/upload/v1596500035/axoj3ozqkbfxxdch6tn1.jpg'
            },
        ],
        active: null
    }
};

export const initialStateAuthNotesActiveNote = {
    auth: {
        uid: 'UXYjbpwCTcVql4idEv0hNtCSm3A3',
        name: 'oscar'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [
            {
                id: 'He6idl56vMhcaI1EXRJ8',
                url: 'https://res.cloudinary.com/dhc6rsfox/image/upload/v1597086578/p9npxjothlhhrdtkjasu.jpg',
                body: 'trabajando duro!',
                date: 1595866665073,
                title: 'Titulo firebase'
            },
            {
                id: 'SUuCtNN1DRuwMhgmvsEB',
                body: '30 minutos.',
                title: 'Meditación',
                date: 1595896369734,
                url: 'https://res.cloudinary.com/dhc6rsfox/image/upload/v1596500035/axoj3ozqkbfxxdch6tn1.jpg'
            },
        ],
        active: {
            id: 'SUuCtNN1DRuwMhgmvsEB',
            body: '30 minutos.',
            title: 'Solfeo',
            date: 1595896369734,
            url: 'https://res.cloudinary.com/dhc6rsfox/image/upload/v1596500035/axoj3ozqkbfxxdch6tn1.jpg'
        }
    }
};

export const initialStateEmpty = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
};

export const initialStateMsgError = {
    auth: {},
    ui: {
        loading: false,
        msgError: "Name is requiered"
    },
    notes: {
        notes: [],
        active: null
    }
};

export const initialState = {};

module.exports = {
    initialState,
    initialStateAuthNotes,
    initialStateEmpty,
    initialStateMsgError,
    initialStateAuthNotesActiveNote,
}