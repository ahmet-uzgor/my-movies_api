const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {type: String , required: true,default:'ahmet'},
    category: String,
    country: String,
    year: Number,
    imdbScore: Number,
    director_id: Schema.Types.ObjectId,
    dateOfMovie: {type: Date, default: Date.now}
});

module.exports = mongoose.model('movie', MovieSchema);