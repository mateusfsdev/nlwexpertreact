export function NewNote(){
  return(
    <div className=' bg-stone-700 rounded-md p-5 space-y-3 outline-none 
      hover:ring-2 hover:ring-yellow-500'>
      <span className='text-sm font-medium text-stone-200'>
        Adicionar nota
      </span>
      <p className='text-sm leading-6 text-stone-400'>
        Grave uma nota em audio que será convertida automaticamnete para texto!✨✨
      </p>
    </div>
  )
}