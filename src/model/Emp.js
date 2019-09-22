const { Schema, model } = require("mongoose");

const EmpSchema = new Schema({
    cidade:{
        type:String,
    },
    senha:{
        type: String,
    },
    email:{
        type: String,
    },
    user: {
        type: String,
        require: true,
    },
    avatar:{
        type:String
    }
}, {
    timestamps: true,
});

module.exports = model('Emp', EmpSchema);