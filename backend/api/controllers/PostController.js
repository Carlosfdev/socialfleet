/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Twit = require('twit');

module.exports = {
    tweet: function(req, res) {

        User.findOne(req.userId, function(err, user) {

            var message = req.body.message;
            var sendAt = req.body.sendAt;

            Post.create({
                message: message,
                sendAt: sendAt,
                owner: req.userId
            }).exec(function(err, post) {
                console.log("working", post, err);
            });

            // var T = new Twit({
            //     consumer_key: config.TWITTER_KEY,
            //     consumer_secret: config.TWITTER_SECRET,
            //     access_token: user.twitterToken,
            //     access_token_secret: user.twitterSecret,
            // });

            // T.post('statuses/update', {
            //     status: message
            // }, function(err, data, response) {
            //     console.log(data, err);
            //     res.status(200).end();
            // });

        });
    },

    myPosts: function(req, res) {
        Post.find({
            owner: req.userId
        }, function(err, posts) {
            res.json(posts);
        });
    }
};
