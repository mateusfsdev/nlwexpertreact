import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNote({ onNoteCreated }: NewNoteCardProps){
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    onNoteCreated(content)

    setContent('')
    setShouldShowOnboarding(true)

    toast.success('Nota criada com sucesso!✨')    
  }

  return(
    <Dialog.Root>
      <Dialog.DialogTrigger className=' bg-stone-700 flex flex-col rounded-md p-5 gap-3 text-left outline-none 
        hover:ring-2 hover:ring-stone-600
        focus:ring-2 focus:ring-yellow-500'>
        <span className='text-sm font-medium text-stone-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-stone-400'>
          Grave uma nota em audio que será convertida automaticamnete para texto!✨✨
        </p>
      </Dialog.DialogTrigger>

      
      <Dialog.DialogPortal>
          <Dialog.DialogOverlay className="inset-0 fixed bg-stone-950/60">
            <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[60vh] max-w-[640px] w-full bg-stone-700 rounded-md flex flex-col aoutline-none">
              <Dialog.Close className="absolute right-0 top-0 bg-stone-600 p-1.5 text-stone-400">
                <X className="size-4
                hover:text-stone-200" />
              </Dialog.Close>
              

              <form
              className='flex-1 flex flex-col'
              onSubmit={handleSaveNote}>
                <div className="flex flex-1 flex-col gap-3 p-5 ">
                  <span className='text-sm font-medium text-stone-300'>
                    Adicionar nota
                  </span>
                  {shouldShowOnboarding ? (
                    <p className='text-sm leading-6 text-stone-400'>
                      Comece <button className='font-medium text-yellow-400 hover:underline'>gravando uma nota </button> em auudio, ou se preferir <button onClick={handleStartEditor} className='font-medium text-yellow-400 hover:underline'>utilize apenas texto</button>
                    </p>
                  ) : (
                    <textarea
                      autoFocus
                      className='text-sm leading-6 text-stone-400 bg-transparent resize-none flex-1 outline-none'
                      onChange={handleContentChange}
                      value={content}
                    />
                  )}
                </div>
                <button
                  type='submit'
                  className="w-full bg-yellow-400 py-4 outline-none text-center text-sm text-stone-800 font-medium
                  hover:bg-yellow-500 hover:underline"> 
                    Salvar nota
                </button>
              </form>
            </Dialog.Content>
        </Dialog.DialogOverlay>
      </Dialog.DialogPortal>
    </Dialog.Root>
  )
}