import Chathelp from "@/components/Chathelp";
import Chatinput from "@/components/Chatinput"

interface props {
  params:{id:string}
}
export default function Home({params:{id}}:props) {
  return (
    <main className="min-h-screen  flex flex-col justify-center px-2 items-center">
        <div className="mx-auto w-full flex flex-col items-center gap-5">
          <h2 className="text-xl md:text-3xl font-semibold text-white px-4">
            What can I help with?
          </h2>
          <Chatinput  id={id}/>
          <Chathelp />
        </div>
    </main>
  );
}
