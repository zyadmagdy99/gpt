import { FaCode } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { PiLightbulb } from "react-icons/pi";
import { VscVscodeInsiders } from "react-icons/vsc";

const chatData = [
    {
      title: "Create image",
      icon: <PiLightbulb />,
      iconColor: "#e2c541",
    },
    {
      title: "Get advice",
      icon: <MdEditNote />,
      iconColor: "#c285c7",
    },
    {
      title: "Summarize text",
      icon: <VscVscodeInsiders />,
      iconColor: "#e86060",
    },
    {
      title: "Code",
      icon: <FaCode />,
      iconColor: "#76d035",
    },
    {
      title: "Help",
      icon: <GiGraduateCap />,
      iconColor: "#76d0eb",
    },
    {
      title: "More",
    },
  ];

export default function Chathelp() {
  return (
    <div className="w-full flex flex-col md:items-center md:flex-row justify-center gap-3">
      {chatData?.map((item,i)=>(
        <div className="flex items-center gap-2 border border-gray-600 px-2 py-1 rounded-full hover:border-white/50 duration-300 hover:bg-white/10" key={i}>
                {item?.icon? <span className="text-xl" style={{color:item?.iconColor}}>
                    {item?.icon}
                </span> :""}
                <p>{item?.title}</p>
        </div>
      ))}
    </div>
  )
}
