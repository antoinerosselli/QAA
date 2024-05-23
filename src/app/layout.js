import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import BackgroundSquares from './BackSquare';

const Layout = ({ children }) => {
  return (
    <html>
      <body>
          <NavBar/>
          <BackgroundSquares />
          <main>{children}</main>
      </body>
    </html>
  );
}

export default Layout;