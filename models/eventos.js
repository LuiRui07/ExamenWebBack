const mongoose = require('mongoose');

const eventosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        required: false,
    },
    lugar: {
        type: String,
        required: false,
    },
    lat: {
        type: Number,
        required: false,
    },
    lon: {
        type: Number,
        required: false,
    },
    organizador: {
        type: String,
        required: false,
        ref: 'usuarios',
    },
    imagen: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("eventos", eventosSchema);