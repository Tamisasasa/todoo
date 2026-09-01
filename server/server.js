const express = require('express')
const cors = require('cors')

const todoRoute = require('./Route/todoRoute')

const app = express()


// MIDDLEWARE
app.use(cors())
app.use(express.json())


// TEST SERVER
app.get('/', (req, res) => {

    res.json({
        message: 'Todo API is running'
    })

})


// TODO ROUTES
app.use('/api', todoRoute)


// PORT
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)

})