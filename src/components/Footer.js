import React from "react";
import "./Footer.css";

import Typography from '@material-ui/core/Typography';

export default (props) =>
  <div className="Footer">
  <Typography>
  © ALoLStats - v{props.appVersion} - Built: {props.buildDate}
  </Typography>
  </div>;