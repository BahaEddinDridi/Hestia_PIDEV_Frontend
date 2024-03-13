import React from "react";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./SuccessMessage.css"; // Import CSS

const SuccessMessage = ({ onClose }) => {
    return (
        <Snackbar open={true} autoHideDuration={6000} onClose={onClose} className="success-snackbar">
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={onClose}
                severity="success"
                className="success-alert"
            >
                Login successful!
            </MuiAlert>
        </Snackbar>
    );
};

SuccessMessage.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SuccessMessage;
