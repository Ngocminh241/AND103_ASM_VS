const mongoose = require("mongoose");

const SanphamSchema = mongoose.Schema({
    name: {
    type: String,
    require: true,
  },

    price: {
    type: Number,
    require: true,
  },

    quantity: {
    type: Number,
    require: true,
  },
    inventory: {
        type: Number,
        require: true,
    },
    image: {
    type: String,
  },
});

const SanphamModel = mongoose.model("sampham", SanphamSchema);

module.exports = SanphamModel;

