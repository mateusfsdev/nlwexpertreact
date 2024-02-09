import logo from './assets/logo.svg'
import { NewNote } from './components/newnotecard'
import { NoteCard } from './components/notecards'

//components react são funções que retorna html em formato JSX
export function App() {
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
        <NewNote />

        <NoteCard note={{
          date: new Date(),
          content: 'hello world'
        }}/>
        <NoteCard note={{
          date: new Date(),
          content: 'segunda nota '
        }}/>
        <NoteCard note={{
          date: new Date(),
          content: 'semana passada nota '
        }}/>


      </div>
    </div>

  )
}

