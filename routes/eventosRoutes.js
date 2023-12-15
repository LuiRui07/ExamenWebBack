const express = require('express');
const router = express.Router();
const eventos = require('../models/eventos.js');

router.use(express.json());

router.get('/', async (req, res) => {
    eventos
        .find()
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/id/:id', async (req, res) => {
    eventos
        .findById(req.params.id)
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});


//Get coordenadas de una dirección a -+ 0.2 
router.get('/lat/:lat/lon/:lon', async (req, res) => {
    try {
      const lat = parseFloat(req.params.lat);
      const lon = parseFloat(req.params.lon);
  
      const data = await eventos.find({
        lat: { $gt: lat - 0.2, $lt: lat + 0.2 },
        lon: { $gt: lon - 0.2, $lt: lon + 0.2 },
      });
  
      console.log('Data: ', data);
      res.json(data);
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

//Crear 
router.post('/', async (req, res) => {
    const evento = new eventos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        lat: req.body.lat,
        lon: req.body.lon,
        imagen: req.body.imagen,
    });
    try {
        const savedEvento = await evento.save();
        res.json(savedEvento);
    } catch (err) {
        res.json({ message: err });
    }
});

//Borrar
router.delete('/:id', async (req, res) => {
    try {
        const removedEvento = await eventos.remove({ _id: req.params.id });
        res.json(removedEvento);
    } catch (err) {
        res.json({ message: err });
    }
});

//Actualizar
router.put('/:id', async (req, res) => {
    try {
        const updatedEvento = await eventos.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    fecha: req.body.fecha,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    imagen: req.body.imagen,
                },
            }
        );
        res.json(updatedEvento);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
