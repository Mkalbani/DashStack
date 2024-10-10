

const TeamMemberCard = ({ name, role, imageSrc }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <div className="p-4 flex flex-col items-center">
      <img
        src={imageSrc}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-white text-center">{name}</h3>
      <p className="text-gray-400 text-sm mt-1 text-center">{role}</p>
    </div>
  </div>
);


export default TeamMemberCard;

