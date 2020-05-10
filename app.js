$(document).ready(function () {
  // DO NOT CHANGE
  var inputText = "";
  var appId = "a50d1656c773eed4f6ac56768b7f8ba2";

  $("#currentDate").text(moment().format("MMMM DD, YYYY"));

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    inputText = $("#inputText").val();
    $("#inputText").val("");
    console.log(inputText);

    var storeCity = JSON.parse(localStorage.getItem("storeCity")) || [];
    storeCity.push(inputText);

    localStorage.setItem("storeCity", JSON.stringify(storeCity));

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${appId}`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
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
          `<div class="card">
            <div class="card-body">
            <h4>${cityName} <img src="http://openweathermap.org/img/wn/${
            res.current.weather[0].icon
          }@2x.png" alt=""></h4>
            <p>Temperature: ${(
              (res.current.temp - 273.15) * (9 / 5) +
              32
            ).toFixed(0)}°F</p>
            <p>Humidity: ${res.current.humidity}%</p>
            <p>Wind Speed: ${res.current.wind_speed} MPH</p>
            <p>UV Index: ${res.current.uvi}</p>
            </div>
          </div>`
        );
      });
      // DO NOT CHANGE
    });
  });

  // $("fiveDay").append();
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
