import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAccount = () => {
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
  });
  const { UserName, email } = formData;
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData({
            UserName: userData.UserName || "",
            email: auth.currentUser.email || "",
          });
        }
      }
    };
    fetchUserData();
  }, [auth]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

    const logActivity = async (userId, type, description) => {
      try {
        await addDoc(collection(db, "activities"), {
          userId,
          type,
          description,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error logging activity:", error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: UserName });
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          UserName: UserName,
        });
        await logActivity(
          auth.currentUser.uid,
          "Profile Update",
          "User updated their profile information"
        );
        toast.success("Profile updated successfully!");
        navigate('/')
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Manage Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="UserName"
                className="block text-sm font-medium text-gray-300"
              >
                User Name
              </label>
              <div className="mt-1">
                <input
                  id="UserName"
                  name="UserName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
                  value={UserName}
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white opacity-50"
                  value={email}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Profile
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={() => navigate("/change-password")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
    </div>
  );
};

export default ManageAccount;
