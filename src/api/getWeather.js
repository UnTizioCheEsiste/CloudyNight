import axios from "axios";
import moment from "moment/moment";

export function getWeather(latitude, longitude) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHERAPI
        }&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`,
        {
          headers: {
          'Access-Control-Allow-Origin': '*',
          }
        }
      )
      .then((response) => {
        // Name of the location
        const locationName = response.data.location.name;

        // Array of objects with the forecast for the next 3 days
        const dates = response.data.forecast.forecastday;

        // Array of every sunrise
        const sunrise = dates.map((date) => date.astro.sunrise);

        // Array of every sunset
        const sunset = dates.map((date) => date.astro.sunset);

        // Array of moon phases
        const moonPhase = dates.map((date) => date.astro.moon_phase);

        // Array of nights
        const nights = getHoursDay(dates, sunrise, sunset);

        // Clearance percentage
        const clearPrecentage = getClearPrecentage(nights);

        // Lunar phase
        const lunarValue = getLunarPhase(moonPhase);

        // Total index
        const totalIndex = getTotalIndex(clearPrecentage, lunarValue);

        // Builing the result object
        const result = [];
        for (let i = 0; i < dates.length; i++) {
          result.push({
            location: locationName,
            date: dates[i].date,
            sunrise: sunrise[i],
            sunset: sunset[i],
            moon_phase: moonPhase[i],
            night: nights[i],
            clear_percentage: clearPrecentage[i],
            total_index: totalIndex[i],
          });
        }

        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getHoursDay(dates, sunrise, sunset) {
  // Obtaining the hour of the sunrise and sunset for each day
  const sunriseTime = sunrise.map((time) => moment(time, "HH:mm  A").hour());
  const sunsetTime = sunset.map((time) => moment(time, "HH:mm  A").hour());

  const hoursDay = dates.map((date, index, elements) => {
    // Index can be 0, 1 or 2
    const ind = index === dates.length - 1 ? index : index + 1;
    // Obtaining sunrise time for the single day - if it is the last day, the sunrise time will be the same as the sunset time of the previous day
    const sunriseHour = sunriseTime[ind];
    // Obtaining sunset time for the single day
    const sunsetHour = sunsetTime[index];

    // Array of objects with the forecast for the night
    const hours = [];

    // Adding hour of the night before
    for (let i = sunsetHour; i < 24; i++) {
      hours.push(date.hour[i]);
    }

    // Adding hour of the night after
    for (let i = 0; i <= sunriseHour; i++) {
      hours.push(elements[ind].hour[i]);
    }

    return hours;
  });

  return hoursDay;
}

function getClearPrecentage(nights) {
  // Array of the clearance percentage for each night
  const clearPrecentage = nights.map((night) => {
    // Array of hours with no clouds
    const clearHours = night.filter((hour) => hour.cloud <= 30);
    // Clearance percentage
    return (clearHours.length * 100) / night.length;
  });
  return clearPrecentage;
}

function getLunarPhase(moonPhase) {
  return moonPhase.map((phase) => {
    switch (phase) {
      case "New Moon":
        return 0;
      case "Waxing Crescent":
        return 5;
      case "First Quarter":
        return 10;
      case "Waxing Gibbous":
        return 15;
      case "Full Moon":
        return 20;
      case "Waning Gibbous":
        return 15;
      case "Last Quarter":
        return 10;
      case "Waning Crescent":
        return 5;
    }
  });
}

function getTotalIndex(clearPrecentage, lunarValue) {
  const totalIndex = [];
  for (let i = 0; i < clearPrecentage.length; i++) {
    totalIndex.push(
      clearPrecentage[i] < lunarValue[i]
        ? clearPrecentage[i]
        : clearPrecentage[i] - lunarValue[i]
    );
  }
  return totalIndex;
}
