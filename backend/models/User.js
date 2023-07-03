const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        default: "https://i.ibb.co/hyqFSGv/user.png"
    }
});
const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;