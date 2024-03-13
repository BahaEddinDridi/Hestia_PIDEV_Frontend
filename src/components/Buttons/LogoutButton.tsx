import {useSendLogoutMutation} from "../../ApiSlices/authApiSlice";
import {useNavigate} from "react-router-dom";


const LogoutButton = () => {
    const [sendLogout, { isLoading }] = useSendLogoutMutation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            // @ts-ignore
            await sendLogout();
            console.log('Logout successful');
            navigate('/auth/signin');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };
    return (
        <button onClick={handleLogout} disabled={isLoading}>
            Logout
        </button>
    );
};

export default LogoutButton;
