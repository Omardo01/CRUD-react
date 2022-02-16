import React, {useState, useEffect} from 'react';
import Navbar from './Components/Navbar'
import BookList from './Components/PersonasList'
import Form from './Components/Form'

function App() {

  const [persona, setPersona] = useState({
    nombre: '',
    apellidos: '',
    fecha_na: '',
    peso: 0,
    altura: 0,
    imc: 0
  })

  const [personas, setPersonas] = useState([])

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getPersonas = () => {
      fetch('http://localhost:8080/api')
      .then(res => res.json())
      .then(res => setPersonas(res))
    }
    getPersonas()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <>
      <Navbar brand='Usuarios de Life Control'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Lista de Personas</h2>
            <BookList persona={persona} setPersona={setPersona} personas={personas} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Formulario</h2>
            <Form persona={persona} setPersona={setPersona}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;