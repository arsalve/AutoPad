const mongoose = require('mongoose');
const notes = mongoose.model('Production', {
    'id': {
        type: String
    },
    'data': {
        type: String
    }
})

module.exports=notes;