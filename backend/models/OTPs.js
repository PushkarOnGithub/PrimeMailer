const mongoose = require('mongoose')

const OTPsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    OTP: {
        type: String,
        required: true
    },
    expireAt_1: {
        type: Date,
        unique: true
    }
})

const OTPs = mongoose.model('otps', OTPsSchema);
OTPs.createIndexes({expireAt: 1, expireAfterSeconds: 0});
module.exports = OTPs;