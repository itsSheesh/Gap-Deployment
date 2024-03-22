import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import toast from "react-hot-toast";
import { useContext } from "react";
import { SelectedConversation } from "../../context/SelectedConversaion";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { users } = useGetAllUsers();
  const { setIsSelectedConversation } = useContext(SelectedConversation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 4) {
      toast.error("Enter at least 4 characters");
    } else {
      const conversation = users.find(
        (c) => c.userName.toLowerCase() === search.toLowerCase()
      );
      if (conversation) {
        setSelectedConversation(conversation);
        setIsSelectedConversation(true);
        setSearch("");
      } else toast.error("User Not Found!");
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
