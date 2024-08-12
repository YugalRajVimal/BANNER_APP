import React, { useEffect, useState } from "react";
import { updateBannerDetails } from "../api/bannerAPI";

const Dashboard = (props) => {
  const { bannerDetails } = props;

  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [bannerDuration, setBannerDuration] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [showBanner, setShowBanner] = useState("");
  const [closable, setClosable] = useState("");

  useEffect(() => {
    setBannerTitle(bannerDetails.title || "");
    setBannerDescription(bannerDetails.description || "");
    setBannerDuration(bannerDetails.duration?.toString().slice(0,5) || "");
    setBannerUrl(bannerDetails.bannerUrl || "");
    setShowBanner(bannerDetails.showBanner || "");
    setClosable(bannerDetails.closable || "");
  }, [bannerDetails]);

  const isvalidDuration=(duration)=>{
    const durArray = duration.split(":");

    if(durArray.length!==2){
      return false;
    }

    for (let i = 0; i < durArray.length; i++) {
        const timePart = durArray[i];

        if (isNaN(timePart) || Number(timePart) < 0 || Number(timePart) > 59) {
            return false;
        }
    }

    return true;

  }

  const updateBanner = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const duration = formData.get("duration");
    const bannerUrl = formData.get("bannerUrl");
    const showBanner = formData.get("showBanner") === "on" ? 1 : 0;
    const closable = formData.get("closable") === "on" ? 1 : 0;

    if(!isvalidDuration(duration)){
        alert("Invalid Duration \n Format: MM:SS \n Max value: 59:59 (59 Minutes 59 Seconds)");
        return;
    }
    console.log(duration)
    const newBannerDetails = {
      title,
      description,
      duration,
      bannerUrl,
      showBanner,
      closable,
    };

    try {
      const response = await updateBannerDetails(newBannerDetails);
      if (response.status === 200) {
        alert("Banner details updated successfully");
      } else {
        alert("Banner details update failed");
      }
    } catch (error) {
      console.log(error);
      alert("Error in Banner details update");
    }
  };

  return (
    <>
      <h1 className="text-white text-4xl h-[10%] flex justify-center items-center">
        Dashboard
      </h1>
      <form onSubmit={updateBanner} className="h-[90%] w-full">
        <h1 className="text-2xl">Update Banner Details</h1>
        <div className="h-full w-full pl-10 md:pl-20 pt-10 flex">
          <div className="w-full">
            <div className="py-1 flex flex-col md:flex-row ">
              <label className="w-[30%] inline-block" htmlFor="showBanner">
                Show Banner
              </label>
              <input
                className="ml-10 text-sm text-black px-2 border-2 border-white w-5 h-5 rounded-md"
                type="checkbox"
                id="showBanner"
                name="showBanner"
                checked={showBanner}
                onChange={(e) => { setShowBanner(e.target.checked) }}
              />
            </div>
            <div className="py-1 flex flex-col md:flex-row ">
              <label className="w-[30%] inline-block" htmlFor="title">
                Title
              </label>
              <input
                className="ml-10 w-[90%] md:w-[70%] text-black px-2 border-2 border-white w-60 h-10 rounded-md"
                type="text"
                id="title"
                name="title"
                value={bannerTitle}
                onChange={(e) => {
                  setBannerTitle(e.target.value);
                }}
              />
            </div>
            <div className="py-1 flex flex-col md:flex-row ">
              <label className="w-[30%] inline-block" htmlFor="description">
                Description
              </label>
              <textarea
                className="ml-10 w-[90%] md:w-[70%] text-black px-2 border-2 border-white w-60 h-40 rounded-md"
                type="text"
                id="description"
                name="description"
                value={bannerDescription}
                onChange={(e) => {
                  setBannerDescription(e.target.value);
                }}
              />
            </div>
            <div className="py-1 flex flex-col md:flex-row ">
              <label className="w-[30%] inline-block" htmlFor="duration">
                Duration (MM:SS)
              </label>
              <input
                className="ml-10 w-[90%] md:w-[70%] text-black px-2 border-2 border-white w-60 h-10 rounded-md"
                type="text"
                id="duration"
                name="duration"
                value={bannerDuration}
                onChange={(e) => {
                  setBannerDuration(e.target.value);
                }}
              />
            </div>
            <div className="py-1 flex flex-col md:flex-row ">
              <label className="w-[30%] inline-block" htmlFor="bannerUrl">
                BannerURL
              </label>
              <input
                className="ml-10 w-[90%] md:w-[70%] text-black px-2 border-2 border-white w-60 h-10 rounded-md"
                type="text"
                id="bannerUrl"
                name="bannerUrl"
                value={bannerUrl}
                onChange={(e) => {
                  setBannerUrl(e.target.value);
                }}
              />
            </div>
            <div className="py-1 flex flex-col md:flex-row ">
              <label className="w-[30%] inline-block" htmlFor="closable">
                Closable?
              </label>
              <input
                className="ml-10  text-black px-2 border-2 border-white w-5 h-5 rounded-md"
                type="checkbox"
                id="closable"
                name="closable"
                checked={closable}
                onChange={(e) => { setClosable(e.target.checked) }}
              />
            </div>
            <button className="bg-blue-500  w-20 h-10 mt-4 rounded-md">
              Update
            </button>
          </div>
        </div>
      </form>
      <div className="absolute right-[10%] bottom-[10%] ">
        <button onClick={()=>{window.location.href = "/"}} className="px-4 py-1 text-2xl  bg-zinc-700 rounded-md z-90">
          Go to Banner
        </button>
      </div>
    </>
  );
};

export default Dashboard;
