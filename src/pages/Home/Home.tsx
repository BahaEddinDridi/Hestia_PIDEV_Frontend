import React, {useRef, useState} from 'react';
import HomePageLayout from '../../layout/HomePageLayout';
import SignUpCard from '../../components/Cards/SignUpCard';
import WelcomeCard from '../../components/Cards/WelcomeCard';
import HomeNavBar from "../../components/Header/HomeNavBar";
import HomeNavbar from "../../components/Header/HomeNavBar";
import TeamCard from "../../components/Cards/TeamCard";
import ContactUsForm from "../../components/Forms/ContactUsForm";

const Home: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const signUpRef = useRef<HTMLDivElement>(null);
  return (
    <HomePageLayout>
      <WelcomeCard/>
        <div ref={signUpRef}>
            <SignUpCard />
            <TeamCard/>
            <ContactUsForm/>
        </div>
        <HomeNavbar signUpRef={signUpRef} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </HomePageLayout>
      )
};
export default Home;