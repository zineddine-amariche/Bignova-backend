const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  
  {

    title: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    description: {
      type: String,
      required: true,
    },

    image :{
        type :String,
        required:true,

    }

});

const Blog = mongoose.model("Blog", UserSchema);

module.exports = Blog;
