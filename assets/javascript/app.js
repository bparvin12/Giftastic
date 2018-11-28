// create a variable with a few sports teams 
var sports = ["LA Lakers", "LA Rams", "Pittsburgh Steelers"];

//need a function to add gif when button is clicked. using $(this).attr("data-name")



//function for displaying sports data
function renderButtons() {

    //delete teams prior to adding new teams 
    //we do this so we dont have repeat buttons 
    $(".button-view").empty(); 

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
}

//create a function that adds the user input into array 
