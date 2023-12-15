const mongoose = require("mongoose")


const paradasSchema = new mongoose.Schema({
   codLinea:{
        type: Number,
        required: true
     },
        nombreLinea:{
            type: String,
            required: true
        },
        sentido:{
            type: Number,
            required: true
        },
        orden:{
            type: Number,
            required: false
        },
        codParada:{
            type: Number,
            required: false
        },
        nombreParada:{
            type: String,
            required: true
        },
        direccion:{
            type: String,
            required: false
        },
        lon:{
            type: Number,
            required: true
        },
        lat:{
            type: Number,
            required: true        
   }
});

module.exports = mongoose.model("paradas", paradasSchema);
