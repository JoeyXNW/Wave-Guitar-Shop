import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Footer = ({ data }) => {
  return data.siteInfo ? (
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
                  <div>{data.siteInfo[0].address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>{data.siteInfo[0].phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Hours</div>
                  <div>{data.siteInfo[0].hours}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>{data.siteInfo[0].email}</div>
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
  ) : null;
};

export default Footer;
