const request = require("postman-request");
// const dotenv = require("dotenv");
// dotenv.config();

// First we will put a address into mapbox API ane it will return us the co-ordinates
// encodeURIComponent function will take care of special character conversion

MAPBOX_KEY =
    "pk.eyJ1IjoiZGhhdmFsLWNoYW5nYW5pIiwiYSI6ImNrbjFpM3IxYTBtbnkybmxydzU2aTIxMjcifQ.Jl8-WAK10F9F3hLN_w3_Uw";

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=" +
        MAPBOX_KEY +
        "&limit=1";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback({ error: "Unable to connect to location services!" }, undefined);
            return;
        } else if (body.features.length === 0) {
            callback({ error: "Unable to find location. Try another search." }, undefined);
            return;
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
