import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import dicksmission from "../../../images/dicks_mission.PNG";
import Donate from "../../donate/Donate";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
     
      <div className="aboutSectionContainer">
      <Typography component="h1">About Us</Typography>
        <div className="header">
          <p>This mobile application aims to provide an infrastructure for retailers and donors to provide items to high schoolers on-demand.
            <br/><br/>Retailers will be able to partner with high schools to tackle specific issues they face and reward their students or teachers for whatever sensible metric they choose
          <ul>
            <li>absenteeism</li>
            <li>student performance</li>
            <li>student-teacher relationship development</li>
          </ul>          
          <br></br>Third-party donors will also be able to contribute to the retailer’s donation program to provide students and teachers with various elements that might be out of reach for the retailer.
          </p>
        <h2 className="homeHeading">Our Impact</h2>
          <Donate />
          {/* <image src={dicksmission} alt="" /> */}
        </div>
        <div>
          {/* <image src={dicksmission} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
