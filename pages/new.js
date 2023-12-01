import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
export default function newMeetup() {
  const router=useRouter();
  async function onAddMeetup(data) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData= await response.json();
    console.log(resData);
    
    router.push("/")
  }
  return <NewMeetupForm onAddMeetup={onAddMeetup} />;
}
