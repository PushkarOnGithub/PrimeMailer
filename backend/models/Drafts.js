const mongoose = require('mongoose')

const DraftsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    csv:{
        type: Binary,
        required: true,
    },
    html:{
        type: String,
        required: true,
    },
    Totallength:{
        type: Int,
        required: true,
    },
    currentIndex:{
        type: Int,
        default: 0
    },
    Status:{
        type: Boolean,
        default: false
    }
})

const Drafts = mongoose.model('drafts', DraftsSchema);
module.exports = Drafts;