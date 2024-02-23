const { Schema, model, Types: { ObjectId } } = require('mongoose')

const URL_PATTERN = /https?:\/\/./i

const carSchema = new Schema({
    brand: {
        type: String, required: true,
    },
    model: {
        type: String, required: true,
    },
    price: {
        type: Number, required: true,
    },
    year: {
        type: Number, required: true,
    },
    color: {
        type: String, required: true,
    },
    hp: {
        type: Number, required: true,
    },
    imageUrl: {
        type: String,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL, must start with HTTP/HTTPS'
        }
    },
    engine: {
        type: Number, required: true
    },
    _ownerId: { type: ObjectId, ref: 'User', required: true },
    likes: { type: Array, default: [], required: false }
});


const Car = model('Car', carSchema)

module.exports = Car