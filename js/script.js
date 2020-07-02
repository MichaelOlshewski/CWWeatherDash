$(document).ready(function() {

    $("#searchButton").on("click", function() {
        var currentDay = moment().format("MMMM Do, YYYY");
        var cityInput  = $("#cityInput").val();
        var units = "";

        $("#currentDay").text(currentDay);

        if ($("#fahrenheit").is(":checked")) {
            units = "imperial";
        } else {
            units = "metric";
        }

        var apiKey = "956e3f10f1bb30392cacd6f271ecc9c8";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=" + units + "&uvi" + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
            dataType: "json"
        }).then(function(response) {
            console.log(response)

            var iconCode = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                
            $("#cityDisplay").text(response.name);
                
            $("#owmIcon").attr("src", iconURL);
                
            if (units === "imperial") {
                $("#tempDisplay").text(response.main.temp + "\xB0 F")
                $("#windSpeedDisplay").text(response.wind.speed + " MPH");
            } else {
                $("#tempDisplay").text(response.main.temp + "\xB0 C");
                $("#windSpeedDisplay").text(response.wind.speed + "KPH")
            }
            
            $("#humidDisplay").text(response.main.humidity + "%");
                
            var queryUviURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
                
            $.ajax({
                url: queryUviURL,
                method: "GET",
                dataType: "json"
            }).then(function(uviResponse) {
                console.log(uviResponse)
                var uvIndex = Math.floor(uviResponse.value);
                $("#uvDisplay").text(" " + JSON.stringify(uviResponse.value));
                    
                if (uvIndex >= 0 && uvIndex <= 2) {
                    $("#uvDisplay").addClass("uvIndexLow");
                } else if (uvIndex >= 3 && uvIndex <= 5) {
                    $("#uvDisplay").addClass("uvIndexModerate");
                } else if (uvIndex >= 6 && uvIndex <= 7) {
                    $("#uvDisplay").addClass("uvIndexHigh");
                } else if (uvIndex >= 8 && uvIndex <= 10) {
                    $("#uvDisplay").addClass("uvIndexVeryHigh");
                } else if (uvIndex >= 11 ) {
                    $("#uvDisplay").addClass("uvIndexExtreme");
                };
            });
        })
    })
    
    var productionMode = false;
    if (!productionMode) {
        console.log("Production Mode? " + productionMode);
    }
});