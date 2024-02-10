import { ChangeEvent, useState } from 'react'

import { NoteCard } from './components/notecards'
import { NewNote } from './components/newnotecard'

import logo from './assets/logo.svg'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  
  const [ search, setSearch ] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const noteOnStorage = localStorage.getItem('notes')

    if (noteOnStorage) {
      return JSON.parse(noteOnStorage)
    }
    return[]
  })
  
  const filteredNotes = search !== ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : notes

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

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    
    setSearch(query)
  }
  

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="Logo site'bloco de notas.voip'" />

      <form className='w-full'>
        <input
          onChange={handleSearch}
          type="text"
          placeholder='busque suas notas...'
          className='w-full bg-transparent text-3xl outline-none font-semibold tracking-tight
            placeholder:text-stone-500'
          />
      </form>

      <div className='h-px bg-stone-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNote onNoteCreated={onNoteCreated}/>

        {filteredNotes.map(note =>{
          return<NoteCard key={note.id} note={note} />
        })}
      </div>
    </div>

  )
}
