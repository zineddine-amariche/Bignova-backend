const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Job = require("./job");
const RecrutementSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["brouillon", "pending", "validated", "refused"],
    default: "brouillon",
  },
  fullName: {
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
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  cv: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  city: String,
  state: String,
  country: String,
  about: String,

  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
});

RecrutementSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Recrutement", RecrutementSchema);
