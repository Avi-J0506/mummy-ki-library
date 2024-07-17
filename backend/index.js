import express, { response } from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import trucksRoute from "./routes/trucksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

// Handling CORS policy
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Truck Details");
});

//Using booksRoute
app.use("/trucks", trucksRoute);

//MongoDB connection
mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
