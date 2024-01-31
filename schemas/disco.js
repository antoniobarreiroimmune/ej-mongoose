const mongoose = require('mongoose');

const discoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    año: { type: Number, required: true },
    genero: String,
    stock: { type: Number, required: true },
    formato: String
  });
  
  const disco = mongoose.model('Disco', discoSchema);

  module.exports = disco;