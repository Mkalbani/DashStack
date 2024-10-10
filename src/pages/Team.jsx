import React from "react";
import { Link } from "react-router-dom";
import TeamMemberCard from "../components/Cards/TeamMemberCard";

const Team = ({ members }) => {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Team</h2>
          <Link
            to="/add-team-member"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Member
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {members.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
