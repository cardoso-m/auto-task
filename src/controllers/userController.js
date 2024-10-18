const db = require('../database/database')
const bcrypt = require('bcrypt')
const validator = require('validator')

exports.createUser = async (req, res) => {
    var {name, email, password, role} = req.body

    if( !validator.isEmail(email) || !name || !password || !role){
        return res.status(400).send('Dados Inválidos')
    }

    try{
        var hashPassword = await bcrypt.hash(password, 12)
        await db('user').insert({name: name, email: email, password: hashPassword, role: role})
        return res.status(200).send('Dados inseridos!')
    } catch(err) {
        return res.status(400).send(err)
    }
}