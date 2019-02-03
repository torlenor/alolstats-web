import React from "react";
import "./Home.css";

import Typography from '@material-ui/core/Typography';

export default () =>
    <div className="Home">
    <Typography variant="h5" gutterBottom component="h3">
            Welcome to ALoLStats!
    </Typography>
    <Typography variant="h6" gutterBottom component="h4">
            Select an option from the App Bar to continue
    </Typography>
    </div>;