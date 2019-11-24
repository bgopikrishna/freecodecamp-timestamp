const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:time", (req, res) => {
  const timeStamp = req.params.time;
  const isUnixTimeStamp = new Number(timeStamp);
  let time;

  if (isUnixTimeStamp) {
    time = new Date(parseInt(timeStamp));
  } else {
    time = new Date(timeStamp);
  }

  const validTime = time.getTime() ? true : false

  if(validTime){
    res.send({
        unix: time.getTime(),
        utc: time.toUTCString(),
      });
  } else {
      res.status(400).send({
          error: "Invalid Date"
      })
  }
});

const port = process.env.PORT || 3000;
var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
