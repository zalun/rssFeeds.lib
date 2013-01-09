console.log('wtf');
define(function(require) {

    var fixtures = require('./fixtures');
    var rss = require('rssfeeds');
    var test = require('minitest');

    // ********************************************
    // Storing feeds

    // ############ Saving feed
    // start with clean localStorage
    delete localStorage.rssfeeds;

    // ------------ One feed
    rss.init();

    // start with one feed
    // add to listFeeds
    var data = {
      link: fixtures.feeds[0].link,
      title: fixtures.feeds[0].tite
    };
    var feed = rss.feeds.addUnique(data);
    // check if id is created properly
    test.truthy(feed.get('id'), 'Is id for the feed created?');

    // check if feed is stored
    var jsonFeeds = localStorage.rssfeeds;
    var feedFromStorage = JSON.parse(jsonFeeds)[0];
    test.equals(
        feedFromStorage.link, feed.get('link'), 
        'Is feed stored properly?');

    // ------------- Add another feed
    var data = {
      link: fixtures.feeds[1].link,
      title: fixtures.feeds[1].tite
    };
    var feed2 = rss.feeds.addUnique(data);
    // check if id is created properly
    test.truthy(
        feed2.get('id'),
        'No id created for the feed');
    var jsonFeeds = localStorage.rssfeeds;
    var feedFromStorage = JSON.parse(jsonFeeds)[0];
    test.equals(
        feedFromStorage.link, feed.get('link'),
        'feeds are not stored properly');
    var feedFromStorage = JSON.parse(jsonFeeds)[1];
    test.equals(
        feedFromStorage.link, feed2.get('link'),
        'feed is not stored properly');


    // ############ Read stored feeds
    // clean feeds
    var rss = require('rssfeeds');
    rss.feeds.reset();
    // store fixtures in localStorage
    localStorage.rssfeeds = JSON.stringify(fixtures.feeds);

    rss.feeds.fetch();
    test.equals(
        rss.feeds.length, 2,
        "Wrong number of models fetched from storage: " + rss.feeds.length);
    var feed = rss.feeds.models[0];
    test.equals(
        feed.get('id'), fixtures.feeds[0].id,
        'Wrong id in feed taken from storage ' + feed.get('id') + ' != ' 
        + fixtures.feeds[0].id);
    var feed2 = rss.feeds.models[1];
    test.equals(
        feed2.get('id'), fixtures.feeds[1].id, 
        'Wrong id in feed taken from storage ' + feed2.get('id') + ' != ' 
        + fixtures.feeds[1].id)

    // ############ Remove feed
    // clean feeds
    var rss = require('rssfeeds');
    rss.feeds.reset();
    // store data in localStorage
    localStorage.rssfeeds = JSON.stringify(fixtures.feeds);

    rss.feeds.fetch();

    rss.feeds.removeById(fixtures.feeds[1].id);

    test.equals(
        rss.feeds.length, 1,
        "Feed not deleted");

    test.equals(
        rss.feeds.models[0].get('id'), fixtures.feeds[0].id,
        "Wrong feed has been removed");

    // check if it has been automatically stored
    test.equals(
        JSON.parse(localStorage.rssfeeds).length, 1,
        'Not stored automatically onRemove');

    // leave clean localStorage
    delete localStorage.rssfeeds;
    // send a success message
    test.result('feedStorage');
});
