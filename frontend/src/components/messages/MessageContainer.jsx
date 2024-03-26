import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import ConversationContext from "../../context/ConversationContext";
import { FaArrowLeftLong } from "react-icons/fa6";

const MessageContainer = () => {
  const {authUser} = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {isSelectedConversation, setIsSelectedConversation } = useContext(ConversationContext);
  const me = authUser._id
  
  const otherParticipant = selectedConversation?.participants.find(
    (participant) => participant._id !== me
  )
  const handleBack = () => {
    setIsSelectedConversation(false)
  }
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className={` flex-1  flex-col ${!isSelectedConversation ? "hidden sm:flex" : "flex"}`}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
            
            <div className="flex items-center gap-3">
            <FaArrowLeftLong className="cursor-pointer hover:text-blue-500" onClick={handleBack} />
              <img
                src={otherParticipant.profilePic}
                className="w-10 h-[50px]"
                alt="profile picture"
              />
              <span className="text-gray-900 flex items-center font-bold">
                {otherParticipant.fullName}
              </span>
            </div>

            <span>({otherParticipant.userName})</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
