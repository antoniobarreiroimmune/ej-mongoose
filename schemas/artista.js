const mongoose = require('mongoose');

const artistaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    fechaNacimiento: Date,
    nacionalidad: { type: String, required: true },
    nombreArtistico: String
  });
  
  
  const artista = mongoose.model('Artista', artistaSchema);
 

  module.exports = artista;