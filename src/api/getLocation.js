import axios from "axios";

export async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      () => {
        axios
          .get(
            `https://api.geoapify.com/v1/ipinfo?apiKey=${import.meta.env.VITE_GEOAPIFY}`,
            {
              headers: {
              'Access-Control-Allow-Origin': '*',
              }
            }
          )
          .then((response) => {
            const latitude = response.data.location.latitude;
            const longitude = response.data.location.longitude;
            resolve({ latitude, longitude });
          })
          .catch((error) => {
            reject(error);
          });
      },
      {
        enableHighAccuracy: true,
        maximumAge:60000,
        timeout:5000,
      });
  });
}
