const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");

const app = express();
app.use(cors());

// Environmental Variable Config
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

// Import routes
const mods = require("./routes/mods");
const events = require("./routes/events");

// Morgan logging in development mode
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

// JSON Body Parser
app.use(express.json());

// Routes
app.use("/api/v1/mods", mods);
app.use("/api/v1/events", events);

// Server listen
const server = app.listen(process.env.PORT || 5000, () => {
   console.log(
      `Server listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
         .yellow.bold
   );
});
