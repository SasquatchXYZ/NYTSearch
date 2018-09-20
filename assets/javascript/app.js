function makeQueryURL() {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    var queryOptions = {"api-key" : ""};

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
    console.log(numArticles);

    for (var k = 0; k < numArticles; k++) {
        let article = NYTResponse.response.docs[k];

        let articleNumber = k + 1;

        let articleList = $("<ul>");
        articleList.addClass("article-result");

        $(".results-display").append(articleList);

        let articleHeadline = article.headline;

        if (articleHeadline && articleHeadline.main) {
            console.log(articleHeadline.main);
            articleList.append($(`<li id='article-headline'>${articleNumber} <b>${articleHeadline.main}</b></li>`));
        }

        let articleByline = article.byline;
        if (articleByline && articleByline.original) {
            console.log(articleByline.original);
            articleList.append($(`<li id='article-byline'>${articleByline.original}</li>`));
        }

        let articleSection = article.section_name;
        if (articleSection) {
            console.log(articleSection);
            articleList.append($(`<li id='article-section'>${articleSection}</li>`));
        }

        let articleDate = new Date (article.pub_date);
        var day = ("0" + (articleDate.getDate() + 1)).slice(-2);
        var month = ("0" + (articleDate.getMonth() + 1)).slice(-2);
        var year = articleDate.getFullYear();
        if (articleDate) {
            console.log(articleDate);
            articleList.append($(`<li id='article-date'>${month}-${day}-${year}</li>`));
        }

        articleList.append($(`<li id='article-link'><a href="${article.web_url}">${article.web_url}</a></li>`))
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
