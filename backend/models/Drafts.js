const mongoose = require('mongoose')

const DraftsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date:{
        type: Number,
        default: Date.now
    },
    lastVisited:{
        type: Number,
        default: Date.now
    },
    lastSent:{
        type: Number,
        default: Date.now
    },
    csv:{
        type: Buffer,
        required: true,
    },
    html:{
        type: String,
        required: true,
    },
    totalLength:{
        type: Number,
        required: true,
    },
    currentIndex:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: false
    }
})

const Drafts = mongoose.model('drafts', DraftsSchema);
module.exports = Drafts;