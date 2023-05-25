const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const conection = mongoose.connect(uriDb);

conection
  .then(
    app.listen(PORT, () => {
      console.log(
        "Server running. Use our API on port: 8080. Database connection successful"
      );
    })
  )
  .catch((err) => {
    console.log(`Server not running. Error message ${err.message}`);
    process.exit(1);
  });
