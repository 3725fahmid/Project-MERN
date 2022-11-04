const mongoose = require('mongoose')

const DB = process.env.DATABASE_URL

// mongoose.connect(DB,{
//     useNewUrlParser: true, 
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// }).then(() => {
//     console.log(`connection sucessful`);
// }).catch((err) => console.log(`connect faild`));

// const DB ="mongodb+srv://fahmid:konokfahmid@cluster0.mviipzv.mongodb.net/mernone?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));