import app from "./app.js";
import connectDb from "./databse/connection.js";

const db_url = `mongodb+srv://DhyeyPatel:DhyeyPatel%4018@atlascluster.etej1ka.mongodb.net/inventery`;
const port = 3000;

// Connect to MongoDB
connectDb(db_url).then(function (connection) {
  console.log("Connected to MongoDB!");
  app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
  });
});
