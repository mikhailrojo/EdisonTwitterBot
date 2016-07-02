var Twitter = require("twitter");
var credentials = require("./credentials.js")
var client = new Twitter(credentials);

// client.post('statuses/update', {status: "Проверка твит бота"}, function(err, tweet, response){
//     if(err) throw err;
//     console.log(tweet);
// });

var stream = client.stream("statuses/filter", {track: "cat"}, function(stream){
  stream.on("data", function(tweet){
    console.log(tweet.text);

    client.post('statuses/update', {status: 'Бот перетвитил:' + tweet.text }, function(err, tweet, response){
      if(err) console.log(err);
      console.log(tweet.text);
    })
  });

  stream.on("error", function(err){
    console.log(err);
  })
});
