import * as Dialog from '@radix-ui/react-dialog'
import { X, Mic} from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNote({ onNoteCreated }: NewNoteCardProps){

  const [isRecording, setIsRecording] = useState(false)
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  
  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    
    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }
  
  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if(content === '') {
      return
    }

    onNoteCreated(content)
    
    setContent('')
    setShouldShowOnboarding(true)
    
    toast.success('Nota criada com sucesso!✨')    
  }
  
  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleStartRecord(){
    
    const inSpeechRecognitionAPIAvaliable = "SpeechRecognition" in window
    || "webkitSpeechRecognition" in window
    
    if(!inSpeechRecognitionAPIAvaliable) {
      alert('infelizmente seu navegador nao suporta tanta tecnologia assim para gravação ☠☠')
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
  
   speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)  

    }

    speechRecognition.onerror = (event) => {
      console.error(event)
      }

      speechRecognition.start()

  }

  function handleStopRecording(){
    setIsRecording(false)

    if(speechRecognition !== null) {
      speechRecognition.stop()

  }}

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
            <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:h-[60vh] md:max-w-[640px] w-full bg-stone-700 md:rounded-md flex flex-col aoutline-none">
              <Dialog.Close className="absolute right-0 top-0 bg-stone-600 p-1.5 text-stone-400">
                <X className="size-4
                hover:text-stone-200" />
              </Dialog.Close>
              
              <form
              className='flex-1 flex flex-col'
              >
                <div className="flex flex-1 flex-col gap-3 p-5 ">
                  <span className='text-sm font-medium text-stone-300'>
                    Adicionar nota
                  </span>
                  {shouldShowOnboarding ? (
                    <p className='text-sm leading-6 text-stone-400'>
                      Comece &#160;
                      <button type='button' onClick={handleStartRecord} className='font-medium text-yellow-400 hover:underline'>gravando uma nota </button>
                      &#160; em audio, ou se preferir &#160;
                      <button type='button' onClick={handleStartEditor} className='font-medium text-yellow-400 hover:underline'>utilize apenas texto</button>
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
                  
                  {isRecording ? (
                    <button
                      type='button'
                      onClick={handleStopRecording}
                      className=" flex gap-4 items-center justify-center w-full bg-stone-400 py-4 outline-none text-center text-sm text-stone-300 font-medium
                      hover:text-red-600 hover:underline"> 
                        Gravando! (click para interromper)
                        <Mic className='size-4 text-red-500 animate-pulse' />
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={handleSaveNote}
                      className="w-full bg-yellow-400 py-4 outline-none text-center text-sm text-stone-800 font-medium
                      hover:bg-yellow-500 hover:underline"> 
                        Salvar nota
                    </button>
                  )}

                
              </form>
            </Dialog.Content>
          </Dialog.DialogOverlay>
        </Dialog.DialogPortal>
    </Dialog.Root>
  )
}