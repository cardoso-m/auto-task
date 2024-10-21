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