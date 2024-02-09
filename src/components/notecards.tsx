interface NoteCardProps {
  //props create object
  note: {
    date: Date,
    content: string
  }
}

export function NoteCard({note}: NoteCardProps) {
  return(
    <button className='text-left bg-stone-800 outline-none rounded-md p-5 space-y-3 overflow-hidden relative
      hover:ring-2 hover:ring-stone-600
      focus:ring-2 focus:ring-yellow-500'>
      <span className='text-sm font-medium text-stone-300'>
        {note.date.toISOString()}
       
      </span>
      <p className='text-sm leading-6 text-stone-400'>
        {note.content}
      </p>
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t pointer-events-none from-black/60 to-black/0'></div>
    </button>
  )
}