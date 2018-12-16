import React, { Component } from 'react';

import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
    render() {
      return (
        <div className="header">
          <MenuIcon />
  
          <span className="title">
            {this.props.title}
          </span>
  
          <input
            type="text"
            className="searchInput"
            placeholder="Search ..." />
  
          <div className="fa fa-search searchIcon"></div>
          </div>
      )
    }
  }

export default Header;
