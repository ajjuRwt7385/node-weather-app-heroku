const request = require("request");

const weatherKey = `30b5b728913f4ef48761b7b158196b01`;
const getWeather = (lat, lng, place, callback) => {
  const url = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}?units=si&lang=en`;
  request({ url, json: true }, (err, res) => {
    // console.log(res.body.currently);
    if (err) {
      callback({ error: "Unable to connect to the Weather api!" });
    } else if (res.body.error) {
      callback({ error: res.body.error });
    } else {
      const { temperature, precipProbability, summary } = res.body.currently;
      callback({ place, forecast: `${summary}. It is currently ${temperature} degrees out. There is ${precipProbability*100}% chance of rain.` });
      // console.log(chalk.white.inverse(`${summary}. It is currently ${temperature} degrees out. There is ${precipProbability*100}% chance of rain.`));
    }
  });
};
module.exports = getWeather;
