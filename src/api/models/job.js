const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const JobSchema = new mongoose.Schema({
  contract: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  title: {
    type: String,
    required: true,
    min: 2,
    max: 100,
    unique: true,
  },
  createdAt: {
    type: String,
  },

  content: String,

  recrutements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recrutement",
    },
  ],
  createdBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
JobSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Job", JobSchema);
