define(function(require) {

    var fixtures = require('./fixtures');
    var rss = require('rssfeeds');
    var test = require('minitest');

    // ********************************************
    // Articles storage

    // add the feed
    localStorage.rssfeeds = JSON.stringify([fixtures.feeds[0]]);
    rss.feeds.fetch();
    var feed = rss.feeds.models[0];
    feed.articles.reset();
    // add an article to a feed
    var articleContent =  { 
      title:'The Last Word In Business', 
      link:'http://www.npr.org/2012/11/23/165754320/the-last-word-in-business?ft=1&f=1006', 
      date:'Fri, 23 Nov 2012 01:00:00 -0800', 
      author:'', 
      content:'<p>Some content</p>'
    }; 
    var article = feed.articles.addUnique(articleContent);
    test.gt(
        feed.articles.length, 0,
        'Article is not added to the collection');
    test.equals(
        feed.articles.models[0].get('title'), article.get('title'),
        'Article is not added to the feed');
    // check if article is automatically stored in storage
    var inStorage = localStorage.getItem(feed.articles.tag);
    test.truthy(
        inStorage,
        'Article is not added to the storage');

    // check if article collection is properly instantiated from storage
    // add fixtures to storage
    localStorage.setItem(feed.articles.tag, 
        JSON.stringify(fixtures.articles[feed.get('id')]));
    feed.articles.fetch();
    test.equals(
        feed.articles.models[0].get('title'),
        fixtures.articles[feed.get('id')][0].title,
        'Error in fetching articles from storage');


    // leave clean localStorage
    delete localStorage.rssfeeds;
    delete localStorage[feed.articles.tag];

    test.result('articleStorage');
});
