$(document).on("click", ".btn", function () {
  var text = $(this).text();
  console.log(this);

  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiID}`,
    dataType: "json",
  }).then(function (res) {
    console.log(res.main.temp);
    var cityName = res.name;
    var tempK = res.main.temp;
    var tempF = (tempK - 273.15) * (9 / 5) + 32;
    var tempF2 = tempF.toFixed(2);

    $("#currentCity").append(`<p>Wind Speed: ${windSpeed} MPH</p>`);
    $("#currentCity").append(`<p>Temperature: ${tempF2}°F</p>`);
    $("#currentDate").append(`<h4>${currentDay}</h4>`);
    $("#currentCity").prepend(`<h4>${cityName}</h4>`);
  });
});
