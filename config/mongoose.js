
const mongoose = require('mongoose');

const URL = process.env.URL;

mongoose.connect(URL)
.then(()=> console.log('Db Is connected'))
.catch((err)=>console.log('Error connected to Db',err));

module.exports = URL;