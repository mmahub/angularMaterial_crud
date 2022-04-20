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