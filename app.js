// MAIN VERSION

$(document).ready(function () {
  // DO NOT CHANGE
  var inputText = "";
  var appId = "a50d1656c773eed4f6ac56768b7f8ba2";

  $("#currentDate").text(moment().format("MMMM DD, YYYY"));

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    inputText = $("#inputText").val();
    $("#inputText").val("");
    // console.log(inputText);

    var storeCity = JSON.parse(localStorage.getItem("storeCity")) || [];
    storeCity.push(inputText);

    localStorage.setItem("storeCity", JSON.stringify(storeCity));

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${appId}`,
      dataType: "json",
    }).then(function (res) {
      // console.log(res);
      var cityName = res.name;

      if (storeCity != null) {
        `<li class="btn list-group-item"
        ) ">${cityName}</li>`;
      }

      $("#cityList").append(
        `<li class="btn list-group-item") ">${cityName}</li>`
      );

      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${appId}`,
        dataTye: "json",
      }).then(function (res) {
        console.log(res);

        $("#currentCity").append(
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
            <p>UV index: ${res.current.uvi}</p>
            </div>
          </div>`
        );

        for (var i = 0; i < 6; i++) {
          $("#fiveDay").append(
            `<div card ml-3 mb-3" style="max-width: 9rem;">
            <div class="card-body bg-primary text-light">
            <p>${new Date(res.daily[i].dt * 1000).toLocaleDateString()}
            <div><img src="http://openweathermap.org/img/wn/${
              res.daily[i].weather[0].icon
            }@2x.png"/></div>
            <p>Daily high temp:
            ${((res.daily[i].temp.max - 273.15) * (9 / 5) + 32).toFixed(
              0
            )}°F</p>
            <p>Daily low temp:
            ${((res.daily[i].temp.min - 273.15) * (9 / 5) + 32).toFixed(
              0
            )}°F</p>
          <p>Humidity: ${res.daily[i].humidity}%</p>
          </div>
        </div>`
          );
        }
      });
      // DO NOT CHANGE
    });
  });
});

// $(document).on("click", ".btn", function () {
//   var text = $(this).text();
//   console.log(this);
//   $.ajax({
//     type: "GET",
//     url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
//     dataType: "json",
//   }).then(function (res) {
//     console.log(res);

//     var cityName = res.name;

//     $.ajax({
//       type: "GET",
//       url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
//       dataTye: "json",
//     }).then(function (res) {
//       console.log(res);

//       $("#currentCity").append(
//         `<div class="card">
//         <div class="card-body">
//         <h4>${cityName} <img src="http://openweathermap.org/img/wn/${
//           res.current.weather[0].icon
//         }@2x.png" alt=""></h4>
//         <p>Temperature: ${(
//           (res.current.temp - 273.15) * (9 / 5) +
//           32
//         ).toFixed(0)} °F</p>
//         <p>Humidity: ${res.current.humidity}%</p>
//         <p>Wind Speed: ${res.current.wind_speed} MPH</p>
//         <p>UV Index: ${res.current.uvi}</p>
//         </div>
//       </div>`
//       );
//     });
//   });
// });
// });
