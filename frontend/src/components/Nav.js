//Navigate from page to page

import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="../log">Expense Log</Link>
        <Link to="../config">Configure</Link>
        <Link to="../stats">Stats</Link>
        <Link to="../search">Search</Link>
    </nav>
  );
}

export default Nav;
