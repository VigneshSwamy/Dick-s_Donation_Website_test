import React from "react";
import logo from "../../../images/dicks_logo.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
      <a href="mailto:Customer.Service@dcsg.com?Subject=Dick's%20Sporting%20Goods%20-%20Sports%20Matter%20Campaign">CONTACT US</a>
       <a href="https://www.sportsmatter.org/s/terms-of-use">TERMS OF USE</a>
       <a href="https://www.sportsmatter.org/s/privacy-policy">PRIVACY POLICY</a>       
       <a href="https://www.sportsmatter.org/s/accessibility-policy">ACCESSIBILITY POLICY</a>
      </div>

      <div className="midFooter">        
        <img src={logo} alt="" />
        <p>Every Season Starts at DICK'S Sporting Goods</p>
        <p>&copy; 2021 DICK’S Sporting Goods </p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/dickssportinggoods/">Instagram</a>
        <a href="https://www.youtube.com/user/DicksSportingGoods">Youtube</a>
        <a href="https://www.facebook.com/dickssportinggoods">Facebook</a>
        <a href="https://twitter.com/dicks">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
