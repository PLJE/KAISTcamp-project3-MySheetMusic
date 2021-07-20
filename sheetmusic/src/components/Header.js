import React from "react";
import "./Header.css";
import {Link} from 'react-router-dom';
import { Piano } from "./Piano";

const MenuItem = ({ active, children, to }) => (
  <Link to ={to} className="menu-item">
      {children}
  </Link>
);

const Header = () => {
  return (
    <div>
      <div className="logo">
        My Sheet Music
        </div>
      <div className="menu">
        <MenuItem >Sheet Music</MenuItem>
        <MenuItem to ={'/Play'}>Online Piano</MenuItem>
      </div>
    </div>
  );
};

export default Header;