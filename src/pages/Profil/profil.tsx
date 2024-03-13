import ExperienceCard from "../../components/Cards/Experiencecard";
import ProfileCard from "../../components/Cards/ProfileCard";
import ProfileInfo from "../../components/Cards/Profileinfo";
import ProjectCard from "../../components/Cards/projectCard";
import DefaultLayout from "../../layout/DefaultLayout";

const Profiletest = () => {
    return ( 
    <>
    <DefaultLayout>
     <ProfileCard/>
     <ProfileInfo/>
     <ExperienceCard/>
     <ProjectCard/>
    </DefaultLayout>
    
    </> );
}
 
export default Profiletest;