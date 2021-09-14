const mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: "Required",
  },
  foodId: {
    type: String,
  },
});

const foodCourse = mongoose.model("foodCourse", foodSchema);

module.exports = foodCourse;
