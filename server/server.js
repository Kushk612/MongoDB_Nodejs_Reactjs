const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const foodSchema = require("./model/food_model");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

app.listen(3001, () => {
  console.log("hi there you are doing grt!");
});

app.get("/", (req, res) => {
  res.send("using server.js to print it!");
});

mongoose
  .connect("mongodb://localhost:27017/food", { useNewUrlParser: true })
  .then((result) => {
    console.log("connected ");
  })
  .catch((er) => {
    console.log("er : ", er);
  });

var conn = mongoose.connection;

app.post("/insert", (req, res) => {
  const foodDBId = req.body.foodServerId;
  const foodDBName = req.body.foodServerName;

  const foodMenu = new foodSchema({
    foodName: foodDBName,
    foodId: foodDBId,
  });

  foodMenu.save(function (err, result) {
    if (err) return console.error(err);
    console.log(result + " saved to collection.");
    res.send(result);
  });
});

app.post("/display", (req, res) => {
  foodSchema.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    // console.log(res);
    res.send(result);
  });
});

app.post("/update", async (req, res) => {
  const foodDBName = req.body.newFoodName;
  const foodDBId = req.body.newFoodId;
  console.log("body in update", req.body);
  try {
    await foodSchema.findOneAndUpdate(
      { _id: foodDBId },
      { foodName: foodDBName },
      { new: true },
      (err, result) => {
        console.log("updated result", result);
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", (req, res) => {
  const foodDBId = req.body.newFoodId;
  foodSchema.findByIdAndRemove(foodDBId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      res.send(result);
    }
  });
});
