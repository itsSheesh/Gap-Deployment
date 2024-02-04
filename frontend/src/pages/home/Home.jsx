import Sidebar from "../../components/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-black">
        <Sidebar />
        <MessageContainer />
    </div>
  );
};

export default Home;
