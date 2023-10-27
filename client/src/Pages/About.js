import React from "react";
import iphoneimg from "../Images/woman_donate.gif";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div className="h-screen p-5 grid grid-cols-2">
        <div>
          <h1 className="font-bold text-5xl pt-10 font-poppins">
            Hi we are DonateNow
          </h1>
          <p className="pt-5 text-lg font-poppins">
            Our aim is to provide hospitals a tool to request blood donations
            quicky and efficiently.<br></br>
            The application allows for efficient matching of available blood
            types with the need of patients and hospitals.
            <br></br>It offers a convenient way for donors to schedule
            appointments and find donation centers near them.
          </p>
        </div>
        <div>
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <img src={iphoneimg}></img>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
