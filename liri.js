require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

switch(process.argv[2]){
  case "concert-this":
    var artist = process.argv.slice(3).join(" ");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city + ", "  +  response.data[0].venue.region);
      // convert date to MM/DD/YY format
      var responseDate = response.data[0].datetime;
      var responseFormat = "YYYY-MM-DDTHH:mm:ss";
      var convertedDate = moment(responseDate, responseFormat);
      
      console.log("Date: " + convertedDate.format("MM/DD/YY"));
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
  break;
  case "spotify-this-song":
    var songName = process.argv.slice(3).join(" ");
    spotify
    .request("https://api.spotify.com/v1/search?q=" + songName + "&type=track")
    .then(function(data) {
      console.log("Artist Name: " + data.tracks.items[0].artists[0].name)
      console.log("Song Name: " + data.tracks.items[0].name)
      console.log("URL: " + data.tracks.items[0].artists[0].external_urls.spotify)
      console.log("Album Name: " + data.tracks.items[0].album.name)
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }) 
  break;
  case "movie-this":
      var movie = process.argv.slice(3).join(" ");
      if(movie === undefined){
        movie = "Mr.%20Nobody"

      }
      axios.get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year Released: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  break; 
  case "do-what-it-says":
      fs.readFile("random.txt", "utf-8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
      
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.

        if(dataArr[0] === "spotify-this-song"){
          var songName = dataArr[1]
          spotify
          .request("https://api.spotify.com/v1/search?q=" + songName + "&type=track")
          .then(function(data) {
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name)
            console.log("Song Name: " + data.tracks.items[0].name)
            console.log("URL: " + data.tracks.items[0].artists[0].external_urls.spotify)
            console.log("Album Name: " + data.tracks.items[0].album.name)
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        }) 
        }
      
      });
  break;
}


