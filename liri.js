var keys = require("./keys.js");
var fs = require("fs");
console.log(keys);

var action = process.argv[2];
var value = process.argv[3];
var Spotify = require('node-spotify-api');

function spotThisSong(value) {
    var spotify = new Spotify(keys.spotify);


    spotify.search({
        type: 'track',
        query: value,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].href);
        console.log(data.tracks.items[0].album.name);

    });
}


function liri(action, value) {
    switch (action) {
        case "spotify-this-song":
            spotThisSong(value);
            break;

        case "my-tweets":
            myTweet(value);
            break;

        case "movie-this":
            movieThis(value);
            break;
        case "do-what-it-says":
            justDoIt(value);
            break;
    }
}


liri(action, value);


function myTweet(value) {
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);


    var params = {
        screen_name: '@RaiderHesh'
    };
    client.get('statuses/user_timeline', {
        q: 'sports'
    }, function (error, tweets, response) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text);
        }

    });


}

function movieThis(value) {
    if (!value) {
        value = "Mr.Nobody";
    }
    var omdbApi = require('omdb-client');

    var params = {
        apiKey: 'trilogy',
        title: value

    }
    omdbApi.get(params, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Movie Title: " + data.Title);
        console.log("Release Year: " + data.Year);
        console.log("IMDB Rating: " + data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + data.Ratings[0].Value);
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
    });

}


function justDoIt(value) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var input = (data.split(',')); //returns an array
        var command = input[0]
        var result = input[1]

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }


        console.log(input);
        liri(command, result)
    });

}