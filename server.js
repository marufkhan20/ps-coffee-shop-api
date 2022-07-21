// external imports
const http = require("http");

// internal imports
const app = require("./app/app");
const connectDB = require("./db/db");

// create server
const server = http.createServer(app);

// listening server
const PORT = process.env.PORT;

connectDB(process.env.DB_STRING)
  .then(() => {
    console.log("Database Connected...");
    server.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
