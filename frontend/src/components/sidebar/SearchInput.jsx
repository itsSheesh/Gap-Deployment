import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import toast from "react-hot-toast";
import { useContext } from "react";
import ConversationContext from "../../context/ConversationContext";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { getUsers } = useGetAllUsers();
  
  const { setIsSelectedConversation } = useContext(ConversationContext);
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 4) {
      toast.error("Enter at least 4 characters");
    } else {
      getUsers(search);

      setIsSelectedConversation(true);
      setSearch("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search for people..."
        className="input input-bordered rounded-lg flex-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn bg-blue-600 text-white">
        <IoSearchSharp className="w-5 h-5 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
