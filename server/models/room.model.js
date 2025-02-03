const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});
