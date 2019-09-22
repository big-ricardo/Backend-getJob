const { Schema, model } = require("mongoose");

const VagSchema = new Schema({
    cidade:{
        type:String,
    },
    emailContato:{
        type: String,
    },
    idEmp: {
        type: String,
        require: true,
    },
    user: {
        type: String,
        require: true,
    },
    atuacao:{
        type:String,
        required:true,
    },
    descricao: {type:String},
    avatar: {
        type: String,
        require: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vag',
    }],
    matchs: [{
        type: Schema.Types.ObjectId,
        ref: 'Vag',
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vag',
    }],
}, {
    timestamps: true,
});

module.exports = model('Vag', VagSchema);