const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {Genre, validate} = require('../models/genre');
const multer = require('multer');     //using multer we work and handle Images/files in API.

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')          //this will create a folter name "uploads" by itself
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,               //this will indicate file storage; this will create a folder name "uploads" by itself
  limits: {                       //here we can add some limits to the files
    fileSize: 1024 * 1024 * 5         //here we are setting file suze limit
  },
  fileFilter: fileFilter          //here we are just applying some filters.
});  






router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  }
  catch (error) {
    res.send(error);
  }
});

router.post('/', upload.single('genreImage'), async (req, res) => {   //here upload:single used for single file handling
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // console.log(req.file);    //"req.file" is the feature of multer that allow us to access request file & we are logging that files details in console.
    let genre = new Genre({ 
      name: req.body.name,
      genreImage: req.file.path   //this will store files path in Database 
    });
    genre = await genre.save();

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

module.exports = router;