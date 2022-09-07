const mongoose = require("mongoose");
const uri = "mongodb://db-account:27017/AccountDatabase";
const connectDatabase = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;