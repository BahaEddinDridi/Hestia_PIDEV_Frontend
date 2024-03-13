import ExperienceCardAdmin from "../profilAdmin/experiencecardadmin";
import ProfileCardAdmin from "../profilAdmin/ProfileCardAdmin";
import ProfileInfoAdmin from "../profilAdmin/profilAdmininfo";
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";

const ProfileAdmin = () => {
    
    return ( 
    <>
    <DefaultLayoutAdmin>
     <ProfileCardAdmin/>
      <ProfileInfoAdmin/>
     <ExperienceCardAdmin/>
    </DefaultLayoutAdmin>
    
    </> );
}
 
export default ProfileAdmin;