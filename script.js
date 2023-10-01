var lon;
var lat;

const successCallBack = (position) => {
  console.log(position);
  setLocationInMap(position.coords.latitude, position.coords.longitude);
  lon = position.coords.longitude;
  lat = position.coords.latitude;
};

const errorCallBack = (error) => {
  console.log(error);
};

getLocation();

function getLocation() {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
}

function currentLocationBtnOnEnter(params) {
  const currentApiUrl = `https://api.weatherapi.com/v1/current.json?key=542daace8d6e436fb44155115231909&q=${
    lat + "," + lon
  }`;

  $.ajax({
    method: "GET",
    url: currentApiUrl,
    success: (resp) => {
      console.log(resp);
      $("#currentTemperature").text(resp.current.temp_c);
      $("#currentWeatherIcon").attr("src", resp.current.condition.icon);
      $("#currentWeatherCondition").text(resp.current.condition.text);
      $("#date_time").text(resp.location.localtime);
      $("#locationName").text(resp.location.name);
      $("#windDegree").text(resp.current.wind_degree);
      $("#windDir").text(resp.current.wind_dir);
      $("#wind_kph").text(resp.current.wind_kph);
      $("#wind_mph").text(resp.current.wind_mph);
      $("#uv").text(resp.current.uv);
      $("#isDay").text(resp.current.is_day);
      $("#pressure").text(resp.current.pressure_in);
      $("#humidity").text(resp.current.humidity);
      $("#visibility").text(resp.current.vis_km);
      $("#feelslike").text(resp.current.feelslike_c);
      setLocationInMap(resp.location.lat, resp.location.lon);
    },
  });

  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/forecast.json?key=542daace8d6e436fb44155115231909&q=${
      lat + "," + lon
    }&days=5`,
    success: (resp) => {
      console.log(resp);
      $("#forecastIcon1").attr(
        "src",
        resp.forecast.forecastday[1].day.condition.icon
      );
      $("#forecastIcon2").attr(
        "src",
        resp.forecast.forecastday[2].day.condition.icon
      );
      $("#forecastWeather1").text(
        resp.forecast.forecastday[1].day.condition.text
      );
      $("#forecastWeather2").text(
        resp.forecast.forecastday[2].day.condition.text
      );
      $("#forecast_temp1").text(
        resp.forecast.forecastday[1].day.mintemp_c + "c"
      );
      $("#forecast_temp2").text(
        resp.forecast.forecastday[2].day.mintemp_c + "c"
      );
      $("#forecast_date1").text(resp.forecast.forecastday[1].date);
      $("#forecast_date2").text(resp.forecast.forecastday[2].date);
    },
  });
}

function searchBarOnEnter() {
  const searchText = $("#searchField").val();
  const currentApiUrl = `https://api.weatherapi.com/v1/current.json?key=542daace8d6e436fb44155115231909&q=${searchText}`;

  $.ajax({
    method: "GET",
    url: currentApiUrl,
    success: (resp) => {
      console.log(resp);
      $("#currentTemperature").text(resp.current.temp_c + " c");
      $("#currentWeatherIcon").attr("src", resp.current.condition.icon);
      $("#currentWeatherCondition").text(resp.current.condition.text);
      $("#date_time").text(resp.location.localtime);
      $("#locationName").text(resp.location.name);
      $("#windDegree").text(resp.current.wind_degree);
      $("#windDir").text(resp.current.wind_dir);
      $("#wind_kph").text(resp.current.wind_kph);
      $("#wind_mph").text(resp.current.wind_mph);
      $("#uv").text(resp.current.uv);
      $("#isDay").text(resp.current.is_day);
      $("#pressure").text(resp.current.pressure_in);
      $("#humidity").text(resp.current.humidity);
      $("#visibility").text(resp.current.vis_km);
      $("#feelslike").text(resp.current.feelslike_c + " c");
      setLocationInMap(resp.location.lat, resp.location.lon);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log("Error:", textStatus, errorThrown);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No city found for " + searchText,
      });
    },
  });

  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/forecast.json?key=542daace8d6e436fb44155115231909&q=${searchText}&days=5`,
    success: (resp) => {
      console.log(resp);
      $("#forecastIcon1").attr(
        "src",
        resp.forecast.forecastday[1].day.condition.icon
      );
      $("#forecastIcon2").attr(
        "src",
        resp.forecast.forecastday[2].day.condition.icon
      );
      $("#forecastWeather1").text(
        resp.forecast.forecastday[1].day.condition.text
      );
      $("#forecastWeather2").text(
        resp.forecast.forecastday[2].day.condition.text
      );
      $("#forecast_temp1").text(
        resp.forecast.forecastday[1].day.mintemp_c + " c"
      );
      $("#forecast_temp2").text(
        resp.forecast.forecastday[2].day.mintemp_c + " c"
      );
      $("#forecast_date1").text(resp.forecast.forecastday[1].date);
      $("#forecast_date2").text(resp.forecast.forecastday[2].date);
    },
  });
}

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map);

function setLocationInMap(ltg, lng) {
  marker.setLatLng([ltg, lng]).update();
  map.setView([ltg, lng], 15);
}
