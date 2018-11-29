// create a variable with a few sports teams 
var sports = ["LA Lakers", "LA Rams", "Pittsburgh Steelers"];

//need a function to add gif when button is clicked. using $(this).attr("data-name")
function displayGif () {
    //creating variable that contains button name (data-name)
    var teamGif = $(this).attr("data-name");
    teamGif = teamGif.trim().replace(/ /g, "+");

    //testing if the right name appears
    //commented this out below
    // alert(teamGif);

    //using ajax now to obtain info from giphy website
    //remeber we can use .gitIgnore for API key
    var APIKey = "&api_key=1wM065kHhHtOptZ7714iuCSFEXbhCE4P";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + teamGif + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        $("#gifs").empty();
        console.log(response);
        console.log(response.data[0].images.downsized.url);

        var results = response.data;

        for (var i = 0; i < 10; i++) {
            //add attributes to pictures that contain still url, animated, url, and state as still or animated
            
            //creates div to put the imgs in 
            var gifDiv = $("<div class='imgDiv'>");
            // creats a p element that displaus rating 
            var rating = $("<p class='rating'>").text("Rating: " + results[i].rating.toUpperCase());
            // we need to create an img tag which will dold the imgs
            var sportImage = $("<img>");
            //create attributes that contain still url animated url and state
            sportImage.attr("src", results[i].images.downsized_still.url);
            sportImage.attr("data-still", results[i].images.downsized_still.url);
            sportImage.attr("data-animate", results[i].images.downsized.url);
            sportImage.attr("data-state", "still");
            sportImage.addClass("pics");

            //append both rating and image to gifdiv 
            gifDiv.append(sportImage);
            gifDiv.append(rating);
            

            //append gifdiv to actual HTML
            $("#gifs").append(gifDiv);            
            
        }

        
    });

};
//create a function that has an if/else statement for pictures to move or not
function startStopGif () {
    //this is getting the data state of the image. we used an onclick below
    //this refers to id #gif
    var state = $(this).attr("data-state");
    //checking if state works
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "animate");
    }
}


//function for displaying sports data
function renderButtons() {

    //delete teams prior to adding new teams 
    //we do this so we dont have repeat buttons 
    $("#button-view").empty(); 

    //create a loop to loop through array of teams 
    for (var i = 0; i < sports.length; i++) {
    //create button for each team in array 
    //will add a class of team, attribute with data-name sports of each item in array
    //and the button will have the text of each team in array
    var button = $("<button>");
    button.addClass("team");
    button.attr("data-name", sports[i]);
    button.text(sports[i]);
    $("#button-view").append(button);
    }
};

//create a function that adds the user input into array 
$("#add-team").on('click', function(event){
    event.preventDefault();

    //grabbing the input from text box
    //trim eliminates spaces
    var team = $("#sport-input").val().trim();

    //add the text into our previous sports array
    sports.push(team);

    

    renderButtons();
});

$("#clear").on('click', function() {
    $(".imgDiv").empty();
})


//invoking the functions
$(document).on('click', '.team', displayGif);
$(document).on('click', '.pics', startStopGif);
renderButtons();
