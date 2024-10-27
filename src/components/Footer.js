import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container text-center py-4">
        <div className="row">
          <div className="col">
            <h5>MANA</h5>
            <p>
              MANA connects customers with their favorite places, offering exclusive updates and discounts. <a className="orange nodecoration" href="http://localhost:3001/create-account">Join us today</a>!
            </p>
            <p>Connecting companies and customers for lasting relationships!</p>
          </div>
        </div>
        <div className="mt-4">
          <p>&copy; {new Date().getFullYear()} MANA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;