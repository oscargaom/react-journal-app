import React from 'react'
import { JournalEntry } from './JournalEntry';
import { useSelector } from 'react-redux';

export const JournalEntries = () => {

    //const entries =  [1,2,3,4,5];
    //const entries =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    const stateSelector = useSelector(state => state);
    const { notes: entries } = stateSelector.notes;
    // console.log(entries);

    return (
        <div className="journal__entries">
            {
                entries && entries.map(note => (
                    <JournalEntry 
                        key={note.id} 
                        note={note}
                    />
                ))
            }
        </div>
    )
}
