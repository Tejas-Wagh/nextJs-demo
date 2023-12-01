import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { useState, useEffect } from "react";

export default function HomePage({ meetupData }) {
  return <MeetupList meetups={meetupData} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb://localhost:27017/Meetups");

  const db = client.db();
  const collection = db.collection("Meetup");
  const results = await collection.find().toArray();

  return {
    props: {
      meetupData: results.map((result) => ({
        title: result.title || null,
        image: result.image || null,
        address: result.address || null,
        id:result._id+""  || null,
      })),
    },
    revalidate: 10,
  };
}

// export function getServerSideProps(context){
//     const res=context.res;
//     const req=context.req;

//     return {
//         props:{
//             meetupData:DUMMY_DATA,
//         }
//     };
// }
