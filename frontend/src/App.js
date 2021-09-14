import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const style = {
    color: "blue",
    fontsize: "20px",
    border: "2px solid black",
    width: "50%",
    textalign: "center",
    padding: "10px",
    marginLeft: "25%",
  };

  const [foodName, setFoodName] = useState();
  const [foodId, setfoodId] = useState();

  const [NewFoodName, setNewFoodName] = useState();

  const [show, setShow] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:3001/display").then((response) => {
      console.log(response);
      setShow(response.data);
    });
  }, []);

  // axios
  //   .get("http://localhost:3001/", () => {})
  //   .then((response) => {
  //     console.log(response);
  //   });

  const onUpdate = (NewfoodId) => {
    axios
      .post("http://localhost:3001/update", {
        newFoodName: NewFoodName,
        newFoodId: NewfoodId,
      })
      .then((res) => {
        console.log("response : ", res);
      })
      .catch((er) => {
        console.log("error : ", er);
      });
  };

  const onDelete = (NewfoodId) => {
    axios
      .post("http://localhost:3001/delete", { newFoodId: NewfoodId })
      .then((response) => {
        console.log(response);
      });
  };
  const onSubmit = () => {
    const foodServerName = foodName;
    const foodServerId = foodId;
    axios
      .post(
        "http://localhost:3001/insert",
        { foodServerName, foodServerId },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter your food"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter your ID"
        onChange={(e) => {
          setfoodId(e.target.value);
        }}
      />
      <input type="submit" onClick={onSubmit} />

      {show.map((val) => {
        return (
          <div key={val._id}>
            <h6 style={style}>
              {val.foodName}| {val.foodId}
              <br></br>
              <input
                type="text"
                placeholder="Enter your New food"
                onChange={(e) => {
                  setNewFoodName(e.target.value);
                }}
              />
              <input
                type="submit"
                onClick={() => {
                  onUpdate(val._id);
                }}
              />
              <button
                onClick={() => {
                  onDelete(val._id);
                }}
              >
                Delete
              </button>
            </h6>
          </div>
        );
      })}
    </div>
  );
}

export default App;
