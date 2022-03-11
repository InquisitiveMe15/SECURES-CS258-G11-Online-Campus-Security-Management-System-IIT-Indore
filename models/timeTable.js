var mongoose = require('mongoose');

var timeTableSchema = new mongoose.Schema(
    {
        shift1_1 : String,
        shift2_1 : String,
        shift3_1 : String,
        shift1_2 : String,
        shift2_2 : String,
        shift3_2 : String,
        shift1_3 : String,
        shift2_3 : String,
        shift3_3 : String,
        shift1_4 : String,
        shift2_4 : String,
        shift3_4 : String,
        shift1_5 : String,
        shift2_5 : String,
        shift3_5 : String,
        ID : String

    }
);

module.exports = mongoose.model("timeTable", timeTableSchema);
