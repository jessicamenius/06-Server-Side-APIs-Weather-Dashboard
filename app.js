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
      // console.log(res);
      var cityName = res.name;
      var windSpeed = res.wind.speed;
      var tempK = res.main.temp;
      var tempF = (tempK - 273.15) * (9 / 5) + 32;
      var tempF2 = tempF.toFixed(0);
      var humidity = res.main.humidity;
      var lat = res.coord.lat;
      var lon = res.coord.lon;

      localStorage.setItem("cityList", JSON.stringify({ city: cityName }));
      renderCity();

      $("#currentCity").append(`<h4>${cityName}</h4>`);
      $("#currentCity").append(`<br />`);
      $("#currentCity").append(`<p>Temperature: ${tempF2}°F</p>`);
      $("#currentCity").append(`<p>Humidity: ${humidity}%</p>`);
      $("#currentCity").append(`<p>Wind Speed: ${windSpeed} MPH</p>`);

      $("#cityList").append(`<li class="btn list-group-item">${cityName}</li>`);

      var lat = res.coord.lat;
      var lon = res.coord.lon;

      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a50d1656c773eed4f6ac56768b7f8ba2`,
        dataTye: "json",
      }).then(function (uv) {
        console.log(uv);

        var uvIndex = uv.current.uvi;

        $("#currentCity").append(`<p>UV Index: ${uvIndex} </p>`);
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
