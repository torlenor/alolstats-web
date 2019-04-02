import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

import { CookiesProvider } from 'react-cookie';

import GA from './utils/GoogleAnalytics'
import GAdsense from './utils/GoogleAdsense'

ReactDOM.render(
    <Router>
        <CookiesProvider>
            { GA.init() && <GA.RouteTracker /> }
            <App />
            { <GAdsense /> }
        </CookiesProvider>
    </Router>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
