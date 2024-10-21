const db = require('../database/database')

exports.createTask = async (req, res) => {
    var {name, description, client_id, priority, expires_in} = req.body

    try {
        await db('task')
                .insert({
                    'name': name,
                    'description': description,
                    'client_id': client_id,
                    'priority': priority,
                    'expires_in': expires_in
                })
        res.status(200).send('Tarefa criada')
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getTasks = async (req, res) => {
    try {
        var tasks = await db('task')
                            .select('*')
            res.status(200).send(tasks)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.deleteTask = async (req, res) => {
    var id = req.params.id

    try {
        await db('task')
                .where({
                    "id": id
                }).del()
        res.status(200).send('Tarefa excluída!')
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.updateTask = async (req, res) => {
    var id = req.params.id
    var {name, description, client_id, priority, expires_in} = req.body

    try {
        await db('task')
                .where({"id": id})
                    .update({
                        name: name,
                        description: description,
                        client_id: client_id,
                        priority: priority,
                        expires_in: expires_in
                    })
        res.status(200).send('Tarefa editada')
    } catch (err) {
        res.status(400).send(err)
    }
}