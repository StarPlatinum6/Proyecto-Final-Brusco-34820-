import Btn from '../Btn/Btn'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = (props) => {

    const clickAction = () => {
        alert ('El botón funciona')
    }

    return (
        <nav className='flex justify-evenly bg-slate-300'>
            <h1 className="text-lg font-light font-sans bg-slate-300">Ephemer Gaming</h1>
            <Btn fn={clickAction} className='bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs'>Motherboards</Btn>
            <Btn fn={clickAction} className='bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs'>Procesadores</Btn>
            <Btn fn={clickAction} className='bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs'>Memoria RAM</Btn>
            <Btn fn={clickAction} className='bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs'>Fuentes de Alimentación</Btn>
            <Btn fn={clickAction} className='bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs'>Placas de Video</Btn>
            <CartWidget className='flex justify-center items-center w-8 bg-slate-300 hover:bg-slate-500 px-1' fn={clickAction}/>
        </nav>
    )
}

export default NavBar