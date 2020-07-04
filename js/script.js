$(document).ready(function() {
    
    var productionMode = false;

    $("#searchButton").on("click", function() {

        
        var currentDay = moment().format("MMMM Do, YYYY");
        var plus1Day = moment().day(6).format("MM/DD/YYYY");
        var plus2Day = moment().day(7).format("MM/DD/YYYY");
        var plus3Day = moment().day(8).format("MM/DD/YYYY");
        var plus4Day = moment().day(9).format("MM/DD/YYYY");
        var plus5Day = moment().day(10).format("MM/DD/YYYY");
        var cityInput  = $("#cityInput").val();
        var units = "";
        
        if ($("#cityInput").val() === "") {
            $("#blankStateCity").removeClass("hide");
        }

        $("#currentDay").text(currentDay);

        if ($("#fahrenheit").is(":checked")) {
            units = "imperial";
        } else {
            units = "metric";
        }

        var apiKey = "956e3f10f1bb30392cacd6f271ecc9c8";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=" + units + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
            dataType: "json",
            success: (function(response) {

                $("#blankStateCity").addClass("hide");
                $("#noResultError").addClass("hide");

                console.log(response);

                var iconCode = response.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                    
                $("#cityDisplay").text(response.name);

                $("#currentDay").removeClass("hide");
                    
                $("#owmIcon").attr("src", iconURL);
                    
                if (units === "imperial") {
                    $("#tempDisplay").text(response.main.temp + "\xB0 F");
                    $("#windSpeedDisplay").text(response.wind.speed + " MPH");
                } else {
                    $("#tempDisplay").text(response.main.temp + "\xB0 C");
                    $("#windSpeedDisplay").text(response.wind.speed + "KPH");
                }
                
                $("#humidDisplay").text(response.main.humidity + "%");

                if (!productionMode) {
                    console.log("Temperature: " + response.main.temp);
                    console.log("Wind Speed: " + response.wind.speed);
                    console.log("Humidity: " + response.main.humidity);
                    console.log(plus1Day);
                    console.log(plus2Day);
                    console.log(plus3Day);
                    console.log(plus4Day);
                    console.log(plus5Day);
                }
                    
                var queryUviURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
                    
                $.ajax({
                    url: queryUviURL,
                    method: "GET",
                    dataType: "json",
                    success: function(uviResponse) {

                        $("#uvDisplay").text(" " + JSON.stringify(uviResponse.value));
                            
                        var uvIndex = Math.floor(uviResponse.value);

                        if (uvIndex >= 0 && uvIndex <= 2) {
                            $("#uvDisplay").addClass("uvIndexLow");
                            $("#uvDisplay").removeClass("uvIndexModerate");
                            $("#uvDisplay").removeClass("uvIndexHigh");
                            $("#uvDisplay").removeClass("uvIndexVeryHigh");
                            $("#uvDisplay").removeClass("uvIndexExtreme");
                        }
                        if (uvIndex >= 3 && uvIndex <= 5) {
                            $("#uvDisplay").removeClass("uvIndexLow");
                            $("#uvDisplay").addClass("uvIndexModerate");
                            $("#uvDisplay").removeClass("uvIndexHigh");
                            $("#uvDisplay").removeClass("uvIndexVeryHigh");
                            $("#uvDisplay").removeClass("uvIndexExtreme");
                        }
                        if (uvIndex >= 6 && uvIndex <= 7) {
                            $("#uvDisplay").removeClass("uvIndexLow");
                            $("#uvDisplay").removeClass("uvIndexModerate");
                            $("#uvDisplay").addClass("uvIndexHigh");
                            $("#uvDisplay").removeClass("uvIndexVeryHigh");
                            $("#uvDisplay").removeClass("uvIndexExtreme");
                        }
                        if (uvIndex >= 8 && uvIndex < 10) {
                            $("#uvDisplay").removeClass("uvIndexLow");
                            $("#uvDisplay").removeClass("uvIndexModerate");
                            $("#uvDisplay").removeClass("uvIndexHigh");
                            $("#uvDisplay").addClass("uvIndexVeryHigh");
                            $("#uvDisplay").removeClass("uvIndexExtreme");
                        };
                        if (uvIndex >= 10 ) {
                            $("#uvDisplay").removeClass("uvIndexLow");
                            $("#uvDisplay").removeClass("uvIndexModerate");
                            $("#uvDisplay").removeClass("uvIndexHigh");
                            $("#uvDisplay").removeClass("uvIndexVeryHigh");
                            $("#uvDisplay").addClass("uvIndexExtreme");
                        };
                        
                        if (!productionMode) {
                            console.log("UV Index: " + uviResponse.value);
                        }
                    },
                    error: function() {
                        $("#noUVerror").removeClass("hide");
                        $("#uvDisplay").text("Error!");
                    },
                });

                var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=" + units + "&appid=" + apiKey;

                $.ajax({
                    url: fiveDayURL,
                    method: "GET",
                    dataType: "json",
                    success: function(fiveDayResponse) {

                        console.log(fiveDayResponse);

                        var iconCodeSmallDay1 = "https://openweathermap.org/img/w/" + fiveDayResponse.list[4].weather[0].icon + ".png";
                        var iconCodeSmallDay2 = "https://openweathermap.org/img/w/" + fiveDayResponse.list[12].weather[0].icon + ".png";
                        var iconCodeSmallDay3 = "https://openweathermap.org/img/w/" + fiveDayResponse.list[20].weather[0].icon + ".png";
                        var iconCodeSmallDay4 = "https://openweathermap.org/img/w/" + fiveDayResponse.list[28].weather[0].icon + ".png";
                        var iconCodeSmallDay5 = "https://openweathermap.org/img/w/" + fiveDayResponse.list[36].weather[0].icon + ".png";

                        $("#fiveDayDisplay").removeClass("hide");

                        if (units === "imperial") {
                            $("#d1TempDisplay").text("Temp: " + fiveDayResponse.list[4].main.temp + "\xB0 F");
                            $("#d2TempDisplay").text("Temp: " + fiveDayResponse.list[12].main.temp + "\xB0 F");
                            $("#d3TempDisplay").text("Temp: " + fiveDayResponse.list[20].main.temp + "\xB0 F");
                            $("#d4TempDisplay").text("Temp: " + fiveDayResponse.list[28].main.temp + "\xB0 F");
                            $("#d5TempDisplay").text("Temp: " + fiveDayResponse.list[36].main.temp + "\xB0 F");
                        } else {
                            $("#d1TempDisplay").text("Temp: " + fiveDayResponse.list[4].main.temp + "\xB0 C");
                            $("#d2TempDisplay").text("Temp: " + fiveDayResponse.list[12].main.temp + "\xB0 C");
                            $("#d3TempDisplay").text("Temp: " + fiveDayResponse.list[20].main.temp + "\xB0 C");
                            $("#d4TempDisplay").text("Temp: " + fiveDayResponse.list[28].main.temp + "\xB0 C");
                            $("#d5TempDisplay").text("Temp: " + fiveDayResponse.list[36].main.temp + "\xB0 C");
                        }

                        $("#d1Date").text(plus1Day);
                        $("#d1WIcon").attr("src", iconCodeSmallDay1);
                        $("#d1HumidDisplay").text("Humidity: " + fiveDayResponse.list[4].main.humidity + "%");

                        $("#d2Date").text(plus2Day);
                        $("#d2WIcon").attr("src", iconCodeSmallDay2);
                        $("#d2HumidDisplay").text("Humidity: " + fiveDayResponse.list[12].main.humidity + "%");
                        
                        $("#d3Date").text(plus3Day);
                        $("#d3WIcon").attr("src", iconCodeSmallDay3);
                        $("#d3HumidDisplay").text("Humidity: " + fiveDayResponse.list[20].main.humidity + "%");

                        $("#d4Date").text(plus4Day);
                        $("#d4WIcon").attr("src", iconCodeSmallDay4);
                        $("#d4HumidDisplay").text("Humidity: " + fiveDayResponse.list[28].main.humidity + "%");

                        $("#d5Date").text(plus5Day);
                        $("#d5WIcon").attr("src", iconCodeSmallDay5);
                        $("#d5HumidDisplay").text("Humidity: " + fiveDayResponse.list[36].main.humidity + "%");

                    },
                    error: function() {

                    }
                });
            }),
            error: function(response) {
                if (response === "") {
                    $("#noResultError").removeClass("hide");
                }
            }
        });
    });
    
    if (!productionMode) {
        console.log("Production Mode? " + productionMode);
    }
});