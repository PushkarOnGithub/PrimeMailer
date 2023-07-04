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
    expireAt: {
        type: Date,
        default: Date.now,
        unique: true
    }
})

const OTPs = mongoose.model('otps', OTPsSchema);
OTPs.createIndexes({expireAt: 1, expireAfterSeconds: 10});
module.exports = OTPs;