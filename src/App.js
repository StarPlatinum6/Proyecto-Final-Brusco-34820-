import React from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar'
import NavBar2 from './components/NavBar/NavBar2'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <NavBar2 />
      <ItemListContainer greeting='Bienvenidos a Ephemer Gaming' className='m-8 tracking-widest bg-zinc-300 rounded-full p-2'/>
    </div>
  );
}

export default App;
