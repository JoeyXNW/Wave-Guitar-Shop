const mongoose = require("mongoose");

const guitarSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    price: {
      type: Number,
      required: true,
      maxlength: 255
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },
    shipping: {
      type: Boolean,
      required: true
    },
    available: {
      required: true,
      type: Boolean
    },
    wood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wood",
      required: true
    },
    frets: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      required: true,
      maxlength: 255
    },
    publish: {
      type: Boolean,
      required: true
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Guitar = mongoose.model("Guitar", guitarSchema);

module.exports = { Guitar };
