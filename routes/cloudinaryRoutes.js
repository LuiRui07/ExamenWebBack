const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require ("multer");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");


router.use(express.json());
const fileUpload = multer();


cloudinary.config({ 
    cloud_name: 'dj8csnofh', 
    api_key: '597548295124334', 
    api_secret: 'pLabEZCvj0zgN9yfWAJM1IvUmxA' 
  });


router.post('/subirFoto', fileUpload.single('imagen'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (result, error) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
  
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
  
    async function upload(req) {
      try {
        let result = await streamUpload(req);
        res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
      } catch (error) {
        console.log('Error al subir la imagen: ', error)
        res.status(500).json({ message: 'Error al subir la imagen:', error});
      }
    }
  
    upload(req);
  });

  // Obtener una imagen de Cloudinary con su id
router.get('/id/:public_id', async (req, res) => { 
  try {
    const { public_id } = req.params; 
    const resultado = await cloudinary.image(public_id); // Obtiene la imagen de Cloudinary
    console.log(resultado); // Imprime los detalles de la imagen en la consola
    res.json(resultado); // Devuelve los detalles de la imagen como respuesta
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la imagen de Cloudinary' });
  }
});

module.exports = router;