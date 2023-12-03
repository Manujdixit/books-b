import express, { response } from "express";
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//cors middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
