import { BsFillCloudyFill,
    BsFillCloudsFill 
   } from "react-icons/bs";
import moment from "moment";
import { BsFillMoonStarsFill } from "react-icons/bs";

export function WeatherChip({ weatherdata, bg }) {

    const weatherImage = () => {
        if (Math.round(weatherdata.total_index) <=50) {
          return <BsFillCloudsFill size={35}/>
        } else if (Math.round(weatherdata.total_index) < 90) {
          return <BsFillCloudyFill size={35}/>
        } else {
          return <BsFillMoonStarsFill size={35}/>
        }
    }

    return (
        <div className='flex justify-between items-center bg-white bg-opacity-5 rounded-xl text-white py-3 px-3 w-1/2'>
            <div className="flex items-center gap-x-1">
                <h1 className="font-bold text-xl">{ moment(weatherdata.date, "YYYY-MM-DD").format("Do") }</h1>
                <h2 className="font-light text-sm">{ moment(weatherdata.date, "YYYY-MM-DD").format("MMM") }</h2>
            </div>
            { weatherImage() }
        </div>
    );
}