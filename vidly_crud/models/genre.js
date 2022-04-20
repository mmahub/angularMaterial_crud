const Joi = require('joi');
const mongoose = require('mongoose');

// class Genre{
//   constructor(Name){
//       this.Name = Name;
//   }
// }

const Genre = mongoose.model( 'Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  genreImage: {     //this will help in getting the saved images retrieve
    type: String
  }
}));

function validateGenre(Genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(Genre, schema);
}

exports.Genre = Genre; 
exports.validate = validateGenre;