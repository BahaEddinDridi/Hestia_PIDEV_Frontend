import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, BrowserRouter } from 'react-router-dom';

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
import TablesJobsOpportunities from './backoffice/Tables/TableJobOpportunities';
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
import JobOpp from '../src/pages/Opportunity/AddOpp/JobOpp'
import IntershipOpp from '../src/pages/Opportunity/AddOpp/IntershipOpp'
import EditJob from '../src/pages/Opportunity/UpdateOpp/jobUpdate'
import EditInter from '../src/pages/Opportunity/UpdateOpp/intershipUpdate'

import AboutUs from './AboutUs/AboutUs';
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "./ApiSlices/authSlice";
import { useGetUserInfoQuery } from "./ApiSlices/userApiSlice";
import DesactiveAccount from './pages/Profil/desactiveaccoun';
import ProfileCompany from './pages/Profil/profilcompany';
import RederactionRoute from './pages/Profil/rederection';
import ViewCompany from './pages/Profil/viewCompany';
import Detailsjoboffer from './pages/Detailsjoboffer'; import { useRefreshMutation } from './ApiSlices/authApiSlice';
import ProtectedRoute from './pages/Authentication/ProtectedRoute';
import PersistLoginRoute from './pages/Authentication/PersistLoginRoute';
import AdminRoute from './pages/Authentication/SignUpFiles/ProtectedRouteAdmin';
import OfferBrowsePage from './pages/Browsing/JobOfferBrowsing';
import JobOfferView from './pages/Opportunity/JobOfferView';
import Detailsintership from './pages/Detailsintership';
import ApplicationsList from './pages/Applications/ApplicationsList';
import InternshipOfferView from './pages/Opportunity/InternshipOfferView';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [refresh, { isLoading }] = useRefreshMutation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error('Error refreshing credentials:', error);
        console.log('Error status:', error.status);
        if (error.status === 401) {
        } else {
        }
      }
    };

    fetchData();
  }, []);

  //const currentUsername = useSelector(selectCurrentUsername);
  //const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);

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
              <PageTitle title="Home" />
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
          path="/Offers"
          element={
            <>
              <PageTitle title="Browsing Offers" />
              <ProtectedRoute>
                <OfferBrowsePage />
              </ProtectedRoute>
            </>
          } />
        <Route
          path="/Offers/Jobs/:jobId"
          element={
            <>
              <PageTitle title="Apply Now!" />
              <ProtectedRoute>
                <JobOfferView />
              </ProtectedRoute>
            </>
          } />
        <Route
          path="/Offers/Internships/:internshipId"
          element={
            <>
              <PageTitle title="Apply Now!" />
              <ProtectedRoute>
                <InternshipOfferView/>
              </ProtectedRoute>
            </>
          } />
        <Route
          path="/Applications"
          element={
            <>
              <PageTitle title="Your Applications" />
              <ProtectedRoute>
                <ApplicationsList/>
              </ProtectedRoute>
            </>
          } />
          <Route
          path="/Profile"
          element={
            <>
              <PageTitle title="Your Profile" />
              <ProtectedRoute>
                <RederactionRoute>
                  <Profiletest />
                </RederactionRoute>
              </ProtectedRoute>
            </>
          }

        />
        <Route
          path="/Profilecompany"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <ProfileCompany />
              </ProtectedRoute>
            </>
          }

        />
        <Route
          path="/company/:username"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <ViewCompany />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/detailsoffer/:jobId"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <Detailsjoboffer />
              </ProtectedRoute>
            </>
          } />
        <Route
          path="/detailsintership/:id"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <Detailsintership />
              </ProtectedRoute>
            </>
          } />
        <Route
          path="/UserDetails/:id"
          element={
            <>
              <PageTitle title="User Details" />
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/profile/update"
          element={
            <>
              <PageTitle title="Update Your Profile" />
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/desactiveAccount"
          element={
            <>
              <PageTitle title="Update Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <DesactiveAccount />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/desactiveAccount"
          element={
            <>
              <PageTitle title="Update Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DesactiveAccount />
            </>
          }
        />
        <Route
          path="/Otherprofiles/:username"
          element={
            <>
              <PageTitle title="Profile" />
              <ProtectedRoute>
                <OtherProfile />
              </ProtectedRoute>
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
              <PageTitle title="Users List" />
              <AdminRoute>
                <Tables />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/Dashboard/tables-Of-Jobs/Opportunities"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesJobsOpportunities />
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
          path="/Dashboard/tables-Of-Jobs/Opportunities"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesJobsOpportunities />
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
          path="/Dashboard/tables-Of-Jobs"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesJobsOpportunities />
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
              <PageTitle title="Admin Profile" />
              <AdminRoute>
                <ProfileAdmin />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <>
              <PageTitle title="Statistics" />
              <AdminRoute>
                <StatisticPage />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/Dashboard/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <AdminRoute>
                <SettingsAdmin />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/Dashboard/ProfileAdmin/:username/update"
          element={
            <>
              <PageTitle title="Update Admin Profile" />
              <AdminRoute>
                <UpdateProfileAdmin />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/Dashboard/ProfileAdmin/account-security"
          element={
            <>
              <PageTitle title="Security Settings" />
              <AdminRoute>
                <AccountSecurityAdmin />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/tables/AddUser"
          element={
            <>
              <PageTitle title="Adding User" />
              <AdminRoute>
                <AddUser />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
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
              <PageTitle title="Sign in" />

              <SignIn />

            </>
          }
        />
        <Route
          path="/auth/signup/Teacher"
          element={
            <>
              <PageTitle title="Sign up Teacher" />
              <SignUpTeacher />
            </>
          }
        />
        <Route
          path="/auth/signup/Student"
          element={
            <>
              <PageTitle title="Sign up Student" />
              <SignUpStudent />
            </>
          }
        />

        <Route
          path="/auth/signUp/Company"
          element={
            <>
              <PageTitle title="Sign up Company" />
              <SignUpCompany />
            </>
          }
        />
        <Route
          path='/pages/settings'
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path='/pages/settings/updatePassword'
          element={
            <>
              <PageTitle title="update Password" />
              <UpdatePassword />
            </>
          }
        />
        <Route
          path='/pages/settings'
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path='/pages/settings/updatePassword'
          element={
            <>
              <PageTitle title="update Password" />
              <UpdatePassword />
            </>
          }
        />
        <Route
          path="/auth/EmailVerif"
          element={
            <>
              <PageTitle title="Email Verification" />
              <EmailVerif />
            </>
          }
        />
        <Route
          path="/auth/reset-password/:_id/:token"
          element={
            <>
              <PageTitle title="Reset Password" />
              <ResetPasswordPage />
            </>
          }
        />
        <Route
          path='/pages/settings'
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path='/pages/settings/updatePassword'
          element={
            <>
              <PageTitle title="update Password" />
              <UpdatePassword />
            </>
          }
        />
        <Route
          path='/pages/settings'
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path='/pages/settings/updatePassword'
          element={
            <>
              <PageTitle title="Update Password" />
              <UpdatePassword />
            </>
          }
        />
        <Route
          path="/auth/EmailVerif"
          element={
            <>
              <PageTitle title="Email Verification" />
              <EmailVerif />
            </>
          }
        />
        <Route
          path="/auth/reset-password/:_id/:token"
          element={
            <>
              <PageTitle title="Reset Password" />
              <ResetPasswordPage />
            </>
          }
        />
        <Route
          path="/auth/account-security"
          element={
            <>
              <PageTitle title="Account Security" />
              <AccountSecurity />
            </>
          }
        />
        <Route
          path="/auth/security-questions"
          element={
            <>
              <PageTitle title="Security Questions" />
              <SecurityQuestions />
            </>
          }
        />
        <Route
          path='Profile/offer'
          element={
            <>
              <PageTitle title="Offers" />
              <ProtectedRoute>
                <Offers />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path='AboutUs'
          element={
            <>
              <PageTitle title="About Us" />
              <AboutUs />
            </>
          }
        />
        <Route
          path='Profilecompany/:username/Opportunity/job'
          element={
            <>
              <PageTitle title="Add A Job Opportunity" />
              <JobOpp />
            </>
          }
        />
        <Route
          path='Profilecompany/:username/Opportunity/intership'
          element={
            <>
              <PageTitle title="Add An Intership Opportunity" />
              <IntershipOpp />
            </>
          }
        />
        <Route
          path='/Profilecompany/Opportunity/EditJob/:jobId'
          element={
            <>
              <PageTitle title="Edit A Job Opportunity" />
              <EditJob />
            </>
          }
        />

        <Route
          path='/Profilecompany/Opportunity/EditInternship/:internId'
          element={
            <>
              <PageTitle title="Edit A Job Opportunity" />
              <EditInter />
            </>
          }
        />

      </Routes>

    </>
  );
}

export default App;
