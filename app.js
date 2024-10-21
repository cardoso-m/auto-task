const express = require('express')
const app = express()
const userRoutes = require('./src/routes/userRoutes')
const taskRoutes = require('./src/routes/taskRouter')

app.use(express.json()); // para analisar application/json
app.use(express.urlencoded({ extended: true })); // para analisar application/x-www-form-urlencoded

app.use('/', userRoutes)
app.use('/', taskRoutes)

app.get('/', (req, res) => {
    res.send('OK')
})

app.listen('8000', () => {
    console.log('Server On!')
})