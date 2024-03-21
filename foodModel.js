const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    describe: {
        type: String,
        require: true,
    }
});

const foodModel = mongoose.model('foods', foodSchema);

module.exports = foodModel;