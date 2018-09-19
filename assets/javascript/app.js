function makeQueryURL() {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    var queryOptions = {"api-key" : "1ec31beb44ea4bb8bfa0da466d0ac6e1"};

    queryOptions.q = $("#search-term")
        .val()
        .trim();

/*    queryOptions.begin_date = new Date($("#start-year").val()).toISOString().substr(0,19);*/
    var start_year = new Date ($("#start-year").val());
    var day = ("0" + (start_year.getDate() + 1)).slice(-2);
    var month = ("0" + (start_year.getMonth() + 1)).slice(-2);
    var year = start_year.getFullYear();
    console.log([year, month, day].join(''));
    queryOptions.begin_date = [year, month, day].join('');

    var end_year = new Date ($("#end-year").val());
    var day = ("0" + (end_year.getDate() + 1)).slice(-2);
    var month = ("0" + (end_year.getMonth() + 1)).slice(-2);
    var year = end_year.getFullYear();
    console.log([year, month, day].join(''));
    queryOptions.end_date = [year, month, day].join('');

    console.log(queryURL);
    console.log(queryURL + $.param(queryOptions));

    return queryURL + $.param(queryOptions);

}

function displayResults(NYTResponse) {
    console.log(NYTResponse);

    var numArticles = $("#article-num").val();

    for (var k = 0; k < numArticles; k++) {

    }
}

function clearResults() {
    $(".results-display").empty();
}

/*$(document).ready(function() {*/

    $("#start-search").on("click", function(event) {
        event.preventDefault();

        clearResults();

        var queryURL = makeQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayResults).catch(console.log);

    });


    $("#clearForm").on("click", clearResults);

/*
});*/
