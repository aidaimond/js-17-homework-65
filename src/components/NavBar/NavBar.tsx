import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

interface Props {
  pageName: string[] | null;
}

const NavBar: React.FC<Props> = ({pageName}) => {
  const [pages, setPages] = useState<string[] | null>(null);

  useEffect(() => {
    let arrayNavs = pageName ? pageName.filter(item => item !== 'home') : null;
    setPages(arrayNavs);
  }, [pageName])

  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-secondary bg-opacity-75">
      <div className="container-fluid">
        <span className="navbar-brand">Static Pages</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Home
              </NavLink>
            </li>
            {pages && pages.map(name => (
              <li key={name} className="nav-item">
                <NavLink to={"/pages/" + name} className="nav-link">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink to={"/pages/admin"} className="nav-link">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;