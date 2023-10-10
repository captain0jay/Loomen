const mongoose = require('mongoose');
const { Schema } = mongoose;

const agrrementSchema = new Schema({
  name: { type: String},
  url: {type: String},
  github_id: {type: String},
  description: {type: String}
});

const agreementModel = mongoose.model('Agreement',agrrementSchema)
module.exports = agreementModel;