import React from 'react';
import NavBar from './Navbar';
import './globals.css';

const Layout = ({ children }) => {
  return (
    <html>
      <body>
          <NavBar/>
          <main>{children}</main>
      </body>
    </html>
  );
}

export default Layout;