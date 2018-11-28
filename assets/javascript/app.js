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

        for (var i = 0; i < 10; i++) {
            $("#gifs").append("<img class='img' src='" + response.data[i].images.downsized.url + "'/>");
            $("#gifs").append("<h4>Rating: " + response.data[i].rating.toUpperCase() + "</h4>");
        }

        
    });

};


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



//invoking the functions
$(document).on('click', '.team', displayGif);
renderButtons();
