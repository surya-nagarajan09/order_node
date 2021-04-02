require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const cors = require('cors')

const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const app = express();
app.use(cors())

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("order");
    let data = await db.collection("data").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});
app.post("/create_order", async (req, res) => {
  try {
    let client = await mongoClient.connect(dbUrl);
    let db = client.db("order");
    await db.collection("data").insertOne(req.body);
    res.status(200).json({ message: "product created" });
    client.close();
  } catch (error) {
    console.log(error);
  }
});




app.listen(port, () => console.log("App runs with 4000"));