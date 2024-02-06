import { HiOutlineTrash } from "react-icons/hi2";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import { useState } from "react";

const DeleteButton = () => {
  const { loading, deleteAccount } = useDeleteAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault()
    await deleteAccount(userName, password)
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="mt-auto">
        {!loading ? (
          <HiOutlineTrash
            title="Delete Account"
            className="w-6 h-6 text-white cursor-pointer hover:text-red-500"
            onClick={handleDeleteClick}
          />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </div>
      {isModalOpen && (
        <div>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
              <div>
                <div className="p-4">
                  <p className="text-2xl">Are you sure you want to <span className="text-red-500">delete</span> your account?</p>
                  <div className="my-5">
                    <label className="label p-2">
                      <span className="text-base label-text text-black font-bold">Username</span>
                    </label>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      placeholder="Enter username"
                      className="w-full bg-white input input-bordered h-15 placeholder:text-black text-black"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="text-base label-text font-bold text-black">Password</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter Password"
                      className="w-full bg-white input input-bordered h-15 placeholder:text-black text-black"
                    />
                  </div>
                  <div className="flex justify-end mt-10">
                    <button
                      className="btn bg-white mr-2"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-error" onClick={handleDelete}>
                      {loading ? <span className="loading loading-spinner"></span> : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
