import { useState } from 'react'

import { NoteCard } from './components/notecards'
import { NewNote } from './components/newnotecard'

import logo from './assets/logo.svg'

export function App() {
  const [notes, setNotes] = useState([
    {id: 1, date: new Date(), content: 'hello world'},
    {id: 2, date: new Date(), content: 'segunda nota'}
  ])

  function onNoteCreated(content: string) {
    const newNote ={
      id: Math.random(),
      date: new Date(),
      content,
    }

    setNotes([newNote, ...notes])
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
