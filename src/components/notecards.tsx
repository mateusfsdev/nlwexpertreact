import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
  //props create object
  note: {
    date: Date,
    content: string
  }
}

export function NoteCard({note}: NoteCardProps) {
  return(
    <Dialog.Root>
      <Dialog.Trigger className='text-left bg-stone-800 outline-none rounded-md p-5 space-y-3 overflow-hidden relative
        hover:ring-2 hover:ring-stone-600
        focus:ring-2 focus:ring-yellow-500'>
        <span className='text-sm font-medium text-stone-300'>
          {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}  
        </span>
        <p className='text-sm leading-6 text-stone-400'>
          {note.content}
        </p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t pointer-events-none from-black/60 to-black/0'></div>
      </Dialog.Trigger>


      <Dialog.DialogPortal>
          <Dialog.DialogOverlay className="inset-0 fixed bg-stone-950/60">
            <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[60vh] max-w-[640px] w-full bg-stone-700 rounded-md flex flex-col aoutline-none">
              <Dialog.Close className="absolute right-0 top-0 bg-stone-600 p-1.5 text-stone-400">
                <X className="size-4
                hover:text-stone-200" />
              </Dialog.Close>
              
              <div className="flex flex-1 flex-col gap-3 p-5 ">
                <span className='text-sm font-medium text-stone-300'>
                  {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                </span>
                <p className='text-sm leading-6 text-stone-400'>
                  {note.content}
                </p>
              </div>


              <button
              type='button'
              className="w-full bg-stone-800/40 py-4 outline-none text-center text-sm text-stone-300 font-medium
              hover:bg-stone-800/50 group"> 
                Deseja <span className="text-red-400 group-hover:font-bold group-hover:underline" >apagar esta nota</span>?
              </button>
            </Dialog.Content>
        </Dialog.DialogOverlay>
      </Dialog.DialogPortal>
    </Dialog.Root>
  )
}