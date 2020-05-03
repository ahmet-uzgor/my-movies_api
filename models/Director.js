const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: 70,
        minlength: 2
    },
    surname : {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    bio: {
        type: String,
        maxlength: 500,
        minlength:10
    },
    createdDate: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);