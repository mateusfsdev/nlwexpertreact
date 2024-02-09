export function NoteCard() {
  return(
    <div className='bg-stone-800 rounded-md p-5 space-y-3 overflow-hidden relative'>
      <span className='text-sm font-medium text-stone-300'>
        há 18hrs
      </span>
      <p className='text-sm leading-6 text-stone-400'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores rem inventore quibusdam. Quasi odio dolore cupiditate fuga maxime enim aperiam veritatis laborum placeat. Distinctio recusandae fuga fugiat? Accusamus, nihil sint?
      </p>
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t pointer-events-none from-black/60 to-black/0'></div>
    </div>
  )
}