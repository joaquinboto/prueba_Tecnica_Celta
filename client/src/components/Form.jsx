import React, {useState} from 'react'
import '../css/styles.css'
import axios from 'axios'

function Form() {

    const [form, setForm] = useState({})
    const [errors , setErrors] = useState({error: "error"})
    const [paisesArray , setPaises] = useState({})
    

    function validate(input){   
        let errors = {}
        if(!input.nombre) {
            errors.nombre = 'Name is required';
        } else if (!(/^[a-zA-Z0-9!Ññ@#$%&*()_ ;:-]*$/.test(input.nombre))) {
          errors.nombre = 'Character no valid';
        } else if (!(/^[a-zA-ZÑñ].*/.test(input.nombre))) {
            errors.nombre = 'Names cant begin with a number'
        } else if (!input.contraseña) {
          errors.contraseña = 'Password is required';
        } else if (input.contraseña.length < 6 ) {
            errors.contraseña = 'Error';
        } else if (!input.apellido) {
            errors.apellido = 'Falta el apellido'
        } 
        console.log('ERROR', errors);
        return errors;
    }


    const region = [
        {id:1,
        continente: "africa" },
        {id:2,
        continente: "americas" },
        {id:3,
        continente: "asia" },
        {id:4,
        continente: "europe"
        },
        {id:5,
        continente: "oceania"
        }]

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
    setErrors(validate({
    ...form,
    [e.target.name]: e.target.value
    }))
}

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(Object.keys(errors).length === 0) {
            try {
                await axios.post('http://localhost:3001/form' , form)
                alert('Guardado')
            } catch (error) {
                console.log(error)
            }
        }  else {
            alert('Error')
        }
    }

    const apiCall = async (region) => {
        console.log(region);
        const regiones = await axios.get(`https://restcountries.com/v3.1/region/${region}`)
        setPaises({
            paises: regiones.data,
            continente: region
        })
        setForm({
            ...form,
            paisesArray
        })
    }

    const handleSelect = (e) => {
        let nombre = e.target.value
            setForm({
                ...form,
                paisesArray: nombre,
                continente: paisesArray.continente 
            })
    }

;
  return (
    <div className='form'>
        <h1>Formulario</h1>
        <div className='form_inputs'>
            <span className='span_nombre'>Nombre</span>
            <span className='span_apellido'>Apellido</span>
            <span className='span_pw'>Contraseña</span>
            <input type="text" onChange={ (e) => handleChange(e)} name='nombre'  />
            {errors.nombre ? <div><span>Error falta el nombre</span></div> : null}
            <input type="text"  onChange={ (e) => handleChange(e)} name='apellido'  />
            {errors.apellido ? <div><span>Error falta el apellido</span></div> : null}
            <input type="text" onChange={ (e) => handleChange(e)} name='contraseña' />
            {errors.contraseña ? <div><span>La contraseña tiene que ser mayor a 6 digitos</span></div> : null}
        </div>
        <div className='div_select'>
            <span className='span_region'>Region</span>
        <select onChange={(e) => apiCall(e.target.value)} className='select' defaultValue={'DEFAULT'} name="" id="">
        <option value="DEFAULT" disabled="disabled">
                Seleccione Pais
        </option>
        {region.map((e) => {
                    return(
                        <option value={e.continente} key={e.id} >
                            {e.continente}
                        </option>
                    )
        })}
        </select>
            <span className='span_country'>Pais</span>
            <select onChange={(e) => handleSelect(e)} className='select' defaultValue={'DEFAULT'} name="" id="">
                <option value="DEFAULT" disabled="disabled">
                Seleccione Pais
                </option>
                {paisesArray.paises?.map((country) => {
                    return (
                        <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                    )
                })}
                <option>
                </option>
            </select>
        </div>
        <div>
            <button className='btn_save' disabled={Object.keys(errors).length === 0 ? false : true} onClick={(e) => handleSubmit(e)}>Guardar</button>
            <button className='btn_cancel'>Cancelar</button>
        </div>
    </div>
  )
}

export default Form
