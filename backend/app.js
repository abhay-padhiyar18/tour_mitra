const fs = require("fs");
const path = require("path");
const cors = require('cors');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Load environment variables
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME


const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.use('/uploads/images', express.static(path.join('uploads', 'images')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or your frontend URL
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);


// Unknown Route Handler

// app.use((req, res, next) => {
//   const error = new HttpError("Could Not find this route.", 404);
//   next(error); // Pass the error to the next middleware
// });

// Error Handling Middleware
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  }
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// Connect to MongoDB and start the server
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u6znhbt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
  console.log("Connected to DB!");
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("DB Connection Error:", err);
});
    

