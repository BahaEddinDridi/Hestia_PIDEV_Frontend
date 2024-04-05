import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentRole, selectCurrentUsername} from '../../ApiSlices/authSlice';

const RederactionRoute =  ( {children } ) => {
 
   
     const currentRole = useSelector(selectCurrentRole);
    
     console.log("Current role:", currentRole);
  
 
    if (currentRole === 'jobSeeker' ) {
      return  children;
    } else if (currentRole  === 'professional' || currentRole ==='teacher' ) {
      return <Navigate to="/Profilecompany" />;
     }
    else if (currentRole  === 'admin' ) {
      return <Navigate to={`/Dashboard`} />;}
  
    return null;
  };
  
  export default RederactionRoute;