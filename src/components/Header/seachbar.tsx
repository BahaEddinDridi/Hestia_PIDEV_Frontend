import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from "../../pages/api";
import { getUserProfile } from '../../pages/api';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  birthDate: string;
  status: string;
  image: string;
  gender: string;
  phoneNumber: string;
}
const SearchBar = () => {

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);


  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      typeof value == 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))

  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEnterOrClick = async(username: string) => {
    const userData = await getUserProfile(username);
    if (filteredUsers.length > 0) {
      
      setSearchTerm(username);
      if (userData.role === 'jobSeeker' ){
      navigate(`/Otherprofiles/${username}`);}
      else if (userData.role === 'professional' ){
        navigate(`/company/${username}`);
      }
      
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Empêcher le comportement par défaut (par exemple, la soumission de formulaire)
      handleEnterOrClick(filteredUsers[0].username);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filteredSuggestions = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (username: string) => {
    setSearchTerm(username);
    setSuggestions([]); // Masquer la liste de suggestions après avoir cliqué sur une suggestion
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative flex flex-col items-center space-y-4">
      <input
        type="text"
        name="Search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        ref={inputRef}
        className="px-4 py-2 rounded-full  border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-64 shadow-sm hover:shadow-md transition-all duration-200"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded overflow-hidden shadow-md" style={{ top: '40px' }}>
          {suggestions.map((user) => (
            <li
              key={user._id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={() => handleEnterOrClick(user.username)}
            >
              <div className="flex items-center">
                <img
                  src={user.image} 
                  alt={user.username}
                  className="w-9 h-9 rounded-full mr-2"
                />
                <span className="text-gray-800">{user.username}</span>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>


  );
};

export default SearchBar;