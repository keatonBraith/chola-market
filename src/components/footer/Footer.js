import React from "react";

function Footer(props) {
  return (
    <div className="footer-body">
      <div className="footer-links">
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Amazon</li>
        </ul>
      </div>
      <div>
        <div>2020 Chola Market All Rights Reserved</div>
        <div>
          Follow Us
          <a>F</a>
          <a>A</a>
        </div>
        <div>
          <h3>Newsletter</h3>
          <p>Subscribe to stay up to date on everything Chola Market!</p>
          <input></input>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
