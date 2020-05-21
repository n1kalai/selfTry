import React from "react";
import { NavLink } from "react-router-dom";
import folder from "../assets/icons/folder.png";
import file from "../assets/icons/file.png";
import note from "../assets/icons/notes.png";
import abc from "../assets/icons/abc.png";
const Header = () => {
  return (
    <nav className="leftNav">
      <ul className="navigation">
        <li>
          <NavLink to="/" className="navA">
            <img src={folder} alt="■" /> Folders
          </NavLink>
        </li>
        <li>
          <NavLink to="/files" className="navA">
            <img src={file} alt="■" /> Files
          </NavLink>
        </li>
        <li>
          <NavLink to="/keywords" className="navA">
            <img src={abc} alt="■" /> Keywords
          </NavLink>
        </li>
        <li>
          <NavLink to="/notes" className="navA">
            <img src={note} alt="■" /> Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
