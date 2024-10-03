const fs = require("fs");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Application is running",
  });
});

app.get("/raihan", (req, res) => {
  res.status(200).json({ message: "you have hit raihan endpoint!!!" });
});

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Success get cars data",
    isSuccess: true,
    totalData: cars.length,
    data: {
      cars,
    },
  });
});

app.get("/api/v1/cars/:id", (req, res) => {
  // select * from fsw2 where id="1" or NAME="yogi"
  const carId = req.params.id;

  const car = cars.find((i) => i?.id === carId);

  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: "failed retrieve car data",
      isSuccess: true,
      data: {
        car,
      },
    });
  }

  return res.status(200).json({
    status: "Success",
    message: "Success retrieve car data",
    isSuccess: true,
    data: {
      car,
    },
  });
});

app.post("/api/v1/cars", (req, res) => {
  // insert into ......
  const newCar = req.body;

  cars.push(newCar);

  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "Success",
        message: "Success add new car data",
        isSuccess: true,
        data: {
          car: newCar,
        },
      });
    }
  );
});

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi
// membuat middleware sendiri = our own middleware
app.use((req, res, next) => {
  res.status(404).json({ status: "Failed", message: "Ora Ketemu Woii!!!" });
});

app.listen(3000, () => {
  console.log("start aplikasi kita di port 3000");
});
