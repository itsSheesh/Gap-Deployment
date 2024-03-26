import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { useAuthContext } from "../../context/AuthContext";

const Conversations = () => {
  const { authUser } = useAuthContext();
  const { loading, conversations } = useGetConversations();
  const me = authUser._id
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => {

        const otherParticipant = conversation.participants.find(
          (participant) => participant._id !== me
        );

        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIndex={index === conversations.length - 1}
            profilePic={otherParticipant?.profilePic}
            fullName={otherParticipant?.fullName}
          />
        );
      })}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
