const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
router.use(express.json());

const usuariosSchema = require("./productos");

router.get("/", (req, res) => {
    usuariosSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
      
});



module.exports = router;