const request = require("request");

const mapToken =
  "pk.eyJ1IjoiYWpqdXJ3dDczODUiLCJhIjoiY2p5emdicDlkMDFnYTNicG1jNmE3M2M0NyJ9.JSg4lGYc0UATYf5frgLZLg";
const getGeo = (place, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=${mapToken}&limit=1`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback({ error: "Unable to connect to the Geocoding api!" });
    } else if (res.body.features.length === 0) {
      callback({ error: "Unable to find location, try another search!" });
    } else {
      // console.log(res.body.features[0]);
      const { center, place_name } = res.body.features[0];
      callback({ lat: center[1], lng: center[0], place: place_name });
    }
  });
};

module.exports = getGeo;
