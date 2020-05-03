const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 25,
        minlength: 4
    },
    password : {
        type: String,
        required:true,
        maxlength: 70,
        minlength: 5
    }
});

module.exports = mongoose.model('User', UserSchema);