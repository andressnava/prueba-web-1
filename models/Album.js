const { Schema, model } = require('mongoose');


const schemaAlbum = new Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
    date: { type: Date, default: new Date() }
});


module.exports = model("Album", schemaAlbum);