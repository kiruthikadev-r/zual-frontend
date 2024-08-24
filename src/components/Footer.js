import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          &copy; {new Date().getFullYear()} Blog App. All rights reserved.
        </div>
      </footer>
    );
  }
}

export default Footer;
