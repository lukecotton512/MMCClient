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

        // Type of JSONP.
        jsonp: "callback",

        // We are JSONP.
        dataType: "jsonp",

        // Say we want jsonp to the server.
        data: {
            reqType: "jsonp"
        },

        // Success function.
        success: function(data) {
            // Unhide the results.
            $("#result-group").css("display", "block");
            
            // Now, print the result.
            $("#result-field").html(data.weight.toFixed(3) + " g/mol");
        }
    });
}

// Setup everything.
$(document).ready(function() {
    $("#calculateButton").click(function() {
        calculateClicked();
    });
});