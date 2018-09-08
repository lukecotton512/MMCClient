// main.js
// Luke Cotton
// Main JavaScript file for the application.

// Function for our button click.
function calculateClicked() {
    // Calculate.
    const baseURL = "http://localhost:3000/calculate/";
    var formula = $("#formulaField").val();
    var url = baseURL + formula;
    $.ajax({
        // Our url.
        url: url,

        // Success function.
        success: function(data) {
            // Unhide the results.
            $("#result-group").css("display", "block");

            // Hide the failure reason.
            $("#error-group").css("display", "none");
            
            // Now, print the result.
            $("#result-field").html(data.weight.toFixed(3) + " g/mol");
        },

        // Failure function.
        error: function(data) {
            // Hide the results.
            $("#result-group").css("display", "none");

            // Show the failure reason.
            $("#error-group").css("display", "block");

            // Now, show an error message.
            $("#failure-reason").html("Could not get molar mass!");
        }
    });
}

// Setup everything.
$(document).ready(function() {
    // Get the main page.
    var container = $("#main-container");
    container.hide();
    container.load("maincontent.html", function() {
        // Setup the button.
        $("#calculateButton").click(function() {
            calculateClicked();
        });

        // Show the container with an animation.
        container.fadeIn(1000);
    });

});