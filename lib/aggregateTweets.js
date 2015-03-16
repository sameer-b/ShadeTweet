/**
 * Created by Sameer on 3/8/2015.
 */
var Twitter = require('twitter');
var keys = require('./applicationKeys.js');


var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});


exports.getTweetRatio = function(idea,firstHashTag,secondHashTag,locations,response) {
    //38.405178,-90.065918,800mi
    var firstSearchQueryEastCoast = "https://api.twitter.com/1.1/search/tweets.json?f=realtime&q="+idea+"%23"+firstHashTag+"&geocode="+locations[0]+"&src=typd";
    var secondSearchQueryEastCoast =  "https://api.twitter.com/1.1/search/tweets.json?f=realtime&q="+idea+"%23"+secondHashTag+"&geocode="+locations[0]+"&src=typd";

    var firstSearchQueryWestCoast = "https://api.twitter.com/1.1/search/tweets.json?f=realtime&q="+idea+"%23"+firstHashTag+"&geocode="+locations[1]+"&src=typd";
    var secondSearchQueryWestCoast =  "https://api.twitter.com/1.1/search/tweets.json?f=realtime&q="+idea+"%23"+secondHashTag+"&geocode="+locations[1]+"&src=typd";

    console.log(firstSearchQueryEastCoast);

    var firstCountEastCoast = 1;
    var secondCountEastCoast = 1;
    var firstCountWestCoast = 1;
    var secondCountWestCoast = 1;


    client.get(firstSearchQueryEastCoast, function(error, tweets1){
        if (!error) {
            if(tweets1.statuses.length != 0)
                firstCountEastCoast = parseInt(tweets1.statuses.length);
            console.log("First East Coast Count "+firstCountEastCoast);
            client.get(secondSearchQueryEastCoast, function(error, tweets2){
                if (!error) {
                    if(tweets2.statuses.length != 0)
                        secondCountEastCoast = parseInt(tweets2.statuses.length);
                    console.log("Second East Coast Count "+secondCountEastCoast);
                    client.get(firstSearchQueryWestCoast, function(error, tweets3){
                        if (!error) {
                            if(tweets3.statuses.length != 0)
                                firstCountWestCoast = parseInt(tweets3.statuses.length);
                            console.log("First West Coast Count "+firstCountWestCoast);
                            client.get(secondSearchQueryWestCoast, function(error, tweets4){
                                if (!error) {
                                    if(tweets4.statuses.length != 0)
                                        secondCountWestCoast = parseInt(tweets4.statuses.length);
                                    console.log("Second West Coast Count"+secondCountWestCoast);
                                    var eastCoastTotal = parseInt(firstCountEastCoast+secondCountEastCoast);
                                    var westCoastTotal = parseInt(firstCountWestCoast+secondCountWestCoast);
                                    var eastCoastRatio = parseFloat(firstCountEastCoast/eastCoastTotal) ;
                                    var westCoastRatio = parseFloat(firstCountWestCoast/westCoastTotal) ;
                                    console.log("East Coast Ratio"+eastCoastRatio);
                                    console.log("West Coast Ratio"+westCoastRatio);
                                    response.render('showMap',{data: {eastCoast: eastCoastRatio, westCoast: westCoastRatio, locations : locations} });


                                }else {
                                    console.log(error);
                                }
                            });
                    }
                    });
                };


            });
        };

    });
};