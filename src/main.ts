// main.js
// Luke Cotton
// Main JavaScript file for the application.

// Imports.
import SCDCookie from "./scdcookie";

// Function for our button click.
function calculateClicked() {
    // Calculate.
    const baseURL = "http://localhost:3001/calculate/";
    var formula = $("#formulaField").val() as string;
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
            var responseData = data.responseJSON;
            var errorMessage = responseData.message || "Unknown error!";
            $("#failure-reason").html("Error: " + errorMessage);
        }
    });
}

// Setup everything.
$(document).ready(function() {
    // Get the main page.
    var container = $("#main-container");
    container.hide();
    container.load("maincontent.html", function() {
        // Load the current formula if we have it.
        var item = SCDCookie.default.getCookie("currentFormula");
        var formula = item.value;
        if (formula != null) {
            $("#formulaField").val(formula);
        }

        // Setup the button.
        $("#calculateButton").click(function() {
            calculateClicked();
        });

        // When the text changes, update our cookie.
        $("#formulaField").keyup(function () {
            var formula = $("#formulaField").val() as string;
            SCDCookie.default.setCookie("currentFormula", formula);
        });

        // Show the container with an animation.
        container.fadeIn(1000);
    });

});