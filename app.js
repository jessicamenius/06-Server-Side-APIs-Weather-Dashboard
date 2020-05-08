$(document).ready(function () {
  var inputText = "";
  var apiID = "a50d1656c773eed4f6ac56768b7f8ba2";

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    inputText = $("#inputText").val();
    $("#inputText").val();

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiID}`,
      dataType: "json",
    }).then(function (res) {
      console.log(res.name);
      var cityName = res.name;
      var tempK = res.main.temp;
      var tempF = (tempK - 273.15) * (9 / 5) + 32;
      var tempF2 = tempF.toFixed(2);
      var windSpeed = res.main.windspeed;
      var currentDay = moment().format("MMMM DD, YYYY");

      localStorage.setItem("cityList", JSON.stringify({ city: cityName }));
      renderCity();

      $("#currentCity").append(`<p>Temperature: ${tempF2}°F</p>`);
      $("#currentCity").append(`<p>Wind Speed: ${windSpeed} MPH</p>`);
      $("#currentDate").append(`<h4>${currentDay}</h4>`);
      $("#currentCity").prepend(`<h4>${cityName}</h4>`);

      $("#cityList").append(`<li class="btn list-group-item">${cityName}</li>`);
    });
    // $(document).on("click", ".btn", function () {
    //   var text = $(this).text();
    //   console.log(this);

    // $.ajax({
    //   type: "GET",
    //   url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiID}`,
    //   dataType: "json",
    // }).then(function (res) {
    //   console.log(res.main.temp);
    //   var cityName = res.name;
    //   var tempK = res.main.temp;
    //   var tempF = (tempK - 273.15) * (9 / 5) + 32;
    //   var tempF2 = tempF.toFixed(2);
    //   var windSpeed = res.main.windspeed;
    //   var currentDay = moment().format("MMMM DD, YYYY");

    //   $("#currentCity").append(`<p>Wind Speed: ${windSpeed} MPH</p>`);
    //   $("#currentCity").append(`<p>Temperature: ${tempF2}°F</p>`);
    //   $("#currentDate").append(`<h4>${currentDay}</h4>`);
    //   $("#currentCity").prepend(`<h4>${cityName}</h4>`);
    // });

    function renderCity() {
      var item = JSON.parse(localStorage.getItem("cityList"));
      var currentHour = moment().format("h");

      if (item != null) {
        $("textInput6").val(item.task);
      }
    }
  });
});
// });
