const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            require: [true, 'Please add a first name'],
        },
        last_name: {
            type: String,
            require: [true, 'Please add a last name'],
        },
        email: {
            type: String,
            require: [true, 'Please add a email'],
            unique: true
        },
        password: {
            type: String,
            require: [true, 'Please add a password'],
        },
        location: {
            type: String,
            require: [true, 'Please add a location'],
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)