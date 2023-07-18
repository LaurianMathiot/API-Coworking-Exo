const mockCoworkings = require('./mock-coworkings')
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})