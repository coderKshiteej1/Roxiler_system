const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the transaction
const transactionSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  },
  dateOfSale: {
    type: Date,
    required: true
  }
});

// Create the model from the schema
const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;
