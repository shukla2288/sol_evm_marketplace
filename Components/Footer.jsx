import React from "react";

const Footer = ({ setOpenContact, openContact }) => {
  return (
    <footer>
      <div class="container">
        <div class="footer-menu">
          <div class="copyright">
            &copy; 2024 MemePump.net. All rights reserved.
          </div>
          <ul>
            <li>
              <a href="#privacy">Pricing</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#solana">Solana</a>
            </li>
            <li>
              <a
                onClick={() =>
                  openContact ? setOpenContact(false) : setOpenContact(true)
                }
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
