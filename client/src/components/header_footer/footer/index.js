import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">WAVES</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>Peace</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>123-456-789</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Hours</div>
                  <div>8:00 - 17:00</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>hello@wave.ca</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <>Drop us a line</>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
