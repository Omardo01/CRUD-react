import React from 'react';

const PersonasList = ({persona, setPersona, personas, setListUpdated}) => {


    const handleDelete = idPersona => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:8080/api/' + idPersona, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    let{nombre, apellidos, fecha_na, peso, altura, imc} = persona
    const handleUpdate = idPersona => {
        peso = parseFloat(peso, 10)
        altura = parseFloat(altura, 10)
        imc = parseFloat(imc, 10)
        //validación de los datos
        if (nombre === '' || apellidos === '' || fecha_na === '' || peso <= 0 || altura <= 0 || imc <= 0) {
            alert('Todos los campos son obligatorios')
            return
        }
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(persona)
        }
        fetch('http://localhost:8080/api/' + idPersona, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setPersona({
            nombre: '',
            apellidos: '',
            fecha_na: '',
            peso: 0,
            altura: 0,
            imc: 0
        })

        setListUpdated(true)
    }


    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th>idPersona</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Fecha</th>
                    <th>Peso</th>
                    <th>Altura</th>
                    <th>IMC</th>
                </tr>
            </thead>
            <tbody>
                {personas.map(persona => (
                    <tr key={persona.idPersona}>
                        <td>{persona.idPersona}</td>
                        <td>{persona.nombre}</td>
                        <td>{persona.apellidos}</td>
                        <td>{persona.fecha_na}</td>
                        <td>{persona.peso}</td>
                        <td>{persona.altura}</td>
                        <td>{persona.imc}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={() => handleDelete(persona.idPersona)} className="btn btn-danger">Delete</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(persona.idPersona)} className="btn btn-dark">Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default PersonasList;