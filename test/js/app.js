
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    //require('./install-button');

    // Write your app here.
    //require('./tests/test-feeds-storage');
    //require('./tests/test-articles-storage');

    var test = require('minitest');
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open('GET', 'http://example.com/', true);
    xhr.responseType = 'blob';
    xhr.addEventListener('load', (function() { 
      test.print('SUCCEED!');
    }));
    xhr.onerror = function (e) {
      test.print('FAILED. Status code: ' + e.target.status);
    };
    test.print('Trying to cross-domain XMLHttpRequest');
    xhr.send();
    

});

