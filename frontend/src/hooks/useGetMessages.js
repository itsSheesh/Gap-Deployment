import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const {authUser} = useAuthContext()
  const me = authUser._id
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const otherUserId = selectedConversation.participants.find(
    (participant => participant._id !== me)
  )
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${otherUserId._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (otherUserId?._id) getMessages();
  }, [otherUserId?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
