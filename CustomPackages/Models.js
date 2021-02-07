const mongoose = require('mongoose');
const { boolean } = require('yargs');
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
        type: boolean,
        d
    }
},
    {
        timestamps: true
    }
)
const notes = mongoose.model('Production', schema)

module.exports = notes;