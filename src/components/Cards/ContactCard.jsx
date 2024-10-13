import { Mail } from "lucide-react";

const ContactCard = ({ name, email, imageSrc }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <img src={imageSrc} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-gray-400 text-sm mt-1">{email}</p>
      <a
        href={`mailto:${email}`} 
        className="mt-4 flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Mail className="mr-2" size={18} />
        Message
      </a>
    </div>
  </div>
);

export default ContactCard;