let mongoose = require("mongoose");

let extraemployeeschema=new mongoose.Schema( {
      Name: String,
      EmailId: String,
      ContactNo: String
  }
);

module.exports = mongoose.model("Extraemployee",extraemployeeschema);




