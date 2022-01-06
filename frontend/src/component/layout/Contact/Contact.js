import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:Customer.Service@dcsg.com?Subject=Dick's%20Sporting%20Goods%20-%20Sports%20Matter%20Campaign">
        <Button>Contact: Customer.Service@dcsg.com</Button>
      </a>
    </div>
  );
};

export default Contact;
