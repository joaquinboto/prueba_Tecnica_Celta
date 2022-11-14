const { Pais, Region , User} = require('../db')


const form = async (req, res, next) => {

    const {paisesArray , contraseña ,  continente , apellido , nombre} = req.body
    console.log(req.body)
    try {
        const newForm = await User.create({
            nombre,
            apellido,
            paisesArray,
            continente,
            contraseña
        })
        const reg = await Region.create({
            regiones: continente
        })
        const pais = await Pais.create({
            paises: paisesArray
        })
        console.log(pais.__proto__)
        await pais.setRegion(reg)
        res.status(200).json(newForm)
    } catch (error) {
        res.json(error.messages)
    }
}

const getForm = async (req, res, next) => {
    try {
        const datos = await User.findAll()
        res.json(datos)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
	form,
    getForm
}
