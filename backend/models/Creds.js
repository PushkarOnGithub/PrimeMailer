const mongoose = require('mongoose');

const CredsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    access_token: {
        type: String,
        required: true,
        
    },
    refresh_token: {
        type: String,
        required: true,
        
    },
    date: {
        type: Date,
        default: Date.now + 3600*1000
    }
})

const Creds = mongoose.model('creds', CredsSchema);
Creds.createIndexes();
module.exports = Creds;