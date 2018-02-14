// Pull in required dependencies
var path = require("path");

// Import the list of friend entries
var friends = require("../data/friends.js");

// Export API routes
module.exports = function(app) {

    //send json data back
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // Add new friend entry
    app.post("/api/friends", function(req, res) {
        // Capture the user input object
        var userInput = req.body;
        var userResponses = userInput.scores;
        var matchName = "";
        var matchImage = "";
        var difference = 10000;
        // for loop to run through friend's list
        for (var i = 0; i < friends.length; i++) {
            // calculate differences
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }
            // the lowest difference will record friend match
            if (diff < difference) {

                difference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Add new user
        friends.push(userInput);

        // send response
        res.json({ status: "OK", matchName: matchName, matchImage: matchImage });
    });
};