const Joi = require('joi');
const mongoose = require('mongoose');

/*
  1) inside mongoose.model() first Arg is mongoose models name - 'Customer'.
  2) and second Arg is schema of that model.
*/ 
const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateCustomer(Customer) {
  
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  /*
    1) Customer - here we are just passing DBmodel as 1st arg, schema - and joi schema in 2nd Arg. 
    2) if both did not match we eill get an error.
    3) iff both match then nothing.
  */ 
  return Joi.validate(Customer, schema);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;