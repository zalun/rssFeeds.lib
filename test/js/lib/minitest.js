define(function(require) {

  var results;

  var restart = function() {
    results = {
      total: 0,
      bad: 0
    };
  };
  restart();

  var $ = require('zepto');
  var results_node = window.document.getElementById('test-results');

  var print = function(message) {
    console.log(message);
    $(results_node).append('<p>' + message + '</p>');
  }

  function equals(value, expected, msg) {
    results.total++;
    if (value !== expected) {
      results.bad++;
      print(msg + ": Expected " + value + ", but was " + expected);
    }
  }

  function truthy(value, msg) {
    results.total++;
    if (value) return;
    results.bad++
    print(msg + ': Expected truthy, but was ' + value);
  }

  function falsy(value, msg) {
    results.total++;
    if (!value) return;
    results.bad++
    print(msg + ': Expected falsy, but was ' + value);
  }

  function lt(left, right) {
    results.total++;
    if (left < right) return;
    results.bad++
    print(msg + ': Expected ' + left + ' < ' + right);
  }

  function lte(left, right) {
    results.total++;
    if (left <= right) return;
    results.bad++
    print(msg + ': Expected ' + left + ' <= ' + right);
  }

  function gt(left, right) {
    results.total++;
    if (left > right) return;
    results.bad++
    print(msg + ': Expected ' + left + ' > ' + right);
  }

  function gte(left, right) {
    results.total++;
    if (left >= right) return;
    results.bad++
    print(msg + ': Expected ' + left + ' >= ' + right);
  }

  function result(msg) {
    print(msg + "<br/>Of " + results.total + " tests, " + 
        results.bad + " failed, " 
        + (results.total - results.bad) + " passed.");
    restart();
  }

  return {
    equals: equals,
    truthy: truthy,
    falsy: falsy,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    result: result,
    print: print
  }
});
