MAIN READ ME

# 06 Server-Side APIs: Weather Dashboard

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs

√ WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
    * API key with information from: OpenWeather API
        * Get city with Current Weather Data, pull lat and lon for OneCall API
        * Use OneCall API for remaining current/future conditions
    * submitBtn pulls in city input, clears current data

√ WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    * Create list and append to HTML via jquery


**** WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    * API call for 5 day weather (for loop, i=1)
    ### need to align in one group 5 across


WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
    * $(document).on("click", ".previousSearch", function () {
        clear out current data, show prevous search
    }



**** WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
    *Local storage


You are required to submit the following for review:

- The URL of the deployed application.
https://jessicamenius.github.io/06Homework/

- The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.
https://github.com/jessicamenius/06Homework

---

© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
```
