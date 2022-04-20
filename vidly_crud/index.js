
const mongoose = require('mongoose')
const express = require('express');
const app = express();

const genres = require('./routes/genres');
const customers = require('./routes/customers');


mongoose.connect('mongodb://localhost/vidly_crud')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/uploads', express.static('uploads'));   //here we are making projects statisFiles(uploads in our case) puclic to everyone; now goto loca host and paste imgae path you will get that image. e.g: http://localhost:3000/uploads\\1650458754747s1.PNG
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));