const weather = document.querySelector(".js-weather");

const API_KEY = "9f7feb05b3873b42ad9b9178641c8060";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
      //then 데이터가 완전히 넘어왔을때 함수를 호출한다.
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `현재 온도는 ${temperature}C'

       현재 장소는 ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem("coords", JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,

    //position 객체 안에 coords가 있고 그 안에 lat, long이 있는 상황
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoErro() {
  console.log("can't access");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErro);

  //navigator API 사용
}

function loadCoords() {
  const loadedCoords = localStorage.getItem("coords");
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
