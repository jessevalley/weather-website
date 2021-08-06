const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=982ca1975b784c02dcac50f7af87fe2d&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const forecast =
        body.current.weather_descriptions[0] +
        ". It is currently " +
        body.current.temperature +
        " degrees out. It feels like " +
        body.current.feelslike +
        " degrees. The humidity is " +
        body.current.humidity +
        "%.";
      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
