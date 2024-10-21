const db = require('../database/database')
const bcrypt = require('bcrypt')
const validator = require('validator')

exports.createUser = async (req, res) => {
    var {name, email, password, role} = req.body

    console.log(req.body)

    if( !validator.isEmail(email) || !name || !password){
        console.log(role)
        return res.status(400).send('Dados Inválidos')
    }

    try{
        var hashPassword = await bcrypt.hash(password, 12)
        var user = await db('user').insert({name: name, email: email, password: hashPassword, role: role})
        console.log(user)
        return res.status(200).send('Dados inseridos!')
    } catch(err) {
        return res.status(400).send(err)
    }
}

exports.getUsers = async (req, res) => {

    try{
    var users = await db('user').select(db.raw('BIN_TO_UUID(id) id'),'name','email', 'role')

        users.forEach(user => {
            console.log("ID: "+ user.id)
            console.log("Nome: "+ user.name)
            console.log("E-mail: " + user.email)
            if(user.role == 1){
                console.log("Função: Admin")
            }else{
                console.log("Função: Membro")
            }
        })

    res.status(200).send(users)
    } catch(err) {
        console.log(err)
        return res.status(400).send(err)
        
    }
}

exports.deleteUser = async (req, res) => {
    var id = req.params.id

    try{
        await db('user')
                .where({'id': id})
                    .del()
        res.status(200).send('Usuário deletado')
    } catch(err){
        res.status(400).send(err)
    }
}

exports.updateUser = async (req, res) => {
    var id = req.params.id
    var {name, email} = req.body

    try {
        await db('user')
                .where({'id': id})
                    .update({
                        name: name,
                        email: email
                    })
        res.status(200).send('Usuário editado')
    } catch (err) {
        res.status(400).send(err)
    }

}