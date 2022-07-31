const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./error/error-handler')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port , ()=>{
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()