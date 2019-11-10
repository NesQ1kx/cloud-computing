import React, { Component }from 'react';
import { NavLink } from 'react-router-dom';

import './Header.component.scss';

export class Header extends Component {

  public render() {
    return (
      <header className="header-c">
        <nav className="nav-container">
            <NavLink  to="/groups" activeClassName="active" className="nav-item">Группы</NavLink>
            <NavLink to="/students" activeClassName="active" className="nav-item">Студенты</NavLink>
        </nav>
      </header>
    );
  }
}
