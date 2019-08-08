document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("weatherForm");
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = document.getElementById('searchField').value;
      if (location) {
        getForecast(location, ({ place, forecast, error } = {}) => {
            if (!error) {
                document.getElementById('searchField').value = '';
                document.getElementById('place').innerHTML = place;
                document.getElementById('forecast').innerHTML = forecast;
            } else {
                document.getElementById('forecast').innerHTML = error;
            }
        });
      }
  })

  const getForecast = (location, cb) => {
    document.getElementById('place').innerHTML = '';
    document.getElementById('forecast').innerHTML = 'Loading...';
    fetch("/weather?location=" + location).then(res => {
      res.json().then(data => {
        cb(data);
      });
    });
  };
});
