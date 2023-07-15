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
        default: Date.now
    }
})

const OTPs = mongoose.model('otps', OTPsSchema);
// OTPs.createIndexes({expireAt: 1, expireAfterSeconds: 5});
module.exports = OTPs;