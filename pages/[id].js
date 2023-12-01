import MeetupItem from "../components/meetups/MeetupItem";
import ShowDetail from "../components/meetups/ShowDetail";
import { MongoClient, ObjectId } from "mongodb";
export default function ShowDetails({ meetup }) {
  return (
    <ShowDetail
      title={meetup.title}
      address={meetup.address}
      image={meetup.image}
    />
  );
}

export async function getStaticPaths() {

  const client= await MongoClient.connect("mongodb+srv://Tejas:test@cluster0.zbrvsbj.mongodb.net/test?retryWrites=true&w=majority");
  const db= client.db();
  const collection=db.collection("Meetup");
  const meetupsData= await collection.find({},{_id:1});
  const result= meetupsData.toArray();
  return {
    fallback: "blocking",
    paths: (await result).map((meetup)=> ({
      params:{
        id:meetup._id.toString(),
      }
    }))
    
    // [
    //   {
    //     params: {
    //       id: "e1",
    //     },
    //   },
    //   {
    //     params: {
    //       id: "e2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const client = await MongoClient.connect("mongodb+srv://Tejas:test@cluster0.zbrvsbj.mongodb.net/test?retryWrites=true&w=majority");

  const db = client.db();
  const collection = db.collection("Meetup");
  const meetupData = await collection.findOne({ _id: ObjectId });
  return {
    props: {
      meetup: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        address: meetupData.address,
        image: meetupData.image,
      },
    },
  };
}
