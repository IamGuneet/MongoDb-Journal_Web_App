const mongoose = require('mongoose');
//making and exporting the schema for the db

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    markdown:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Article',articleSchema);