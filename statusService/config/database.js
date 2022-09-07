const mongoose = require("mongoose");
const uri = "mongodb://db-status:27017/StatusDatabase";
const dbName = 'distributed-system'
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