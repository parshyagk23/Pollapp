const mongoose = require('mongoose')

const pollSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        option1: {
            type: String,
            required: true
        },
        option2: {
            type: String,
            required: true
            
        },
       
    },
    {timestamps:{createdAt:'createdAt' , updatedAt:'UpdatedAt'}}
)

module.exports = mongoose.model('Poll', pollSchema)