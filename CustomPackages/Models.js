const mongoose = require('mongoose');
const schema = mongoose.Schema({
    'id': {
        type: String
    },
    'data': {
        type: String
    },
    'Hash': {
        type: String
    },
    'Encrypted': {
        type: String
    },
    'HS':{
        type: Object
    }
},
    {
        timestamps: true
    }
)
const notes = mongoose.model('Production', schema)

module.exports = notes;