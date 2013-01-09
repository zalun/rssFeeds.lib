rssFeeds - read and store RSS feeds
===================================

Started as a Firefox OS library for the RSS reader and podcast player apps. 
Requires access to localStorage.

``backbone`` and ``underscore`` need to be available in default path.  
Same for ``jquery`` or ``zepto``. If zepto add following::

    require.config({
      map: { '*': { 'jquery': 'zepto' } }
    });
