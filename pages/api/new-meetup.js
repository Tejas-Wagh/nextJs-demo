//api/new-meetup mongodb://localhost:27017/Meetups
import { MongoClient } from "mongodb";
export default async function addMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client= await MongoClient.connect("mongodb+srv://Tejas:test@cluster0.zbrvsbj.mongodb.net/test?retryWrites=true&w=majority");
    const db=client.db();
    const collection = db.collection("Meetup");
    await collection.insertOne(data);

    res.status(201).json({message:"Data Inserted!"});
  }
}
