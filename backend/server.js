const express= require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT= 4000;


app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const articlesRouter = require('./routes/articles');
app.use('/articles' , articlesRouter);


app.listen(PORT ,()=> 
console.log("running at port 4000"));

