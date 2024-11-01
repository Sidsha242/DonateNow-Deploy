import React from "react";
const About = () => {
  return (
    <>
      <div className="h-full p-8 font-pop">
        <div className="lg:grid ;g:grid-cols-2">
          <h1 className="font-bold text-3xl pt-10 lg:text-6xl">
            Hi we are <br></br>DonateNow
          </h1>
          <p className="pt-5 text-lg">
            Our aim is to provide hospitals a tool to request blood donations
            quicky and efficiently.<br></br>
            The application allows for efficient matching of available blood
            types with the need of patients and hospitals.
            <br></br>It offers a convenient way for donors to schedule
            appointments and find donation centers near them.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
