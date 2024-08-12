import { useEffect, useState } from "react";
import { getBannerDeatils } from "./api/bannerAPI";
import "./App.css";
import Banner from "./Components/Banner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

function App() {
  const [bannerDetails, setBannerDetails] = useState({});

  const loadBannerData = async () => {
      setBannerDetails(await getBannerDeatils());
  };

  useEffect(() => {
    loadBannerData();
  }, []);

  console.log(bannerDetails);

  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>{bannerDetails.id && <Banner bannerDetails={bannerDetails} />}</>
      ),
    },
    {
      path: "/dashboard",
      element: <Dashboard bannerDetails={bannerDetails} />,
    },
  ]);

  return (
    <div className="App relative h-screen w-full p-8">
      <RouterProvider router={BrowserRouter} />
    </div>
  );
}

export default App;
