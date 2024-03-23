import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';

import Settings from './pages/Settings';
import Tables from './backoffice/pages/Tables';
import TablesInterships from './backoffice/Tables/TableInterships';
import TablesJobs from './backoffice/Tables/TableJob';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import UpdateProfile from './pages/Profil/Updateprof';
import UserDetails from './backoffice/pages/UserDetails';
import ProfileAdmin from './backoffice/pages/ProfileAdmin';
import StatisticPage from './backoffice/pages/statisticPage';
import SettingsAdmin from './backoffice/pages/settingsAdmin';
import UpdateProfileAdmin from './backoffice/pages/updateProfAdmin';
import AccountSecurityAdmin from './backoffice/pages/AccountSecurityAdmin';
import AddUser from './backoffice/pages/Adduser';
import OtherProfile from './pages/Profil/viewotheruser';
import Unauthorized from './pages/ErrorPages/unauthorized';
import Welcome from './pages/Authentication/Welcome';
import Home from './pages/Home/Home';
import EmailVerif from './pages/Authentication/Reset_Password/EmailVerif';
import ResetPasswordPage from './pages/Authentication/Reset_Password/resetpassword';
import UpdatePassword from './layouts/authentication/components/Security/UpdatePassword/UpdatePassword';
import AccountSecurity from './layouts/authentication/components/Security/AccountSecurity/AccountSecurity';
// import ChoiceOne from './pages/Authentication/SignUpFiles/choiceOne';
import SignUpCompany from './pages/Authentication/SignUpCompany';
import SignUpTeacher from './pages/Authentication/SignUpTeacher';
import Profiletest from './pages/Profil/profil';
import SecurityQuestions from './pages/Authentication/Reset_Password/SecurityQuestions/SecurityQuestions';
import SignUpStudent from './pages/Authentication/SignUpStudent';
import Offers from './Offers/Offers';

import AboutUs from './AboutUs/AboutUs';
import {useSelector} from "react-redux";
import {selectCurrentUsername} from "./ApiSlices/authSlice";
import {useGetUserInfoQuery} from "./ApiSlices/userApiSlice";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

    const currentUsername = useSelector(selectCurrentUsername);
    const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Home />
            </>
          }
        />
        <Route
          path="/Unauthorized"
          element={
            <>
              <Unauthorized />
            </>
          }
        />
        <Route
          path="/welcome"
          element={
            <>
              <Welcome />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/Profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profiletest />
            </>
          }
        />
         <Route
          path="/UserDetails/:id"
          element={
            <>
              <PageTitle title="UserDetails | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UserDetails />
            </>
          }
        />
        <Route
          path="/profile/update"
          element={
            <>
              <PageTitle title="Update Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UpdateProfile />
            </>
          }
        />
        <Route
          path="/Otherprofiles/:username"
          element={
            <>
              <PageTitle title="Update Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <OtherProfile />
            </>
          }
        /> 
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/Dashboard/tables-Of-Users"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/Dashboard/tables-Of-Jobs"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesJobs />
            </>
          }
        />
        <Route
          path="/Dashboard/tables-Of-Interships"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesInterships />
            </>
          }
        />
         <Route
          path="/Dashboard/ProfileAdmin/:username"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProfileAdmin />
            </>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <StatisticPage />
            </>
          }
        />
        <Route
          path="/Dashboard/settings"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SettingsAdmin />
            </>
          }
        />
        <Route
          path="/Dashboard/ProfileAdmin/:username/update"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UpdateProfileAdmin />
            </>
          }
        />
        <Route
          path="/Dashboard/ProfileAdmin/account-security"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AccountSecurityAdmin />
            </>
          }
        />
       
        <Route
          path="/tables/AddUser"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddUser />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup/Teacher"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUpTeacher />
            </>
          }
        />
         <Route
          path="/auth/signup/Student"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUpStudent />
            </>
          }
        />
        
        <Route
          path="/auth/signUp/Company"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUpCompany />
            </>
          }
        />
        <Route
        path='/pages/settings'
        element={
          <>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
          </>
        }
        />
        <Route
        path='/pages/settings/updatePassword'
        element={
          <>
          <PageTitle title="update Password  | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <UpdatePassword />
          </>
        }
        />
        <Route
        path='/pages/settings'
        element={
          <>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
          </>
        }
        />
        <Route
        path='/pages/settings/updatePassword'
        element={
          <>
          <PageTitle title="update Password  | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <UpdatePassword />
          </>
        }
        />
        <Route
          path="/auth/EmailVerif"
          element={
            <>
              <PageTitle title="EmailVerif | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EmailVerif />
            </>
          }
        />
        <Route
          path="/auth/reset-password/:_id/:token"
          element={
            <>
              <PageTitle title="ResetPasswordPage | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ResetPasswordPage />
            </>
          }
        />
        <Route
        path='/pages/settings'
        element={
          <>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
          </>
        }
        />
        <Route
        path='/pages/settings/updatePassword'
        element={
          <>
          <PageTitle title="update Password  | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <UpdatePassword />
          </>
        }
        />
        <Route
        path='/pages/settings'
        element={
          <>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
          </>
        }
        />
        <Route
        path='/pages/settings/updatePassword'
        element={
          <>
          <PageTitle title="update Password  | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <UpdatePassword />
          </>
        }
        />
        <Route
          path="/auth/EmailVerif"
          element={
            <>
              <PageTitle title="EmailVerif | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EmailVerif />
            </>
          }
        />
        <Route
          path="/auth/reset-password/:_id/:token"
          element={
            <>
              <PageTitle title="ResetPasswordPage | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ResetPasswordPage />
            </>
          }
        />
        <Route
          path="/auth/account-security"
          element={
            <>
              <PageTitle title="Account Security | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AccountSecurity />
            </>
          }
        />
        <Route
          path="/auth/security-questions"
          element={
            <>
              <PageTitle title="Security Questions | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SecurityQuestions />
            </>
          }
        />
        <Route
          path='Profile/offer'
          element={
            <>
              <PageTitle title="Offers | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Offers />
            </>
          }
        />
        <Route
          path='AboutUs'
          element={
            <>
              <PageTitle title="AboutUs | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AboutUs />
            </>
          }
        />
      </Routes>
      
      
    </>
  );
}

export default App;
