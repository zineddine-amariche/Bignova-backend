const http = require("http");
const app = require("./src/configs/general.config");
const server = http.createServer(app);
const PORT = 8000;
const connectDB = require("./src/configs/db.config");
require("dotenv").config();
require("express-async-errors");

const port = process.env.PORT || PORT;
// server.listen(8000);

/// server listening
const start = async () => {
  try {
    //console.log(process.env.MONGO_URI)

    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port} `));
  } catch (error) {
    console.log(error);
  }
};

start();
