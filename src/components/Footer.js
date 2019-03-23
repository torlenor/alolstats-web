import React from "react";
import "./Footer.css";

import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';

export default (props) =>
  <div className="Footer" style={{"textDecoration": "none"}}>
  <Typography>
    Powered by ALoLStats - v{props.appVersion} - Built: {props.buildDate}<br/><Link  style={{"textDecoration": "none", color: "white"}} to={'/impressum'}>Impressum/Disclaimer</Link>
  </Typography>
  </div>;
  