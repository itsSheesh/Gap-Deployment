import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const deleteAccount = async (userName, password) => {
    const success = handleInputErrors({
      userName,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(
        `api/auth/delete?userName=${userName}&password=${password}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user-info");
      setAuthUser(null);
      toast.success("Account Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteAccount };
};

export default useDeleteAccount;

function handleInputErrors({ userName, password }) {
  if (!userName || !password) {
    toast.error("Please fill all the inputs!");
    return false;
  }

  return true;
}
