$(document).ready(function(){

    let searchDiv = $("#search-term");
    let numRecordsDiv = $("#article-count");
    let startYearDiv = $("#start-year");
    let endYearDiv = $("#end-year");
    let searchButton = $("#run-search");
    let clearResultsButton = $("#clear-all");
    let topArticlesDiv = $("#article-section");

    let userSearch = searchDiv.val();
    let userRecords = numRecordsDiv.val();
    let userStartYear = startYearDiv.val();
    let userEndYear = endYearDiv.val();
    console.log(userSearch);
    console.log(userRecords);

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += '?' + $.param({
      'api-key': "61ed06341dd4482aae67ba3e9d9b6b25",
      'q': userSearch,
      'page': userRecords,
      //'begin_date': userStartYear,
      //'end_date': userEndYear,
      'sort': "newest",
      'facet_field': "source",
      'facet_filter': "true",
      //'fl': "article"
    });

    // let userQuery = "";
    // let APIKey = "&api-key=61ed06341dd4482aae67ba3e9d9b6b25";
    // let queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + userQuery + APIKey;

    searchButton.on("click", function(event) {
        event.preventDefault();
        $.ajax({
            url:queryURL,
            method: "GET",
            crossOrigin: null


        }).then(function(response){
            console.log(response);
            topArticlesDiv.appendTo("#article-section");
            for (let i = 0; i < userRecords; i++) {
                console.log(response.response.docs[i]);
                topArticlesDiv.prepend(response.response.docs[i].snippet);
                $("<br>");
                $("<br>");
            }
        });
        console.log(userSearch);
        console.log(userRecords);
    });

    clearResultsButton.on("click", function() {
        event.preventDefault();
        clear();
        console.log("clear all info");
    })
});