import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = (props) => {
  const { bannerDetails } = props;
  const [bannerVisible, setBannerVisible] = useState(true);

  var duration = bannerDetails.duration;
  
  var timeArray = duration.split(":").map(Number);
  const totalSec = parseInt(timeArray[0] * 60) + parseInt(timeArray[1]);
  const [remainingTime, setRemainingTime] = useState(totalSec);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setBannerVisible(false);
    }
  }, [remainingTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    if (minutes === "00") {
      return `${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setBannerVisible(false);
  };

  return (
    <>
    
      <div
        className={`absolute top-[5%] left-[10%] w-[80%] h-[40%] bg-zinc-700 p-4 rounded-xl ${
          bannerVisible ? null : "hidden"
        }`}
        onClick={() => window.open(bannerDetails.bannerUrl, '_blank')}
      >
        <div className="h-[20%] flex justify-between items-center">
          <span id="timer" className="p-4">
            {formatTime(remainingTime)}
          </span>

          <h1 className="text-3xl px-4">{bannerDetails.title}</h1>

          <button onClick={handleButtonClick}>
            {bannerDetails.closable ? <span className="p-4">X</span> : null}
          </button>
          
        </div>

        <div className="h-[80%] flex flex-col justify-between items-center text-black">
          <div
            id="bannerDesc"
            className="h-full w-full p-4 bg-zinc-200 rounded-md overflow-y-auto"
          >
            {bannerDetails.description}
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] bottom-[10%]">
        <button className="px-4 py-1 text-2xl  bg-zinc-700 rounded-md">
          <Link to="/Dashboard">Go to Dashboard</Link>
        </button>
      </div>
    </>

  );
};

export default Banner;
