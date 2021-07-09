const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MDB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("connected to MongoDB database");
    }
  }
);

const articlesRouter = require("./routes/articles");
app.use("/articles", articlesRouter);

app.listen(PORT, () => console.log("running at port 4000"));
