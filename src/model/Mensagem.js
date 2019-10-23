const { Schema, model } = require("mongoose");

const MenSchema = new Schema({
    idDev: {
        type: String,
        require: true,
    },
    idEmp:{
        type:String,
        require: true,
    },
    mensagens: [{
        type: Schema.Types.Mixed,
        ref: 'Men',
    }],
}, {
    timestamps: true,
});

module.exports = model('Men', MenSchema);