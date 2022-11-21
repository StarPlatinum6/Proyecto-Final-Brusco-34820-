import './NavBar.css'
import Btn from '../Btn/Btn'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = (props) => {

    const clickAction = () => {
        alert ('El botón funciona')
    }

    return (
        <nav className='navbar'>
            <h1 className="text-3xl font-bold underline font-sans">Ephemer Gaming</h1>
            <Btn fn={clickAction} className='bg-blue-300 hover:bg-blue-500 px-2 font-sans'>Motherboards</Btn>
            <Btn fn={clickAction}>Procesadores</Btn>
            <Btn fn={clickAction}>Memoria RAM</Btn>
            <Btn fn={clickAction}>Fuentes de Alimentación</Btn>
            <Btn fn={clickAction}>Placas de Video</Btn>
            <CartWidget className='CartWidget bg-slate-300 rounded p-1' fn={clickAction}/>
        </nav>
    )
}

export default NavBar