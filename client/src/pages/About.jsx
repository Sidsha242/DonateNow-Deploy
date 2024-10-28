import React from "react";
import jay_img from "../images/jay_img.png";
import athul_img from "../images/athul_pic.jpg";
import sid_img from "../images/sid_pic.jpg";
import naamya_img from "../images/Namya_pic.png";

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
        <div className="font-bold text-2xl text-[#3C3C3C] text-center mt-20 mb-16 lg:mb-10">
          Our Team
        </div>
        <div className="flex flex-col space-y-10 p-8 lg:flex-row lg:space-x-28 mb-10 lg:px-36">
          <div className="flex flex-col justify-center items-center">
            <img
              src={jay_img}
              alt="img-1"
              className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"
            ></img>
            <div className="font-bold text-xl">Jay Patel</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={athul_img}
              alt="img-2"
              className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"
            ></img>
            <div className="font-bold text-xl">Athul Srinivas</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={sid_img}
              alt="img-3"
              className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"
            ></img>
            <div className="font-bold text-xl">Sidhant Sharma</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={naamya_img}
              alt="img-4"
              className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"
            ></img>
            <div className="font-bold text-xl">Naamya Patiyal</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
