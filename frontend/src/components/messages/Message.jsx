import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} max-w-[200px]`}>
        {message.message}
        <div className="chat-footer mt-2 opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
      </div>
      
    </div>
  );
};

export default Message;
