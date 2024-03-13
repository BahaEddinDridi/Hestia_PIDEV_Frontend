const TeamMemberCard = ({ name, role, imageUrl }) => {
    return (
        <div className="relative group space-y-4 text-center">
            <img
                className="w-56 border border-gray-200 rounded-lg h-64 md:w-64 md:h-80 mx-auto object-cover transition-transform transform-gpu hover:opacity-90 hover:scale-110"
                src={imageUrl}
                alt={name}
                loading="lazy"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    flex items-center justify-center" style={{ top: '70%' }}>
                <div className="absolute bg-white bg-opacity-30 rounded-xl inset-0 text-black text-center opacity-0 group-hover:opacity-100
                        transition-opacity duration-300">
                    <h4 className="text-lg font-semibold">{name}</h4>
                    <span className="block text-sm">{role}</span>
                </div>
            </div>
        </div>
    );
}

export default TeamMemberCard;