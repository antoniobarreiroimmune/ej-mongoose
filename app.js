const express = require('express');
const mongoose = require('mongoose');
const Artista = require('./schemas/artista');
const Disco = require('./schemas/disco')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(`mongodb://127.0.0.1:27017/prueba`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('🟢 MongoDB está conectado a la base de datos "prueba"');

        app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
    })
    .catch(err => {
        console.error('🔴 MongoDB no conectado: ' + err);
    });

app.post('/nuevoArtista', async (req, res) => {
    try {
        const nuevoArtista = new Artista(req.body);

        await nuevoArtista.save();

        res.status(201).json(nuevoArtista);
    } catch (error) {
        console.error('Error al añadir el artista: ' + error);
        res.status(400).json({ mensaje: "Error al añadir el artista", error: error.message });
    }
});



app.post('/nuevoDisco', async (req, res) => {
    try { 
        const nuevoDisco = new Disco(req.body);


        await nuevoDisco.save();

        res.status(201).json(nuevoDisco);
    } catch (error) {
        console.error('Error al añadir el disco: ' + error);

        res.status(400).json({ mensaje: "Error al añadir el disco", error: error.message });
    }
});



app.get('/discos', async (req, res) => {
    try {
        const discos = await Disco.find({});


        res.status(200).json(discos);
    } catch (error) {
        console.error('Error al recuperar los discos: ' + error);
        res.status(500).json({ mensaje: "Error al recuperar los discos", error });
    }
});

app.get('/buscarDisco', async (req, res) => {
    try {
        const { titulo, id } = req.query;

        let disco;
        if (id) {
            disco = await Disco.findById(id);
        } else if (titulo) {
            disco = await Disco.findOne({ titulo: titulo });
        } else {
            return res.status(400).json({ mensaje: "Se requiere un título o ID para la búsqueda" });
        }

        if (!disco) {
            return res.status(404).json({ mensaje: "Disco no encontrado" });
        }

        res.status(200).json(disco);
    } catch (error) {
        console.error('Error al buscar el disco: ' + error);
        res.status(500).json({ mensaje: "Error al buscar el disco", error: error.message });
    }
});

app.put('/modificarDisco/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const discoActualizado = await Disco.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!discoActualizado) {
            return res.status(404).json({ mensaje: "Disco no encontrado" });
        }


        res.status(200).json(discoActualizado);
    } catch (error) {
        console.error('Error al actualizar el disco: ' + error);
        res.status(500).json({ mensaje: "Error al actualizar el disco", error: error.message });
    }
});

app.put('/modificarArtista/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const artistaActualizado = await Artista.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!artistaActualizado) {
            return res.status(404).json({ mensaje: "Artista no encontrado" });
        }


        res.status(200).json(artistaActualizado);
    } catch (error) {
        console.error('Error al actualizar el artista: ' + error);
        res.status(500).json({ mensaje: "Error al actualizar el artista", error: error.message });
    }
});

app.delete('/borrarDisco/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const discoBorrado = await Disco.findByIdAndDelete(id);

        if (!discoBorrado) {
            return res.status(404).json({ mensaje: "Disco no encontrado" });
        }

        res.status(200).json({ mensaje: "Disco borrado exitosamente" });
    } catch (error) {
        console.error('Error al borrar el disco: ' + error);
        res.status(500).json({ mensaje: "Error al borrar el disco", error: error.message });
    }
});

app.delete('/borrarArtista/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const artistaBorrado = await Artista.findByIdAndDelete(id);

        if (!artistaBorrado) {
            return res.status(404).json({ mensaje: "Artista no encontrado" });
        }

        res.status(200).json({ mensaje: "Artista borrado exitosamente" });
    } catch (error) {
        console.error('Error al borrar el artista: ' + error);
        res.status(500).json({ mensaje: "Error al borrar el artista", error: error.message });
    }
});


