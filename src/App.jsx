import { Spinner } from "@nextui-org/react";
import { HourChip } from "./components/hourChip.jsx";
import { WeatherChip } from "./components/weatherChip.jsx";
import { IconContext } from "react-icons";
import { FaLocationDot } from "react-icons/fa6";
import { WiMoonAltFull, 
         WiMoonAltNew,
         WiMoonAltWaxingCrescent2,
         WiMoonAltFirstQuarter,
         WiMoonAltWaxingGibbous2,
         WiMoonAltWaningGibbous2,
         WiMoonAltThirdQuarter,
         WiMoonAltWaningCrescent5
        } from "react-icons/wi";
import { BsFillCloudyFill,
         BsFillCloudsFill 
        } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { getLocation } from "./api/getLocation.js";
import { getWeather } from "./api/getWeather.js";
import { useQuery } from "react-query";
import moment from "moment";

function App() {

  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
  });

  const weather = useQuery({
    queryKey: ["weather", location],
    queryFn: () => getWeather(location.data?.latitude, location.data?.longitude),
    enabled: location.isSuccess,
  });
  
  if (location.isLoading || weather.isLoading) {
    return <Spinner label="Loading"/>;
  }

  if (location.isError || weather.isError) {
    return <div>Error fetching data</div>;
  }

  const weatherImage = () => {
    if (Math.round(weather.data[0].total_index) <=50) {
      return <BsFillCloudsFill size={35}/>
    } else if (Math.round(weather.data[0].total_index) < 90) {
      return <BsFillCloudyFill size={35}/>
    } else {
      return <BsFillMoonStarsFill size={35}/>
    }
  }

  const moonImage = () => {
    if (weather.data[0].moon_phase == "New Moon") {
      return <WiMoonAltFull size={45}/>
    } else if (weather.data[0].moon_phase == "Waxing Crescent") {
      return <WiMoonAltWaningGibbous2 size={45}/>
    } else if (weather.data[0].moon_phase == "First Quarter") {
      return <WiMoonAltThirdQuarter size={45}/>
    } else if (weather.data[0].moon_phase == "Waxing Gibbous") {
      return <WiMoonAltWaningCrescent5 size={45}/>
    } else if (weather.data[0].moon_phase == "Full Moon") {
      return <WiMoonAltNew size={45}/>
    } else if (weather.data[0].moon_phase == "Waning Gibbous") {
      return <WiMoonAltWaxingCrescent2 size={45}/>
    } else if (weather.data[0].moon_phase == "Last Quarter") {
      return <WiMoonAltFirstQuarter size={45}/>
    } else if (weather.data[0].moon_phase == "Waning Crescent") {
      return <WiMoonAltWaxingGibbous2 size={45}/>
    }
  }

  return (
    <div className="bg-gradient-to-br from-oxfordblue to-pennblue font-poppins w-screen h-screen">
      <div className="flex items-center pl-5 pt-5">
        <IconContext.Provider value={{ color: "#e3b950" }}>
          <BiSolidMoon size={28}/>
        </IconContext.Provider>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-white to-periwinkle ml-2">CloudyNight</h1>
      </div>
      <div className="flex justify-center pt-5">
        <div className="w-border10% p-5 text-white rounded-xl bg-white bg-opacity-5">
          <div className="flex items-center justify-between min-w-full">
            <h1 className="font-semibold text-2xl">Today</h1>
            <h2 className="font-light">{moment(weather.data[0].date, "YYYY-MM-DD").format("MMMM, Do")}</h2>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-end">
              <h1 className="text-5xl">{Math.round(weather.data[0].total_index)}</h1>
              <h1 className="font-light text-gold ml-1">T.I.</h1>
            </div>
            <div className="flex gap-x-3 items-center">
              {weatherImage()}
              {moonImage()}
            </div>
          </div>
          <div className="flex items-center mt-3 pb-1">
            <IconContext.Provider value={{ color: "#e3b950" }}>
              <FaLocationDot size={12}/>
            </IconContext.Provider>
            <p className="font-light pl-1">{weather.data[0].location}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex mt-3 gap-x-3 w-border10%">
          {
          weather.data.map((item, index) => {
            if (index == 0) return;
            return <WeatherChip weatherdata={item} key={index} bg={index % 2 == 0}/>
          })
          }
        </div>
      </div>
      <div className="flex justify-center mt-8 h-height10%">
        <div className="flex flex-col gap-y-3 w-border10% overflow-scroll rounded-xl shadow-inner">
          {
          weather.data[0].night.map((item, index) => {
            if (item.time_epoch + 3600 < moment().unix()) return;
            return <HourChip weatherhour={item} key={index}/>
          })
          }
        </div>
      </div>
      <div className="text-xs">
        <p className="text-center text-white font-light text-opacity-50 mt-5">Made with ❤ by <a href="https://github.com/UnTizioCheEsiste" className="text-white font-light text-opacity-50 hover:text-opacity-100">UnTizioCheEsiste</a></p>
      </div>
    </div>
  );
}

export default App;