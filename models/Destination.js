const { Schema, model, Types: { ObjectId } } = require('mongoose')

const URL_PATTERN = /https?:\/\/./i

const destinationSchema = new Schema({
    destination: {
        type: String, required: true,
    },
    description: {
        type: String, required: true,
    },
    imageUrl: {
        type: String, required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL, must start with HTTP/HTTPS'
        }
    },
    type: {
        type: String, required: true,
    },
    _ownerId: { type: ObjectId, ref: 'User', required: true },
    likes: { type: Array, default: [], required: false }
});


const Destination = model('Destination', destinationSchema)

module.exports = Destination