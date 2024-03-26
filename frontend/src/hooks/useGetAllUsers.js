import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation } = useConversation();
  const getUsers = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`api/users/${userId}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      await setSelectedConversation(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUsers };
};

export default useGetAllUsers;
