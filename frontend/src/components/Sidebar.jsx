import Conversations from "./sidebar/Conversations";
import DeleteButton from "./sidebar/DeleteButton";
import LogoutButton from "./sidebar/LogoutButton";
import SearchInput from "./sidebar/SearchInput";
import { useContext } from "react";
import { SelectedConversation } from "../context/SelectedConversaion";

const Sidebar = () => {
  const {isSelectedConversation} = useContext(SelectedConversation);

  return (
    <div className={`flex-1 sm:max-w-[400px] ${isSelectedConversation ? "hidden sm:flex" : "flex sm:border-r sm:max-w-[400px]"} border-slate-600 p-4 flex-col`}>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="mt-auto flex justify-between items-center">
        <LogoutButton />
        <DeleteButton />
      </div>
      
    </div>
  );
};

export default Sidebar;
