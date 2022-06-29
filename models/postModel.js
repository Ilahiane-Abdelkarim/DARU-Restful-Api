const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        title: {
            type: String,
            require: [true, 'Please add a text value'],
        },
        sub_title: {
            type: String,
            require: [true, 'Please add a text value'],
        },
        text: {
            type: String,
            require: [true, 'Please add a text value'],
        },
        tags: {
            type: String,
            require: [true, 'Please add a tag value'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', postSchema)