function makeQueryURL() {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    var queryOptions = {"api-key" : ""};

    queryOptions.q = $("#search-term")
        .val()
        .trim();

    // The following lines of commented out code are for the other method of making the dates optional on the html form.
/*    let start_year = $("#start-year")
        .val()
        .trim();

    if (parseInt(start_year)) {
        queryOptions.begin_date = start_year + "0101";
    }

    let end_year = $("#end-year")
        .val()
        .trim();

    if (parseInt(end_year)) {
        queryOptions.end_date = end_year + "0101";
    }*/

    var start_year = new Date ($("#start-year").val());
    var day = ("0" + start_year.getDate()).slice(-2);
    var month = ("0" + (start_year.getMonth() + 1)).slice(-2);
    var year = start_year.getFullYear();
    console.log([year, month, day].join(''));
    queryOptions.begin_date = [year, month, day].join('');

    var end_year = new Date ($("#end-year").val());
    var day = ("0" + end_year.getDate()).slice(-2);
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

        // Creates an unordered list with the class "article-result" to append to the "results-display"
        let articleList = $("<ul>");
        articleList.addClass("article-result");

        $(".results-display").append(articleList);

        // Fetches the Headline from the object returned from NYT.  And includes with it the number of the article.
        let articleHeadline = article.headline;
        if (articleHeadline && articleHeadline.main) {
            console.log(articleHeadline.main);
            articleList.append($(`<li id='article-headline'>${articleNumber}.)  ${articleHeadline.main}</li>`));
        }

        // Fetches the Byline from the object returned from NYT.
        let articleByline = article.byline;
        if (articleByline && articleByline.original) {
            console.log(articleByline.original);
            articleList.append($(`<li id='article-byline'>${articleByline.original}</li>`));
        }

        // Fetches the Section_Name from the object returned from NYT.
        let articleSection = article.section_name;
        if (articleSection) {
            console.log(articleSection);
            articleList.append($(`<li id='article-section'>${articleSection}</li>`));
        }

        // Fetches the Publication Date from the object returned from NYT.
        let articleDate = new Date (article.pub_date);
        // The following three lines of code are to extract the Month-Day-Year and display it in an easy to read MM-DD-YYYY format.
        var day = ("0" + (articleDate.getDate() + 1)).slice(-2);
        var month = ("0" + (articleDate.getMonth() + 1)).slice(-2);
        var year = articleDate.getFullYear();
        if (articleDate) {
            console.log(articleDate);
            articleList.append($(`<li id='article-date'>${month}-${day}-${year}</li>`));
        }

        // Adds the article url to the list, set to open in a new tab.
        articleList.append($(`<li id='article-link'><a href="${article.web_url}" target="_blank">${article.web_url}</a></li>`))
    }
}
// Function to clear the previous search results =======================================================================

function clearResults() {
    $(".results-display").empty();
}

// All the code for the buttons and interactivity the page needs to work ===============================================

    $("#start-search").on("click", function(event) {
        event.preventDefault();

        // Call function to clear the results board if this has not already been done so
        clearResults();

        var queryURL = makeQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayResults).catch(console.log);

    });


    $("#clearForm").on("click", clearResults);
