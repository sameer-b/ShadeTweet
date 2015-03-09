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
    var firstSearchQueryEastCoast = "https://api.twitter.com/1.1/search/tweets.json?q=%22"+idea+"%22%23"+firstHashTag+"&geocode="+locations[0]+"&src=typd";
    var secondSearchQueryEastCoast =  "https://api.twitter.com/1.1/search/tweets.json?q=%22"+idea+"%22%23"+secondHashTag+"&geocode="+locations[0]+"&src=typd";

    var firstSearchQueryWestCoast = "https://api.twitter.com/1.1/search/tweets.json?q=%22"+idea+"%22%23"+firstHashTag+"&geocode="+locations[1]+"&src=typd";
    var secondSearchQueryWestCoast =  "https://api.twitter.com/1.1/search/tweets.json?q=%22"+idea+"%22%23"+secondHashTag+"&geocode="+locations[1]+"&src=typd";


    var firstCountEastCoast, secondCountEastCoast = 1;
    var firstCountWestCoast, secondCountWestCoast = 1;


    client.get(firstSearchQueryEastCoast, function(error, tweets){
        if (!error) {
            firstCountEastCoast = parseInt(tweets.statuses.length);
            client.get(secondSearchQueryEastCoast, function(error, tweets){
                if (!error) {
                    secondCountEastCoast = parseInt(tweets.statuses.length);
                    client.get(firstSearchQueryWestCoast, function(error, tweets){
                        if (!error) {
                            firstCountWestCoast = parseInt(tweets.statuses.length);
                            console.log("First west count "+firstCountWestCoast);
                            client.get(secondSearchQueryWestCoast, function(error, tweets){
                                if (!error) {
                                    secondCountWestCoast = parseInt(tweets.statuses.length);
                                    console.log("Second West coast count"+secondCountWestCoast);
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