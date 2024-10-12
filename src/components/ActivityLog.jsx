import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      if (auth.currentUser) {
        try {
          const activitiesRef = collection(db, "activities");
          const q = query(
            activitiesRef,
            where("userId", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc"),
            limit(20)
          );
          const querySnapshot = await getDocs(q);
          const activityList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setActivities(activityList);
        } catch (error) {
          console.error("Error fetching activities:", error);
          toast.error("Error fetching activities: " + error.message);
        }
      }
    };

    fetchActivities();
  }, [auth]);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return "Unknown date";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Activity Log
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {activities.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {activities.map((activity) => (
                <li key={activity.id} className="py-4">
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white">
                          {activity.type}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-300">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No activities found.</p>
          )}

          <div className="mt-6">
            <button
              onClick={() => navigate("/manage-account")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back to Manage Account
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

export default ActivityLog;
