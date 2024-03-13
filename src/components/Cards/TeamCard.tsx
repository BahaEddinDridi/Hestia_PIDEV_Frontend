import BahaEddine from "../../images/team/BahaEddine.jpg"
import CVBaha from "../../images/team/CVBaha.jpg"
import Mohsen from "../../images/team/Mohsen.jpg"
import CVMohsen from "../../images/team/CVMohsen.jpg"
import Farah from "../../images/team/Farah.jpg"
import CVFarah from "../../images/team/CVFarah.jpg"
import Oumaima from "../../images/team/Oumaima.jpg"
import Sarra from "../../images/team/Sarrah.jpg"
import TeamMemberCard from "./TeamMemberCard";
import {useState} from "react";

const TeamCard = () => {
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const isSmallScreen = window.innerWidth < 768;
    const popoverWidth = 132.5;
    const description = "Hestia takes pride not just in cutting-edge web development, " +
        "but also in the exceptional skills and expertise of its team members. " +
        "Our collective efforts are dedicated to a project aimed at streamlining the job-seeking process, " +
        "with a focus on creating innovative solutions for a seamless experience in the employment landscape. " +
        "Together, we bring forth a blend of creativity, " +
        "technical proficiency, and a passion for making a meaningful impact in the world of web development"
    const [popoverVisibility, setPopoverVisibility] = useState({});

    const handleMouseEnter = (name) => {
        setPopoverVisibility((prevVisibility) => ({
            ...prevVisibility,
            [name]: true,
        }));
    };

    const handleMouseLeave = (name) => {
        setPopoverVisibility((prevVisibility) => ({
            ...prevVisibility,
            [name]: false,
        }));
    };

    const teamMembers = [
        {
            name: "Baha Eddine Dridi",
            role: "Scrum Master",
            imageUrl: BahaEddine,
            CVUrl: CVBaha,
            FbLink:"https://www.facebook.com/profile.php?id=100082227907464" ,
            GitLink:"https://github.com/BahaEddinDridi",
            LinkedinLink:"https://www.linkedin.com/in/baha-eddine-dridi-88b039203/"
        },
        {
            name: "Farah Zekri",
            role: "Full-Stack Developer",
            imageUrl: Farah,
            CVUrl: CVFarah,
            FbLink: "",
            GitLink:"",
            LinkedinLink:""
        },
        {
            name: "Mohsen Barnaoui",
            role: "Team Leader",
            imageUrl: Mohsen,
            CVUrl: CVMohsen,
            FbLink:"https://www.facebook.com/mohsen.bernaoui.5",
            GitLink:"https://github.com/mohsen-bernaoui",
            LinkedinLink:"https://www.linkedin.com/in/mohsen-bernaoui-94846b274/"
        },
        {
            name: "Oumaima Fersi",
            role: "Full-Stack Developer",
            imageUrl: Oumaima,
            CVUrl: "",
            FbLink:"",
            GitLink:"",
            LinkedinLink:""
        },
        {
            name: "Sarra Touhami",
            role: "Product Owner",
            imageUrl: Sarra,
            CVUrl: "",
            FbLink:"",
            GitLink:"",
            LinkedinLink:""
        },
    ];

    return (
        <div className="py-20 bg-gray-50 item">
        <div className="container mx-auto px-6 md:px-12 xl:px-12">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">
                    Meet our team!
                </h2>
                <p className="text-gray-600 lg:mx-auto">
                    {/* Your description */}
                </p>
            </div>
            <div className="grid gap-6 items-center md:grid-cols-5">
                {teamMembers.map((member, index) => (
                    <div
                        key={member.name}
                        className="relative inline-block"
                        onMouseEnter={() => handleMouseEnter(member.name)}
                        onMouseLeave={() => handleMouseLeave(member.name)}
                    >
                        <div
                            data-popover-target={`popover-${member.name}`}
                            data-popover-placement={index % 2 === 0 ? "right" : "left"}
                        >
                            <TeamMemberCard
                                name={member.name}
                                role={member.role}
                                imageUrl={member.imageUrl}
                            />
                        </div>
                        {popoverVisibility[member.name] && (
                            <div
                                role="tooltip"
                                className="absolute z-10 inline-block md:w-132.5 text-sm text-gray-500 transition-opacity duration-300 bg-gray-3 dark:bg-black border border-gray-200 rounded-lg shadow-sm opacity-100"
                                style={{
                                    left: isSmallScreen ? "50%" :index === 3 || index === 4 ? "auto" : "100%",
                                    right: isSmallScreen ? "auto" :index !== 3 && index !== 4 ? "auto" : "100%",
                                    transform: isSmallScreen ? 'translateX(-50%)' : 'translateY(-50%)',
                                    width: isSmallScreen ? "100%" : "132.5", // Adjust the width as needed
                                    top: "50%",
                                    marginTop: "-${popoverWidth / 2}px",
                                }}
                            >
                                <div className="px-3 py-2">
                                    <img src={member.CVUrl} alt={member.name} />
                                    <p>Connect with {member.name}!</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <a href={member.FbLink} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-facebook-square text-2xl text-blue-500 hover:text-blue-700"></i>
                                            </a>
                                            <a href={member.GitLink} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-github-square text-2xl text-gray-800 hover:text-gray-600"></i>
                                            </a>
                                            <a href={member.LinkedinLink} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-linkedin text-2xl text-blue-600 hover:text-blue-800"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default TeamCard;