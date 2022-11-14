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
        }else if (!input.contraseña) {
          errors.contraseña = 'Password is required';
        } else if (input.contraseña < 6 ) {
            errors.contraseña = 'Number must be less than 5 and greater than 0';
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
            await axios.post('http://localhost:3001/form' , form)
            alert('Guardado')
        }   else {
            alert('Hay un error')
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
            <input type="text" onChange={ (e) => handleChange(e)} name='nombre' placeholder='nombre' />
            <input type="text"  onChange={ (e) => handleChange(e)} name='apellido' placeholder='apellido' />
            <input type="text" onChange={ (e) => handleChange(e)} name='contraseña' placeholder='contraseña'/>
        </div>
        <div className='div_select'>
        <select onChange={(e) => apiCall(e.target.value)} className='select' defaultValue={'DEFAULT'} name="" id="">
        {region.map((e) => {
                    return(
                        <option value={e.continente} key={e.id} >
                            {e.continente}
                        </option>
                    )
                })}
        </select>
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
            <button className='btn_save' onClick={(e) => handleSubmit(e)}>Guardar</button>
            <button className='btn_cancel'>Cancelar</button>
        </div>
    </div>
  )
}

export default Form
