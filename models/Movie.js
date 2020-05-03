const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String ,
        required: [true,'`{PATH}` area is required.'],
        maxlength: 50,
        minlength: 1,
        default:'ahmet'
    },
    category: {
        type: String,
        maxlength: 50,
        minlength: 2
    },
    country: String,
    year: {
        type: Number,
        max:2020,
        min: 1935
    },
    imdbScore: {
        type: Number,
        max: 10,
        min: 1
    },
    director_id: Schema.Types.ObjectId,
    dateOfMovie: {type: Date, default: Date.now}
});

module.exports = mongoose.model('movie', MovieSchema);