var keys = require("./keys.js");
console.log(keys);

var Spotify = require('node-spotify-api');


function spotThisSong() {
    var spotify = new Spotify(keys.spotify);
    //var client = new Twitter(keys.twitter);

    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
    });
}

var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.

function liri(action, value) {
    switch (action) {
        case "spotify-this-song":
            spotThisSong();
            break;


    }
}

liri(action, value);