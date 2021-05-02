const request = require("postman-request");
// const dotenv = require("dotenv");
// dotenv.config();

WEATHERSTACK_KEY = "d43f4289f2bc87cbecdb87bc9d007ffd";

const forecast = (longitude, latitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=" +
        WEATHERSTACK_KEY +
        "&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: "Not able to fetch data" }, undefined);
        } else if (body.error) {
            callback({ error: "Unable to find location" }, undefined);
        } else {
            callback(
                undefined,
                `The current temperature is ${body.current.temperature} and it feels like the temperature is ${body.current.feelslike}`
            );
        }
    });
};

module.exports = forecast;
