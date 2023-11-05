import moment from "moment";
import { FaClock } from "react-icons/fa";
import { BsFillCloudyFill, BsFillCloudRainFill, BsFillCloudsFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";

export function HourChip({ weatherhour }) {

    var bg;
    var text;
    var border;

    if (weatherhour.will_it_rain == 1) {
        bg = "bg-periwinkle";
        text = "text-oxfordblue";
    } else {
        bg = `bg-periwinkle bg-opacity-10`;
        text = "text-white";
    }

    if (weatherhour.cloud <= 10) {
        border = "border border-white";
    }

    const weatherinfo = () => {
        if (weatherhour.will_it_rain == 1) {
            return <BsFillCloudRainFill className="text-xl"/>
        } else if (weatherhour.cloud >= 50) {
            return <div className="flex items-center"><h1 className="font-normal">{Math.round(weatherhour.cloud)}%</h1><BsFillCloudsFill className="ml-2 text-xl"/></div>
        } else if (weatherhour.cloud > 10) {
            return <div className="flex items-center"><h1 className="font-normal">{Math.round(weatherhour.cloud)}%</h1><BsFillCloudyFill className="ml-2 text-xl"/></div>
        } else {
            return <BsFillMoonStarsFill className="text-xl"/>
        }
    }

    if (moment().hour() == moment(weatherhour.time, "YYYY-MM-DD HH-mm").hour()) {
        return (
            <div className={bg + ' ' + text + ' ' + border + ' py-3 px-3 rounded-xl flex justify-between items-center'}>
                <div className="grid grid-cols-2 items-center">
                    <FaClock className="text-xl"/>
                    <h1 className="font-bold">{moment(weatherhour.time, "YYYY-MM-DD HH-mm").hour()}:00</h1>
                </div>
                { weatherinfo() }
            </div>
        );
    }

    return (
        <div className={bg + ' ' + text + ' ' + border + ' py-3 px-3 rounded-xl flex justify-between items-center'}>
            <h1 className="font-bold">{moment(weatherhour.time, "YYYY-MM-DD HH-mm").hour()}:00</h1>
            { weatherinfo() }
        </div>
    );
}