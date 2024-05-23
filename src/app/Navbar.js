import React from 'react';
import Link from 'next/link';
import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">QAA</Link>
      </div>
      <ul className="navbar-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/CreateReport">Create a report</Link></li>
        <li><Link href="/Tools">Tools</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
