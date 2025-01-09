require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const pollRoute = require('./Routes/PollRoute')
const authRoute = require('./Routes/auth')

const app= express()

app.get('/',(req,res) =>{
    res.json({
        message:"Welcome to Polling App"
    })
})
           

app.use(cors())
app.use(express.json())

app.use('/api',pollRoute)
app.use('/api',authRoute)


const MongoDbURl = process.env.MONGODB_URL

app.listen(process.env.PORT, () => {
    try {
        mongoose.connect(MongoDbURl)
        console.log(`DB Connected & Server is running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})