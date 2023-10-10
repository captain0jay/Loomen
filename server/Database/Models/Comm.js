const mongoose = require('mongoose');
const { Schema } = mongoose;

const commSchema = new Schema({
  self: { type: String},
  to: {type: String },
  selfid: { type: String, 
           required: true},
  toid: {type: String,
    required: true},
  as: {type: String},
  producturl: {type: String},
  agsent: {type: string}
});

const commModel = mongoose.model('Comm',commSchema)
module.exports = commModel;