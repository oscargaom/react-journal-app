import React from 'react'
import { Sidebar } from './Sidebar'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { useSelector } from 'react-redux'

export const JournalScreen = () => {

    const stateSelector = useSelector(state => state);

    const { notes: { active } } = stateSelector;

    return (
        <div className="journal__main-content">

            <Sidebar />

            <main>
                {
                    (active)
                        ? <NoteScreen />
                        : <NothingSelected />
                }
            </main>
        </div>
    )
}
