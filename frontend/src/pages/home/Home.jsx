import Sidebar from "../../components/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <>
      <div className="flex h-screen w-full sm:h-[800px] rounded-lg overflow-hidden bg-black">
          <Sidebar />
          <MessageContainer />
      </div>
    </>
  );
};

export default Home;
