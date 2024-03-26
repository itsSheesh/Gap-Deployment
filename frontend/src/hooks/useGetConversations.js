import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("api/users/forsidebar");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data.users)
        setConversations(data.conversations);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations, users };
};

export default useGetConversations;
