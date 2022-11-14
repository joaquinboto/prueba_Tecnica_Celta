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
        const pais = await Pais.create({
            paises: paisesArray
        })
        await pais.createRegion(continente)
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