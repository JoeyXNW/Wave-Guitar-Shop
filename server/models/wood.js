const mongoose = require("mongoose");

const woodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 1000
  }
});

const Wood = mongoose.model("Wood", woodSchema);
module.exports = { Wood };
