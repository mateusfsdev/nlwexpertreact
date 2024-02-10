import { useState } from 'react'

import { NoteCard } from './components/notecards'
import { NewNote } from './components/newnotecard'

import logo from './assets/logo.svg'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const noteOnStorage = localStorage.getItem('notes')

    if (noteOnStorage) {
      return JSON.parse(noteOnStorage)
    }


    return[]
  })
  
  function onNoteCreated(content: string) {
    const newNote =
    {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="Logo site'bloco de notas.voip'" />

      <form className='w-full'>
        <input
          type="text"
          placeholder='busque suas notas...'
          className='w-full bg-transparent text-3xl outline-none font-semibold tracking-tight
            placeholder:text-stone-500'
          />
      </form>

      <div className='h-px bg-stone-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNote onNoteCreated={onNoteCreated}/>

        {notes.map(note =>{
          return<NoteCard key={note.id} note={note} />
        })}
      </div>
    </div>

  )
}
