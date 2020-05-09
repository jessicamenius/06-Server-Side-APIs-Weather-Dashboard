$(document).ready(function () {
  $("#currentDate").text(moment().format("MMMM DD, YYYY"));

  var inputText = "";
  var apiID = "a50d1656c773eed4f6ac56768b7f8ba2";

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    inputText = $("#inputText").val();
    renderCity();

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiID}`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var cityName = res.name;
      var lat = res.coord.lat;
      var lon = res.coord.lon;

      window.localStorage.setItem(
        "cityList",
        JSON.stringify({ city: cityName })
      );
      renderCity();

      $("#cityList").append(`<li class="btn list-group-item">${cityName}</li>`);

      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
        dataTye: "json",
      }).then(function (res) {
        console.log(res);

        var windSpeed = res.current.wind_speed;
        var tempK = res.current.temp;
        var tempF = (tempK - 273.15) * (9 / 5) + 32;
        var tempF2 = tempF.toFixed(0);
        var humidity = res.current.humidity;
        var uvIndex = res.current.uvi;
        var icon = res.current.weather[0].icon;

        $("#currentCity").append(
          `<div class="card">
            <div class="card-body">
            <h4>${cityName} <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt=""></h4>
            <p>Temperature: ${tempF2}°F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} MPH</p>
            <p>UV Index: ${uvIndex}</p>
            </div>
          </div>`
        );
      });
    });
  });

  function renderCity() {
    var city = JSON.parse(localStorage.getItem("cityList"));
    if (city != null) {
      $("inputText").val(city.cityName);
    }
  }
});
