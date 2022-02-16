import React from 'react';

const Form = ({persona, setPersona}) => {

    const handleChange = e => {
        setPersona({
            ...persona,
            [e.target.name]: e.target.value
        })
    }

    let{nombre, apellidos, fecha_na, peso, altura, imc} = persona

    const handleSubmit = () => {
        peso = parseFloat(peso, 10)
        altura = parseFloat(altura, 10)
        imc = parseFloat(imc, 10)
        //validación de los datos
        if (nombre === '' || apellidos === '' || fecha_na === '' || peso <= 0 || altura <= 0 || imc <= 0) {
            alert('Todos los campos son obligatorios')
            return
        }

        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(persona)
        }
        fetch('http://localhost:8080/api', requestInit)
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
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Nombre</label>
                <input value={nombre} name="nombre" onChange={handleChange} type="text" id="title" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Apellidos</label>
                <input value={apellidos} name="apellidos" onChange={handleChange} type="text" id="author" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label">Fecha de Nacimiento</label>
                <input value={fecha_na}  name="fecha_na" onChange={handleChange} type="text" id="edition" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label">Peso</label>
                <input value={peso}  name="peso" onChange={handleChange} type="number" id="edition" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label">Altura</label>
                <input value={altura}  name="altura" onChange={handleChange} type="number" id="edition" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label">IMC</label>
                <input value={imc}  name="imc" onChange={handleChange} type="number" id="edition" className="form-control"/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
 
export default Form;