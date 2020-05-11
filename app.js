// MAIN VERSION

$(document).ready(function () {
  var inputText = "";
  var appId = "a50d1656c773eed4f6ac56768b7f8ba2";

  $("#currentDate").text(moment().format("MMMM DD, YYYY"));

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    inputText = $("#inputText").val();
    $("#inputText").val("");
    console.log(inputText);
    $("#weatherDisplay").html("");

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${appId}`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var cityName = res.name;

      var storeCity = JSON.parse(localStorage.getItem("storeCity")) || [];
      storeCity.push(inputText);

      window.localStorage.setItem("storeCity", JSON.stringify(storeCity));

      if (storeCity != null) {
        `<li class="btn list-group-item"
        ) ">${cityName}</li>`;
      }

      $("#cityList").prepend(
        `<li class="list-group-item previousSearch") ">${cityName}</li>`
      );

      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${appId}`,
        dataTye: "json",
      }).then(function (res) {
        console.log(res);
        var uvIndex = res.current.uvi;
        $("#weatherDisplay").html("");

        $("#weatherDisplay").prepend(
          `<div class="card-body">
            <h4>${cityName} <img src="http://openweathermap.org/img/wn/${
            res.current.weather[0].icon
          }@2x.png" alt="Weather Icon"></>
            <p>Current temp: ${(
              (res.current.temp - 273.15) * (9 / 5) +
              32
            ).toFixed(0)}°F</p>
            <p>Humidity: ${res.current.humidity}%</p>
            <p>Wind speed: ${res.current.wind_speed} MPH</p>
            <p class="uvIndexColor">UV index: ${uvIndex}</p>
          </div>
          <br>
          <h4>Five Day Forecast:<h4>
          <div class="row" id="fiveDay">`
        );

        if (uvIndex < 2) {
          $(".uvIndexColor").attr("style", "background.-color: green");
        }
        if (uvIndex < 6) {
          $(".uvIndexColor").attr("style", "background-color: yellow");
        }
        if (uvIndex < 8) {
          $(".uvIndexColor").attr("style", "background-color: orange");
        } else {
          $(".uvIndexColor").attr("style", "background-color: red");
        }

        for (var i = 1; i < 6; i++) {
          $("#fiveDay").append(
            `<div class="card card ml-3 mb-3">
            <div class="card-body bg-primary text-light">
            <p class="card-text">${new Date(
              res.daily[i].dt * 1000
            ).toLocaleDateString()}</p>
            <p><img src="http://openweathermap.org/img/wn/${
              res.daily[i].weather[0].icon
            }@2x.png"/></p>
            <p class="card-text">Daily high temp:
            ${((res.daily[i].temp.max - 273.15) * (9 / 5) + 32).toFixed(
              0
            )}°F</p>
            <p class="card-text">Daily low temp:
            ${((res.daily[i].temp.min - 273.15) * (9 / 5) + 32).toFixed(
              0
            )}°F</p>
          <p class="card-text">Humidity: ${res.daily[i].humidity}%</p>
          </div>
          </div>`
          );
        }
      });
    });
  });
});

$(document).on("click", ".previousSearch", function () {
  $("#weatherDisplay").html("");
  var text = $(this).text();
  console.log(this);
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
    dataType: "json",
  }).then(function (res) {
    console.log(res);
    var cityName = res.name;

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
      dataTye: "json",
    }).then(function (res) {
      console.log(res);
      var uvIndex = res.current.uvi

      $("#weatherDisplay").append(
        `<div class="card card ml-3 mb-3">
        <div class="card-body">
        <h4>${cityName} <img src="http://openweathermap.org/img/wn/${
          res.current.weather[0].icon
        }@2x.png" alt=""></h4>
        <p>Temperature: ${((res.current.temp - 273.15) * (9 / 5) + 32).toFixed(
          0
        )} °F</p>
        <p>Humidity: ${res.current.humidity}%</p>
        <p>Wind Speed: ${res.current.wind_speed} MPH</p>
        <p class = "uvIndexColor">UV Index: ${uvIndex}</p>
        <br>
        <h4>Five Day Forecast:<h4>
        <div class="row" id="fiveDay">`
      );

      if (uvIndex < 2) {
        $(".uvIndexColor").attr("style", "background.-color: green");
      }
      if (uvIndex < 6) {
        $(".uvIndexColor").attr("style", "background-color: yellow");
      }
      if (uvIndex < 8) {
        $(".uvIndexColor").attr("style", "background-color: orange");
      } else {
        $(".uvIndexColor").attr("style", "background-color: red");
      }

      for (var i = 1; i < 6; i++) {
        $("#fiveDay").append(
          `<div class="card">
            <div class="card-body bg-primary text-light">
            <p class="card-text">${new Date(
              res.daily[i].dt * 1000
            ).toLocaleDateString()}</p>
            <p><img src="http://openweathermap.org/img/wn/${
              res.daily[i].weather[0].icon
            }@2x.png"/></p>
            <p class="card-text">Daily high temp:
            ${((res.daily[i].temp.max - 273.15) * (9 / 5) + 32).toFixed(
              0
            )}°F</p>
            <p class="card-text">Daily low temp:
            ${((res.daily[i].temp.min - 273.15) * (9 / 5) + 32).toFixed(
              0
            )}°F</p>
          <p class="card-text">Humidity: ${res.daily[i].humidity}%</p>
          </div>
          </div>`
        );
      }
    });
  });
});
