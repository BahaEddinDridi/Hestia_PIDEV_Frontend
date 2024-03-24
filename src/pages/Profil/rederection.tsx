
import { Link } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentRole, selectCurrentUsername} from '../../ApiSlices/authSlice';




const RederactionRoute =  ( {children } ) => {
 
   
     const currentRole = useSelector(selectCurrentRole);
    
     console.log("Current role:", currentRole);
  
 
    if (currentRole === 'jobSeeker' ) {
      return <Link to="/Profile"></Link>;
    } else if (currentRole  === 'professional' ) {
      return <Link to="/Profilecompany"></Link>;
    }
  
    return children;;
  };
  
  export default RederactionRoute;