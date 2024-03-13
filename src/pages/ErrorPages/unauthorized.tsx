import * as React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '2em', color: 'red' }}>Unauthorized Access</h1>
            <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
                You do not have the necessary privileges to access this page.
            </p>
            <Link to="/auth/signin">
                <button
                    style={{
                        padding: '15px 30px',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Go Back to Login
                </button>
            </Link>
        </div>
    );
};

export default Unauthorized;