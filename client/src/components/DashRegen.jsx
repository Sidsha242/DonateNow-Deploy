import React from "react";
import CountUp from "react-countup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const DashRegen = (props) => {
  const totalDays = 58;

  const userRegen = () => {
    //console.log(props.lastDonationDate);
    if (props.lastDonationDate == null) {
      return 0;
    }
    const lastDonated = props.lastDonationDate;
    var today = new Date();
    const donatedDate = new Date(lastDonated);

    const differenceInTime = today - donatedDate;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    //console.log(totalDays - differenceInDays);
    return totalDays - differenceInDays;
  };

  return (
    <div>
      <div className="rounded-md bg-white p-2 flex flex-col space-y-4 lg:flex-row lg:space-x-8 items-center">
        <div className="pt-8">
          <div className="flex">
            <div className="text-red-500 text-3xl lg:text-4xl">
              <CountUp end={userRegen()} duration={10} /> days left to donate
            </div>
            <div className="text-red-500 text-3xl"></div>
          </div>
          <div className="mt-5 border border-red-600 p-2 rounded-lg text-lg">
            {userRegen() <= 0 ? (
              <p className="font-bold">You are eligible to donate!!</p>
            ) : (
              <div>
                <p className="font-bold">
                  Sorry you have to wait a bit longer!
                </p>
                <p className="text-red-600 text-sm">
                  *Donate Now requires users to wait 58 days between donations*
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-3/4 h-3/4  flex flex-col space-y-2 items-center justify-center">
          <CircularProgressbar
            value={((58 - userRegen()) / totalDays) * 100}
            maxValue={100}
            styles={buildStyles({
              pathTransitionDuration: 0.5,
              pathColor: `rgb(239 68 68)`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
          <h1 className="text-red-400 text-xl font-bold">
            Regeneration cycle :{" "}
            {Math.round(((58 - userRegen()) / totalDays) * 100)} %
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DashRegen;
