var friends = require('../data/friends.js');

//API Routes
module.exports = function (app) {
    //GET Request - this URL gets table data and displays in JSON
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    //POST Request
    app.post('/api/friends', function (req, res) {

        //Comparing user with their best friend match 
        var totalDifference = 0;
        //Object to hold the best match
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        //Take the result of the user's survey POST and parse it.
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;
        // Parse Int converts the users score to a number 
        var b = userScores.map(function (item) {
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: b
        }

        console.log("Name: " + userName);
        console.log("User Score " + userScores);

        //Adds up all the numbers to determine score
        var sum = b.reduce((a, b) => a + b, 0);

        console.log("Total sum " + sum);
        console.log("Match Difference " + bestMatch.friendDifference);
        console.log("+---------------------------------+");

        // Loop to go through all friends
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total " + totalDifference);
            console.log("Love Match Difference " + bestMatch.friendDifference);

            var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total match score " + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
            console.log(" ===> " + totalDifference);

            if (totalDifference <= bestMatch.friendDifference) {

                // Reset the bestMatch to be the new friend. 
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
                // }

            }
            console.log(totalDifference + " Total Difference");

        }
        console.log(bestMatch);


        friends.push(userData);
        console.log("New User added!");
        console.log(userData);

        res.json(bestMatch);
    });
};