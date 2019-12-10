const { Schema, model } = require("mongoose");

const FalSchema = new Schema({
    nome: {
        type: String,
        require: true,
    },
    cidade:{
        type:String,
    },
    email:{
        type: String,
    },
    mensagem: String
}, {
    timestamps: true,
});

module.exports = model('Fale', FalSchema);