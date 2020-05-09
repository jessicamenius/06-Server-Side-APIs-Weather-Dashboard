$(document).ready(function () {
  $("#currentDate").text(moment().format("MMMM DD, YYYY"));

  var inputText = "";

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    inputText = $("#inputText").val();
    renderCity();

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=$a50d1656c773eed4f6ac56768b7f8ba2`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var cityName = res.name;

      localStorage.setItem("cityList", JSON.stringify({ city: { cityName } }));
      renderCity();

      $("#cityList").append(`<li class="btn list-group-item">${res.name}</li>`);

      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
        dataTye: "json",
      }).then(function (res) {
        console.log(res);

        var tempK = res.current.temp;
        var tempF = (tempK - 273.15) * (9 / 5) + 32;
        var tempF2 = tempF.toFixed(0);
        var humidity = res.current.humidity;
        var uvIndex = res.current.uvi;

        $("#currentCity").append(
          `<div class="card">
            <div class="card-body">
            <h4>${cityName} <img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png" alt=""></h4>
            <p>Temperature: ${tempF2}°F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${res.current.wind_speed} MPH</p>
            <p>UV Index: ${uvIndex}</p>
            </div>
          </div>`
        );
      });
    });
    function renderCity() {
      var city = JSON.parse(localStorage.getItem("cityList"));
      if (city != null) {
        $("inputText").val(city.cityName);
      }
    }
  });

  // $(".storage").each(function () {
  //   $(this)
  //     .children("form")
  //     .children("form-control")
  //     .val(localStorage.getItem($(this)));
  // });

  // $(document).on("click", ".btn", function () {
  //   var text = $(this).text();
  //   console.log(text);
  //   $.ajax({
  //     type: "GET",
  //     url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
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
});
